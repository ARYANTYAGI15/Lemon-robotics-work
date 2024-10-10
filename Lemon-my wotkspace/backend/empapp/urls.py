from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ExpenseViewSet, TimesheetViewSet
from rest_framework.routers import DefaultRouter

# Create a router for your API
router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet)
router.register(r'timesheets', TimesheetViewSet)

# Define your URL patterns
urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Token obtain URL
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh URL
    path('api/', include(router.urls)),  # Include the router for expenses and timesheets
]