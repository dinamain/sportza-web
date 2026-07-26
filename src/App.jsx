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
      </Routes>
    </BrowserRouter>
  );
}

export default App;