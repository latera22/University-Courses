import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
interface Category {
  id: number;
  categoryName: string;
}

interface Course {
  _id: string;
  name: string;
  description: string;
  image?: string;
  university: string;
  categoryId?: string;
  file?: string;
}

function EditCourse() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [university, setUniversity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    // Load categories for dropdown
    axios
      .get("http://localhost:4000/api/course/getCategories")
      .then((response) => setCategories(response.data))
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, []);

  useEffect(() => {
    // Load course data by id
    if (id) {
      axios
        .get(`http://localhost:4000/api/course/getCourse/${id}`)
        .then((res) => {
          const course: Course = res.data;
          setName(course.name);
          setDescription(course.description);
          setImage(course.image || "");
          setUniversity(course.university);
          setCategoryId(course.categoryId || "");
          setFile(null); // file needs to be re-uploaded if changed
        })
        .catch((err) => {
          console.error("Error loading course", err);
          alert("Failed to load course data.");
          navigate("/function/view/manageCourse");
        });
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("university", university);
    formData.append("categoryId", categoryId);
    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.put(
        `http://localhost:4000/api/course/updateCourse/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Course updated successfully");
      navigate("/function/view/manageCourse");
    } catch (err) {
      console.error(err);
      alert("Failed to update course.");
    }
  };

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md border border-gray-200">
        <h1 className="text-4xl text-center mb-6">Edit Course</h1>
        <form onSubmit={handleSubmit}>
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
              required
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
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Course Image URL
            </label>
            <input
              type="text"
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
              required
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
              required
            >
              <option value="">Select a Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
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
              Update Course
            </button>
            <button
              onClick={() => navigate("/function/view/manageCourse")}
              className="ml-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;
