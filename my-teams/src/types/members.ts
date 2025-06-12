export type Team = {
  id: number;
  name: string;
};

export type MemberRole = {
  id: number;
  name: string;
  description: string;
};

export type Member = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  location: "MX" | "US";
  role: MemberRole;
  team: Team;
};

export type MemberPayload = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  role_id: string;
  team_id?: string;
};

export type MemberFormValues = {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
};
