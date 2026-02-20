import userSide from "../../assets/userSide.jpeg";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import Footer from "../common/Footer"; // Corrected import path
import axios from "axios";
// Define Course Type
interface Course {
  id: number;
  name: string;
  description: string;
  categoryId: string;
  image: string;
}
////
function Dashboard() {
  const context = useContext(AppContext);
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/course/getCourse")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          console.error(
            "Error fetching courses: Data is not an array",
            response.data,
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching courses with axios:", error);
      });
  }, []);
  // If context is not available, return null or a loading state
  if (!context) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <div>
        <div className="min-h-screen flex flex-col ">
          <div className="relative w-full ">
            {/* Image */}
            <img
              src={userSide}
              alt="User Side"
              className="h-auto object-cover"
            />

            {/* Text Overlay */}
            <div className="hidden xl:block absolute top-1/2 right-0 transform -translate-y-1/2 text-white text-right ">
              <h1 className="text-7xl font-semibold text-amber-700 bg-opacity-50 px-4 py-2 rounded-lg">
                Welcome to
              </h1>
              <h1 className="text-7xl font-semibold text-amber-700 bg-opacity-50 px-4 py-2 rounded-lg">
                University
              </h1>
              <h1 className="text-7xl font-semibold text-amber-700 bg-opacity-50 px-4 py-2 rounded-lg">
                Course!
              </h1>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <h1 className="text-7xl font-semibold text-blue-700">
              University Courses
            </h1>
          </div>

          <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Course List</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div
                    key={course.id}
                    className="p-4 border rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
                    onClick={() => navigate(`/courses/${course.id}`)} // Make the whole card clickable
                  >
                    <img
                      src={course.image}
                      alt={course.name}
                      style={{ width: "200px", height: "auto" }}
                    />
                    <h2 className="text-2xl font-semibold text-blue-700 mt-2">
                      {course.name}
                    </h2>
                    <p className="text-gray-500 mt-1">{course.description}</p>
                  </div>
                ))
              ) : (
                <p>No courses available.</p>
              )}
            </div>
          </div>
          <div>
            <div className="min-h-screen bg-linear-to-b from-white to-emerald-300 px-6 py-12">
              <div className="grid place-items-center text-center space-y-8">
                {/* Heading */}
                <h1 className="text-5xl font-bold text-white bg-black px-6 py-4 rounded-2xl shadow-lg animate-bounce">
                  Start to learn With AI
                </h1>

                {/* Motivational Paragraph */}
                <p className="max-w-4xl text-lg md:text-2xl font-medium text-gray-900 bg-emerald-300 px-8 py-6 rounded-xl shadow-md leading-relaxed">
                  Unlock the power to shape the future—learn AI and turn
                  imagination into innovation. With every step, you’ll gain the
                  skills to solve real-world problems and create smarter
                  solutions. Start today—because the future needs minds like
                  yours.
                </p>
              </div>

              <div>
                <div className="flex ml-24 mt-8">
                  <h2 className=" px-6 py-3 rounded-lg shadow-lg  transition duration-300 font-semibold text-lg">
                    Get Started With:
                  </h2>
                </div>
              </div>
              <div className="flex ml-28 mt-4 ">
                <div className="flex ml-32 mt-4">
                  <button
                    onClick={() => navigate("/function/chatbot")}
                    className="bg-black text-white px-6 py-3 rounded-lg shadow-lg hover:bg-amber-500 transition duration-300 font-semibold text-lg"
                  >
                    Open-AI
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
