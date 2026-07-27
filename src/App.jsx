import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Groups from "./pages/Groups";
import CreateGroup from "./pages/CreateGroup";
import JoinGroup from "./pages/JoinGroup";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Children from "./pages/Children";
import GroupEvents from "./pages/GroupEvents";
import CreateEvent from "./pages/CreateEvent";
import GroupPosts from "./pages/GroupPosts";
import CreatePost from "./pages/CreatePost";
import GroupPolls from "./pages/GroupPolls";
import CreatePoll from "./pages/CreatePoll";
import GroupPayments from "./pages/GroupPayments";
import CreatePayment from "./pages/CreatePayment";
import PaymentDetail from "./pages/PaymentDetail";
import GroupDetail from "./pages/GroupDetail";
import EditGroup from "./pages/EditGroup";
import GroupMore from "./pages/GroupMore";
import EditGroupName from "./pages/EditGroupName";
import EditGroupDescription from "./pages/EditGroupDescription";
import EditGroupSport from "./pages/EditGroupSport";
import EditGroupType from "./pages/EditGroupType";
import EditGroupAgeCategory from "./pages/EditGroupAgeCategory";
import EditGroupField from "./pages/EditGroupField";
import GroupCode from "./pages/GroupCode";
import GroupRoles from "./pages/GroupRoles";
import GroupMembers from "./pages/GroupMembers";
import GroupStore from "./pages/GroupStore";
import GroupAttendance from "./pages/GroupAttendance";
import GroupPaymentStats from "./pages/GroupPaymentStats";
import GroupMatchInvitations from "./pages/GroupMatchInvitations";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/create" element={<CreateGroup />} />
        <Route path="/groups/join" element={<JoinGroup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/events" element={<GroupEvents />} />
        <Route path="/profile/children" element={<Children />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/posts" element={<GroupPosts />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/polls" element={<GroupPolls />} />
        <Route path="/polls/create" element={<CreatePoll />} />
        <Route path="/payments" element={<GroupPayments />} />
        <Route path="/payments/create" element={<CreatePayment />} />
        <Route path="/payments/:id" element={<PaymentDetail />} />
        <Route path="/groups/:id" element={<GroupDetail />} />
        <Route path="/groups/:id/edit" element={<EditGroup />} />
        <Route path="/groups/:id/more" element={<GroupMore />} />
        <Route path="/groups/:id/edit/name" element={<EditGroupName />} />
        <Route path="/groups/:id/edit/description" element={<EditGroupDescription />} />
<Route path="/groups/:id/edit/sport" element={<EditGroupSport />} />
        <Route path="/groups/:id/edit/group-type" element={<EditGroupType />} />
        <Route path="/groups/:id/edit/age-category" element={<EditGroupAgeCategory />} />
        <Route path="/groups/:id/edit/group-code" element={<GroupCode />} />
        <Route path="/groups/:id/edit/roles" element={<GroupRoles />} />
        <Route path="/groups/:id/edit/:field" element={<EditGroupField />} />
        <Route path="/groups/:id/members" element={<GroupMembers />} />
        <Route path="/groups/:id/store" element={<GroupStore />} />
        <Route path="/groups/:id/attendance" element={<GroupAttendance />} />
        <Route path="/groups/:id/payment-stats" element={<GroupPaymentStats />} />
        <Route path="/groups/:id/match-invitations" element={<GroupMatchInvitations />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;