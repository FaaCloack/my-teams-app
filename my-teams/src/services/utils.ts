import { MemberFormValues, MemberPayload } from "@/types/members";

export function adaptMemberPayload(formData: MemberFormValues): MemberPayload {
  return {
    name: formData.name,
    lastname: formData.lastname,
    email: formData.email,
    phone: formData.phone,
    role_id: formData.role,
  };
}