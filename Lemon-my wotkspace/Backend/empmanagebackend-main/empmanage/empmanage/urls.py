from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path("admin/", admin.site.urls),
    path("__debug__/", include("debug_toolbar.urls")),
    
    # Djoser URLs for user management (registration, password reset, etc.)
    path("auth/", include("djoser.urls")),
    
    # JWT Authentication URLs (login, refresh)
    path("auth/", include("djoser.urls.jwt")),

    # Your HR app URLs
    path("hr/", include("hr.urls")),

    # Playground app URLs (example, can be removed if not needed)
    path("playground/", include("playground.urls")),

    path('auth/jwt/create/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/jwt/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]


