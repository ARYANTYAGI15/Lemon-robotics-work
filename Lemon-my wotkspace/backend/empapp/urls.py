from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet, TimesheetViewSet

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet)
router.register(r'timesheets', TimesheetViewSet)

urlpatterns = [
    path('api/', include(router.urls)),  # All API endpoints will be under /api/
]