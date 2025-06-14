import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
  User,
  Input,
} from "@heroui/react";
import { useCallback, useMemo, useState } from "react";

import { Member, MemberRole } from "@/types/members";
import { SearchIcon } from "@/components/icons";

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

export default function MembersTable({
  members,
  onSelectMember,
  onAddMember,
}: {
  members?: Member[];
  onSelectMember: (id: number) => void;
  onAddMember: () => void;
}) {
  const [filterValue, setFilterValue] = useState("");
  const hasSearchFilter = Boolean(filterValue);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 mt-4">
          <div className="flex-1 gap-3">
            <Input
              isClearable
              className="w-full sm:max-w-[100%]"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>

          <div className="flex-2 gap-3">
            <Button color="primary" onPress={onAddMember}>
              Add member
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, hasSearchFilter]);

  const filteredMembers: Member[] = useMemo(() => {
    let filteredList = members ? [...members] : [];

    if (hasSearchFilter) {
      filteredList = filteredList.filter((member) =>
        member.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredList;
  }, [members, filterValue, hasSearchFilter]);

  return (
    <Table
      hideHeader
      aria-label="Members table"
      selectionMode="single"
      topContent={topContent}
    >
      <TableHeader>
        <TableColumn>Members</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No rows to display."} items={filteredMembers}>
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
                  member.role
                )}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
