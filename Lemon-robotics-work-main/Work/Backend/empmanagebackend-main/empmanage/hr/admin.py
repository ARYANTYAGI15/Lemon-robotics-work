from django.contrib import admin
from . import models


@admin.register(models.Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_select_related = ["user"]
    list_display = [
        "first_name",
        "last_name",
        "email",
        "phone",
        "total_cl",
        "total_el",
        "total_sl",
        "designation",
        "department",
    ]
    list_editable = ["phone", "designation", "department"]
    list_per_page = 10


@admin.register(models.EmployeeAttendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_select_related = ["employee"]
    list_display = [
        "attendance",
        "in_time",
        "out_time",
        "employee",
        "location",
        "employee_id",
    ]


@admin.register(models.EmployeeLeave)
class LeaveAdmin(admin.ModelAdmin):
    list_select_related = ["employee"]
    list_display = [
        "leave",
        "leave_reason",
        "leave_from",
        "leave_to",
        "total_days",
        "employee",
    ]


@admin.register(models.EmployeeExpense)
class ExpenseAdmin(admin.ModelAdmin):
    list_select_related = ["employee"]
    list_display = [
        "employee",
        "amount",
        "description",
        "date",
        "status",
        "merchant",
        "category",
        "payment_mode",
    ]
    list_filter = ["status", "category", "payment_mode"]
    search_fields = ["employee__name", "merchant", "description"]


@admin.register(models.EmployeeTimesheet)
class TimesheetAdmin(admin.ModelAdmin):
    list_select_related = ["employee"]
    list_display = [
        "work_date",
        "hours_worked",
        "task_description",
        "employee",
    ]
