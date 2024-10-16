from django.urls import include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views
from .views import DataView

"""
URL configuration for k4c project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api/v1/api-token-auth/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(r'api/v1/api-token-refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path(r'api/v1/get-data/', DataView.as_view())
]
