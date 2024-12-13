from django_filters.rest_framework import FilterSet, filters
from .models import EmployeeTimesheet


class EmployeeTimesheetFilter(FilterSet):
    month = filters.NumberFilter(field_name="work_date", lookup_expr="month")
    year = filters.NumberFilter(field_name="work_date", lookup_expr="year")

    class Meta:
        model = EmployeeTimesheet
        fields = ["work_date"]
        exclude = ["employee", "hours_worked", "task_description", "work_date"]
