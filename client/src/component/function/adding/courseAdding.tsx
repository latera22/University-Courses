import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  categoryName: string;
}

function CourseAdding() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [university, setUniversity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [file, setFile] = useState<File | null>(null); // Store actual file

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/course/getCategories")
      .then((response) => setCategories(response.data))
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  const handleCourseAdding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("university", university);
    formData.append("categoryId", categoryId);

    if (file) {
      formData.append("file", file); // Append the file
    }

    try {
      const result = await axios.post(
        "http://localhost:4000/api/course/courseAdding",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (result) {
        window.alert("Course Registered successfully");
        navigate("/function/view/manageCourse");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        window.alert(
          "Course is already registered, use a different Course name."
        );
      } else {
        window.alert("System error");
      }
    }
  };

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md border border-gray-200">
        <h1 className="text-4xl text-center mb-6">Course Adding</h1>
        <form onSubmit={handleCourseAdding}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Name
            </label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter Course Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Description
            </label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course University
            </label>
            <input
              type="text"
              className="border rounded w-full py-2 px-3"
              placeholder="Enter University Name"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Category
            </label>
            <select
              className="border rounded w-full py-2 px-3"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Select a Category</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload File
            </label>
            <input
              type="file"
              className="border rounded w-full py-2 px-3"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Add Course
            </button>
          </div>
        </form>
        <div className="flex">
          <h3 className="font-semibold">
            You want to manage added Course? Click
          </h3>
          <a
            href="/function/view/manageCourse"
            className="font-semibold text-blue-700 ml-2"
          >
            Here
          </a>
        </div>
      </div>
    </div>
  );
}

export default CourseAdding;
