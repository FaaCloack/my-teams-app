import api from "../api/axios";

import { MemberPayload } from "@/types/members";

export const getMembers = async () => {
  const response = await api.get("members/");

  return response.data;
};

export const getMemberDetail = async (id: string) => {
  const response = await api.get(`members/${id}`);

  return response.data;
};

export const addMember = async (payload: MemberPayload) => {
  const response = await api.post("members/", payload);

  return response.data;
};

export const editMember = async (
  payload: Partial<MemberPayload>,
  memberId?: string
) => {
  const response = await api.patch(`members/${memberId}/`, payload);

  return response.data;
};

export const deleteMember = async (memberId?: string) => {
  const response = await api.delete(`members/${memberId}`);

  return response.data;
};

export const getRolesList = async () => {
  const response = await api.get("members/roles/");

  return response.data;
};
