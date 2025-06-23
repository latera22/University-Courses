import adminPhoto1 from "../../assets/adminPhoto1.jpg";
import { useNavigate } from "react-router-dom";
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
        <div className="flex items-center justify-center pt-12 space-x-50">
          <div>
            <button
              onClick={() => navigate("/function/adding/courseAdding")}
              className="bg-black text-white hover:bg-amber-950 items-center rounded-2xl font-semibold w-40 h-12 "
            >
              Add Courses
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate("/function/view/manageCourse")}
              className="bg-black text-white hover:bg-amber-950 items-center rounded-2xl font-semibold w-40 h-12 "
            >
              Manage Added Courses
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate("/function/adding/addCategory")}
              className="bg-black text-white hover:bg-amber-950 items-center rounded-2xl font-semibold w-40 h-12 "
            >
              Add Category
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate("/function/view/manageUser")}
              className="bg-black text-white hover:bg-amber-950 items-center rounded-2xl font-semibold w-40 h-12 "
            >
              view User
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center pt-12 space-x-50">
          <div>
            <button
              onClick={() => navigate("/function/view/manageCategory")}
              className="bg-black text-white hover:bg-amber-950 items-center rounded-2xl font-semibold w-40 h-12 "
            >
              Manage Category
            </button>
          </div>
        </div>
        <div className="mt-6   bg-black text-white font-semibold">
          <div className="flex items-center justify-center">
            <h1>@ethiopia university course</h1>
          </div>
          <div className="flex items-center justify-center">
            <h1>@ethiopia university course</h1>
          </div>
          <div className="flex items-center justify-center">
            <h1>@ethiopia university course</h1>
          </div>
          <div className="flex items-center justify-center">
            <h1>@ethiopia university course</h1>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;
