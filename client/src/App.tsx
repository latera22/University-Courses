import { Route, Routes } from "react-router-dom";
import NavBar from "./component/bar/navBar";
import Signup from "./component/auth/signup";
import Login from "./component/auth/login";
import Dashboard from "./component/function/home";
import AdminDashboard from "./component/function/adminDashboard";
import ResetPassword from "./component/auth/resetPassword";
import CourseAdding from "./component/function/adding/courseAdding";
import ManageCourse from "./component/function/view/manageCourse";
import ManageUser from "./component/function/view/mangeUser";
import AddCategory from "./component/function/adding/addCategory";
import ManageCategory from "./component/function/view/manageCategory";
import Chatbot from "./component/function/chatbot";
import EditCourse from "./component/edit/editCourse";
function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route
          path="/function/adding/addCategory"
          element={<AddCategory></AddCategory>}
        ></Route>
        <Route
          path="/function/adding/courseAdding"
          element={<CourseAdding />}
        ></Route>
        <Route
          path="/function/view/manageCourse"
          element={<ManageCourse />}
        ></Route>
        <Route
          path="/function/view/manageCategory"
          element={<ManageCategory></ManageCategory>}
        ></Route>
        <Route
          path="/function/view/manageUser"
          element={<ManageUser />}
        ></Route>
        <Route
          path="/function/adminDashboard"
          element={<AdminDashboard></AdminDashboard>}
        ></Route>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/resetPassword" element={<ResetPassword />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/function/home" element={<Dashboard />} />
        <Route path="/function/chatbot" element={<Chatbot />} />
        <Route path="/edit-course/:id" element={<EditCourse />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}
export default App;
