# models.py
from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

class Employee(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    employee_id = models.CharField(max_length=100)

    def __str__(self):
        return self.employee_id

class Expense(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    date = models.DateField()

class Timesheet(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    work_date = models.DateField()
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2)
    task_description = models.TextField()



