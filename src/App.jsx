import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./pages/NavBar";
import Landing from "./pages/Landing";
import AdminLogin from "./pages/AdminLogin";
import VisionMission from "./pages/VisionMission";
import Officials from "./pages/Officials";
import Achievements from "./pages/Achievements";
import MoreInfo from "./pages/MoreInfo";
import Master from "./pages/Admin/Master";
import Professor from "./pages/Professor";
import Results from "./pages/Results";
import ChangePassword from "./pages/ChangePassword";
import Server from "./pages/Server";
import BuzzerDashboard from "./pages/BuzzerDashboard";
import Admin from "./pages/Admin/Admin";
import CreateBuzzerGame from "./pages/CreateBuzzerGames";
import UsersTable from "./pages/UsersTable";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/vision" element={<VisionMission />} />
        <Route path="/officials" element={<Officials/>}/>
        <Route path="/achievements" element={<Achievements/>}/>
        <Route path="/achievements/qrush" element={<MoreInfo/>}/>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/master" element={<Master />} />
        <Route path="/results" element={<Results />} />
        <Route path="/admin/forgotpassword" element={<ChangePassword />} />
        <Route path="/server" element={<Server />} />
        <Route path="/createbuzzergame" element={<CreateBuzzerGame/>} />
        <Route path="/buzzerdash" element={<BuzzerDashboard/>} />
        <Route path="/allusers" element={<UsersTable/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
