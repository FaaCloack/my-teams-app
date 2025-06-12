from rest_framework.routers import DefaultRouter
from members.views import MemberViewSet, RoleListView
from django.urls import path

router = DefaultRouter()
router.register(r"", MemberViewSet)


urlpatterns = [path("roles/", RoleListView.as_view(), name="roles")] + router.urls
