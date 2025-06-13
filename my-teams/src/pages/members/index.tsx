import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  User,
  Spinner,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";

import ErrorState from "../errorState";

import { title } from "@/components/primitives";
import { useMembers } from "@/hooks/members";
import DefaultLayout from "@/layouts/default";
import { Member, MemberRole } from "@/types/members";

const ADMIN_ROLE = "Admin";

function formatMemberName(name: string, lastname: string, role: MemberRole) {
  const completeName = `${name} ${lastname}`;

  if (role.name === ADMIN_ROLE) {
    return `${completeName} (${role.name.toLowerCase()})`;
  }

  return completeName;
}

function MemberDescription({ email, phone }: { email: string; phone: string }) {
  return (
    <div>
      <p>{phone}</p>
      <p>{email}</p>
    </div>
  );
}

function MembersTable({
  members,
  onSelectMember,
}: {
  members?: Member[];
  onSelectMember: (id: number) => void;
}) {
  return (
    <Table hideHeader aria-label="Members table" selectionMode="single">
      <TableHeader>
        <TableColumn>Members</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} items={members}>
        {(member) => (
          <TableRow key={member.id} onClick={() => onSelectMember(member.id)}>
            <TableCell>
              <User
                avatarProps={{
                  name: member.name,
                }}
                description={
                  <MemberDescription
                    email={member.email}
                    phone={member.phone}
                  />
                }
                name={formatMemberName(
                  member.name,
                  member.lastname,
                  member.role,
                )}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

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
        <div>
          <Button color="primary" onPress={() => navigate("/members/add")}>
            Add member
          </Button>
        </div>
      </section>
      {isLoading ? (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <Spinner />
        </section>
      ) : (
        <MembersTable members={members ?? []} onSelectMember={onSelectMember} />
      )}
    </DefaultLayout>
  );
}
