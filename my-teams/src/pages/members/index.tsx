import { Spinner } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import ErrorState from "../errorState";

import MembersTable from "./membersTable";

import { title } from "@/components/primitives";
import { useMembers } from "@/hooks/members";
import DefaultLayout from "@/layouts/default";

export default function MembersList() {
  const { data: members, isLoading, isLoadingError, isError } = useMembers();
  const membersNum = members?.length;
  const subtitle = `You have ${membersNum} team members`;
  const navigate = useNavigate();

  const onSelectMember = (id: number) => {
    navigate(`/members/${id}`);
  };

  if (isLoadingError || isError) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <ErrorState />
      </section>
    );
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Team Members</h1>
          {membersNum && <h2>{subtitle}</h2>}
        </div>
      </section>
      {isLoading ? (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <Spinner />
        </section>
      ) : (
        <MembersTable
          members={members ?? []}
          onAddMember={() => navigate("/members/add")}
          onSelectMember={onSelectMember}
        />
      )}
    </DefaultLayout>
  );
}
