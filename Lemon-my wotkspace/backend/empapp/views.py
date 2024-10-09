from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Employee, Expense, Timesheet
from .serializers import ExpenseSerializer, TimesheetSerializer
from django.shortcuts import get_object_or_404

class ExpenseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows employees to view and edit their expenses.
    """
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Ensure employees can only access their own expenses
        return self.queryset.filter(employee__user=self.request.user)

    def perform_create(self, serializer):
        employee = get_object_or_404(Employee, user=self.request.user)
        serializer.save(employee=employee)

class TimesheetViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows employees to view and edit their timesheets.
    """
    queryset = Timesheet.objects.all()
    serializer_class = TimesheetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Ensure employees can only access their own timesheets
        return self.queryset.filter(employee__user=self.request.user)

    def perform_create(self, serializer):
        employee = get_object_or_404(Employee, user=self.request.user)
        serializer.save(employee=employee)

