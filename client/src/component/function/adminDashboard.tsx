import adminPhoto1 from "../../assets/adminPhoto1.jpg";
import { useNavigate } from "react-router-dom";
import AdminButton from "./adding/AdminButton";
import Footer from "../common/Footer"; // Corrected import path
function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div>
          <div className="h-96">
            <img src={adminPhoto1} alt="" />
          </div>
        </div>
        <div className="">
          <div>
            <h1 className="text-7xl font-stretch-50%">Admin Dashboard</h1>
          </div>
        </div>
        <div className="flex items-center justify-center pt-44 ">
          <div>
            <h1 className="text-7xl">Ethiopian University Courses</h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center pt-12 gap-8 px-4">
          <AdminButton
            onClick={() => navigate("/function/adding/courseAdding")}
          >
            Add Courses
          </AdminButton>
          <AdminButton onClick={() => navigate("/function/view/manageCourse")}>
            Manage Added Courses
          </AdminButton>
          <AdminButton onClick={() => navigate("/function/adding/addCategory")}>
            Add Category
          </AdminButton>
          <AdminButton onClick={() => navigate("/function/view/manageUser")}>
            View Users
          </AdminButton>
          <AdminButton
            onClick={() => navigate("/function/view/manageCategory")}
          >
            Manage Categories
          </AdminButton>
        </div>
        <div className="mt-24">
          <Footer />
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;
