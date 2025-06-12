import { Route, Routes } from "react-router-dom";

import MembersList from "./pages/members";
import MembersAdd from "./pages/members/add";
import MembersEdit from "./pages/members/edit";
import { MEMBER_ADD_PATH, MEMBER_EDIT_PATH, MEMBERS_LIST_PATH } from "./routes";


function App() {
  return (
    <Routes>
      <Route element={<MembersList />} path={MEMBERS_LIST_PATH} />
      <Route element={<MembersAdd />} path={MEMBER_ADD_PATH} />
      <Route element={<MembersEdit />} path={MEMBER_EDIT_PATH} />
    </Routes>
  );
}

export default App;
