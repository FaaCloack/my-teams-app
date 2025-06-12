from django.db import models

from members.constants import LOCATION_CHOICES, MX
from members.models.role import Role
from teams.models import Team

class Member(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    lastname = models.CharField(max_length=100, blank=False, null=False)
    email = models.CharField(max_length=100, blank=False, null=False)
    phone = models.CharField(max_length=100, blank=False, null=False)
    location = models.CharField(
        max_length=5,
        choices=LOCATION_CHOICES,
        default=MX,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.PROTECT)


