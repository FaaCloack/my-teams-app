import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { addToast, Spinner } from "@heroui/react";

import MemberForm from "./memberForm";

import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { useMemberDetail, useRoles } from "@/hooks/members";
import { MemberFormValues, MemberPayload } from "@/types/members";
import {
  editMember as editMemberService,
  deleteMember as deleteMemberService,
} from "@/services/members";
import { adaptMemberPayload } from "@/services/utils";
import { MEMBERS_LIST_PATH } from "@/routes";

export default function MembersEdit() {
  const { data: roles } = useRoles();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: member } = useMemberDetail(id);
  const { mutate: editMember } = useMutation({
    mutationFn: ({ payload, id }: { payload: MemberPayload; id?: string }) =>
      editMemberService(payload, id),
    onSuccess: () => {
      addToast({
        title: "Member updated succesfully",
        color: "success",
      });
      navigate(MEMBERS_LIST_PATH);
    },
  });

  const { mutate: deleteMember } = useMutation({
    mutationFn: deleteMemberService,
    onSuccess: () => {
      addToast({
        title: "Member deleted succesfully",
        color: "success",
      });
      navigate(MEMBERS_LIST_PATH);
    },
  });

  const handleSaveMember = (formData: MemberFormValues) => {
    const payload = adaptMemberPayload(formData);

    editMember({ payload, id });
  };

  const handleDeleteMember = () => {
    deleteMember(id);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-20 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Edit Team Member</h1>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-20 py-8 md:py-10">
        {member ? (
          <MemberForm
            isEditMode
            initialValues={{
              name: member.name,
              lastname: member.lastname,
              email: member.email,
              phone: member.phone,
              role: member.role?.id.toString(),
            }}
            roleOptions={roles ?? []}
            onDelete={handleDeleteMember}
            onSubmit={handleSaveMember}
          />
        ) : (
          <Spinner />
        )}
      </section>
    </DefaultLayout>
  );
}
