from rest_framework import viewsets, generics
from members.models import Member, Role
from members.serializers import MemberSerializer, RoleSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer


class RoleListView(generics.ListAPIView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer