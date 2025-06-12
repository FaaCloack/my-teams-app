import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addToast } from "@heroui/react";

import MemberForm from "./memberForm";

import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { useRoles } from "@/hooks/members";
import { MemberFormValues } from "@/types/members";
import { addMember as addMemberService } from "@/services/members";
import { adaptMemberPayload } from "@/services/utils";
import { MEMBERS_LIST_PATH } from "@/routes";

export default function MembersAdd() {
  const { data: roles } = useRoles();
  const navigate = useNavigate();
  const { mutate: addMember } = useMutation({
    mutationFn: addMemberService,
    onSuccess: () => {
      addToast({
        title: "Member added succesfully",
        color: "success",
      });
      navigate(MEMBERS_LIST_PATH);
    },
  });

  const handleSaveMember = (formData: MemberFormValues) => {
    const adaptedPayload = adaptMemberPayload(formData);

    addMember(adaptedPayload);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-20 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Add a Team Member</h1>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-20 py-8 md:py-10">
        <MemberForm roleOptions={roles ?? []} onSubmit={handleSaveMember} />
      </section>
    </DefaultLayout>
  );
}
