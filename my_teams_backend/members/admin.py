from django.contrib import admin

# Register your models here.
from members.models import Member, Role

admin.site.register(Member)
admin.site.register(Role)