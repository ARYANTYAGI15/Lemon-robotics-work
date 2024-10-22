from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.filters import OrderingFilter
from .models import (
    Employee,
    EmployeeAttendance,
    EmployeeLeave,
    EmployeeTimesheet,
    EmployeeExpense,
)
from .serializers import (
    EmployeeSerializer,
    UpdateEmployeeSerializer,
    EmployeeAttendanceSerializer,
    EmployeeLeaveSerializer,
    CreateEmployeeLeaveSerializer,
    CreateEmployeeAttendanceSerializer,
    UpdateEmployeeAttendanceSerializer,
    EmployeeExpenseSerializer,
    EmployeeTimesheetSerializer,
)
from .pagination import DefaultPagination
from django.shortcuts import get_object_or_404

# Create your views here.


class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.select_related("user").all()

    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return EmployeeSerializer
        elif self.request.method == "PUT":
            return UpdateEmployeeSerializer
        return EmployeeSerializer

    @action(detail=False, methods=["GET", "PUT"], permission_classes=[IsAuthenticated])
    def me(self, request):
        self.employee = Employee.objects.select_related("user").get(
            user_id=request.user.id
        )
        if request.method == "GET":
            serializer = EmployeeSerializer(self.employee)
            return Response(serializer.data)
        elif request.method == "PUT":
            serializer = UpdateEmployeeSerializer(self.employee, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


class EmployeeAttendanceViewSet(ModelViewSet):
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]

    def get_permissions(self):
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateEmployeeAttendanceSerializer
        elif self.request.method == "PATCH":
            return UpdateEmployeeAttendanceSerializer
        return EmployeeAttendanceSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return EmployeeAttendance.objects.select_related("employee").all()
        self.employee = Employee.objects.select_related("user").get(user_id=user.id)
        return EmployeeAttendance.objects.select_related("employee").filter(
            employee_id=self.employee.id
        )

    def get_serializer_context(self):
        return {"employee_id": self.employee.id}


class EmployeeLeaveViewSet(ModelViewSet):
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]
    serializer_class = EmployeeLeaveSerializer
    pagination_class = DefaultPagination
    filter_backends = [OrderingFilter]

    def get_permissions(self):
        return [IsAuthenticated()]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateEmployeeLeaveSerializer
        return EmployeeLeaveSerializer

    def get_queryset(self):
        user = self.request.user
        self.employee = self.get_employee(user.id)
        if user.is_staff:
            return EmployeeLeave.objects.select_related("employee").all()
        return EmployeeLeave.objects.select_related("employee").filter(
            employee_id=self.employee.id
        )

    def get_serializer_context(self):
        user = self.request.user
        self.employee = self.get_employee(user.id)
        return {"employee_id": self.employee.id}

    # this is a helper function which checks for employee attribute in the self object.
    # use it whenever need to get the employee and use it in context/queryset etc.
    def get_employee(self, user_id):
        if hasattr(self, "employee"):
            return self.employee
        else:
            self.employee = Employee.objects.select_related("user").get(user_id=user_id)
            return self.employee

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        leave_types = {"CL": "total_cl", "SL": "total_sl", "EL": "total_el"}
        employee = instance.employee
        field = leave_types[instance.leave]
        balance = getattr(employee, field)

        # Increment the leave balance before deleting the leave record
        setattr(employee, field, balance + instance.total_days)
        employee.save()

        # Call the original destroy method to handle the actual deletion
        response = super(EmployeeLeaveViewSet, self).destroy(request, *args, **kwargs)

        # You can add additional logic here if needed

        return response
from rest_framework import viewsets
from rest_framework import status
class EmployeeExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return EmployeeExpense.objects.select_related("employee").all()

        # Get the employee instance associated with the logged-in user
        employee = Employee.objects.get(user_id=user.id)
        return EmployeeExpense.objects.select_related("employee").filter(employee=employee)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.request.user.is_authenticated:
            context["employee_id"] = Employee.objects.get(user=self.request.user).id
        return context

    def perform_create(self, serializer):
        # Link the expense to the employee
        employee = Employee.objects.get(user=self.request.user)
        serializer.save(employee=employee)

    @action(detail=False, methods=['get', 'post'], url_path='me')
    def me(self, request):
        try:
            # Get the employee instance associated with the logged-in user
            employee = Employee.objects.get(user_id=request.user.id)

            if request.method == 'GET':
                # Retrieve expenses for the employee
                expenses = EmployeeExpense.objects.filter(employee=employee)
                serializer = self.get_serializer(expenses, many=True)
                return Response(serializer.data)

            elif request.method == 'POST':
                # Create a new expense for the employee
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)

                # Save the expense and associate it with the employee
                serializer.save(employee=employee)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Employee.DoesNotExist:
            return Response({"error": "Employee not found."}, status=status.HTTP_404_NOT_FOUND)



class EmployeeTimesheetViewSet(ModelViewSet):
    http_method_names = ["get", "post", "patch", "delete", "head", "options"]
    serializer_class = EmployeeTimesheetSerializer
    pagination_class = DefaultPagination
    filter_backends = [OrderingFilter]

    def get_permissions(self):
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return EmployeeTimesheet.objects.select_related("employee").all()
        self.employee = Employee.objects.select_related("user").get(user_id=user.id)
        return EmployeeTimesheet.objects.select_related("employee").filter(
            employee_id=self.employee.id
        )

    def get_serializer_context(self):
        user = self.request.user
        self.employee = Employee.objects.select_related("user").get(user_id=user.id)
        return {"employee_id": self.employee.id}
