import { useQuery } from "@tanstack/react-query";

import { getMemberDetail, getMembers, getRolesList } from "../services/members";
import { Member, MemberRole } from "../types/members";

export const useMembers = () => {
  return useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: getMembers,
  });
};

export const useMemberDetail = (id?: string) => {
  return useQuery<Member>({
    queryKey: ["memberDetail", id],
    queryFn: () => getMemberDetail(id!),
  });
};

export const useRoles = () => {
  return useQuery<MemberRole[]>({
    queryKey: ["roles"],
    queryFn: getRolesList,
  });
};
