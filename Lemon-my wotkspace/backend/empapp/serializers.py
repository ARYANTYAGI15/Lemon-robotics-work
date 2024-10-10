from rest_framework import serializers
from .models import Employee, Expense, Timesheet
from django.contrib.auth import authenticate

# User login serializer
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        # Authenticate the user
        user = authenticate(request=self.context.get('request'), username=email, password=password)

        if user is None:
            raise serializers.ValidationError('Invalid email or password.')

        attrs['user'] = user
        return attrs

# Expense serializer
class ExpenseSerializer(serializers.ModelSerializer):
        class Meta:
            model = Expense
            fields = [
                "id",  # Assuming you want to return the ID of the created expense
                "amount",
                "description",
                "date"
            ]
            read_only_fields = ['employee']  # Set employee as read-only since it will be set automatically

        def create(self, validated_data):
            # Retrieve the logged-in employee instance
            employee = self.context['request'].user.employee  
            
            # Assign the employee to validated data
            validated_data['employee'] = employee  
            
            # Create and return the new Expense instance
            expense = Expense.objects.create(**validated_data)
            return expense

# Timesheet serializer
class TimesheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timesheet
        fields = [
            "id",
            "employee",  # Change to employee since your Timesheet model references Employee
            "work_date",  # Ensure the field matches your model
            "hours_worked"  # Correct to hours_worked since that's the model field
        ]

    def create(self, validated_data):
        employee = self.context['request'].user.employee  # Get the logged-in employee
        validated_data['employee'] = employee  # Set the employee field
        timesheet = Timesheet.objects.create(**validated_data)
        return timesheet