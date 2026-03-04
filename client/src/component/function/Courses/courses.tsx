import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../common/Footer";
import { useNavigate } from "react-router-dom";
import coursepage from "../../../assets/coursepage.png"
interface Course {
  id: number;
  name: string;
  description: string;
  categoryId: string;
  image: string;
}

function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const apiBaseUrl = import.meta.env.VITE_API_URL || "";
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(15)

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/api/course/getCourse`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          console.error("Data is not array", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching course with axios", error);
      });
  }, [apiBaseUrl]);

  return (
    <div className="flex flex-col min-h-screen">
   <div className="relative w-full h-[400px] md:h-[500px] lg:h-[650px]">
  {/* Banner Image */}
  <img
    src={coursepage}
    alt="Courses Banner"
    className="w-full h-full object-cover object-center"
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/30"></div>

  {/* Text Overlay: centered horizontally, bottom vertically */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center px-4 md:px-8">
    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
      Our Courses
    </h1>
    <p className="mt-2 md:mt-4 text-md md:text-lg lg:text-xl text-white drop-shadow-md max-w-2xl mx-auto">
      Browse a variety of courses and find the one that sparks your curiosity. Learn, grow, and take the next step in your academic journey!
    </p>
  </div>
</div>
      <div className="flex items-center mt-8 border-2 border-green-500">
        <h1 className="ml-64 text-2xl text-black p-2">Category</h1>
      </div>

      <div className = "p-4">
        <h1 className="text-3xl font-bold mb-4">Course List</h1>
         <div className = " grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">          
        {courses.length > 0 ? (
courses.slice(0, visibleCount).map((course) => (
              <div key={course.id} 
                                className="p-4 border rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
onClick={() => navigate("/CourseDetail/" + course.id)}>
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
        {visibleCount < courses.length && (
  <div className="flex justify-center mt-6">
    <button
      onClick={() => setVisibleCount(visibleCount + 15)}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Load More
    </button>
  </div>
)}
      </div>

      <div className="flex-grow"></div>

      <Footer />
    </div>
  );
}

export default Courses;