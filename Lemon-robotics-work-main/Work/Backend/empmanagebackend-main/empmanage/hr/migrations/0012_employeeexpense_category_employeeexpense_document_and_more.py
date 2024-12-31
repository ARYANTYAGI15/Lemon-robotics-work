# Generated by Django 5.0 on 2024-12-30 10:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hr', '0011_alter_employeeleave_leave_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='employeeexpense',
            name='category',
            field=models.CharField(choices=[('travel', 'Travel'), ('food', 'Food'), ('accommodation', 'Accommodation'), ('entertainment', 'Entertainment'), ('office_supplies', 'Office Supplies'), ('transportation', 'Transportation'), ('utilities', 'Utilities'), ('medical', 'Medical'), ('training', 'Training'), ('miscellaneous', 'Miscellaneous')], default='miscellaneous', max_length=20),
        ),
        migrations.AddField(
            model_name='employeeexpense',
            name='document',
            field=models.FileField(blank=True, null=True, upload_to='documents/'),
        ),
        migrations.AddField(
            model_name='employeeexpense',
            name='merchant',
            field=models.CharField(default='any', max_length=100),
        ),
        migrations.AddField(
            model_name='employeeexpense',
            name='payment_mode',
            field=models.CharField(choices=[('upi', 'UPI'), ('cash', 'Cash'), ('card', 'Card')], default='cash', max_length=10),
        ),
        migrations.AddField(
            model_name='employeeexpense',
            name='status',
            field=models.CharField(choices=[('awaiting_approval', 'Awaiting Approval'), ('recalled', 'Recalled'), ('approved', 'Approved'), ('rejected', 'Rejected')], default='awaiting_approval', max_length=20),
        ),
    ]
