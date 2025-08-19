import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 1. Define the Course type
type Course = {
  _id: string;
  name: string;
};

function ManageCourse() {
  const navigate = useNavigate();

  // 2. Typed state
  const [courses, setCourses] = useState<Course[]>([]);

  // 3. Load course data
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/course/getCourse")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 4. Handle delete
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/course/deleteCourse/${id}`);
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (error) {
      console.error(error);
      alert("Error deleting course.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center pt-20">
        <h1 className="-screen text-4xl">Manage Course</h1>
      </div>
      <div className="mt-16 pl-32">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left px-6 py-3 font-semibold">
                  Course Name
                </th>
                <th className="text-right px-6 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-3">{item.name}</td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => navigate(`/edit-course/${item._id}`)}
                      className="px-4 py-2 bg-black rounded-2xl hover:bg-amber-950 text-white"
                    >
                      Edit
                    </button>
                    <button
                      className="ml-4 px-4 py-2 bg-red-600 rounded-2xl hover:bg-amber-950 text-white"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-7 flex items-center justify-center ">
          If you want to add a course, click
          <a
            href="/function/adding/courseAdding"
            className="pl-2 text-blue-700 underline"
          >
            here
          </a>
        </div>
      </div>
    </>
  );
}

export default ManageCourse;
