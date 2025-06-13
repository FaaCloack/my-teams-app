from teams.serializers import TeamSerializer
from teams.models import Team
from rest_framework import serializers
from members.models import Member, Role


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["id", "name", "description"]


class MemberSerializer(serializers.ModelSerializer):
    role = RoleSerializer(read_only=True)
    team = TeamSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(
        queryset=Team.objects.all(), source="team", write_only=True, required=False
    )
    role_id = serializers.PrimaryKeyRelatedField(
        queryset=Role.objects.all(), source="role", write_only=True
    )

    class Meta:
        model = Member
        fields = [
            "id",
            "name",
            "lastname",
            "email",
            "phone",
            "location",
            "created_at",
            "role",
            "team",
            "team_id",
            "role_id",
        ]
        read_only_fields = ["id", "role", "team"]
        required_fields = ["name"]

    def validate(self, validated_data):
        if not validated_data.get("team_id"):
            # defaults to the first team
            validated_data["team_id"] = Team.objects.first().id
        return validated_data
