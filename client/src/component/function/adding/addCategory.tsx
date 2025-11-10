import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
function AddCategory() {
  const [categoryName, setCategory] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const navigate = useNavigate();

  const handleCategoryAdding = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/course/addCategories", {
        categoryName,
        categoryDescription,
      })
      .then((result) => {
        if (result) {
          console.log("Category Registered successfully");
        }
        navigate("/function/view/manageCategory");
      })
      .catch((err) => {
        console.log("Operation Failed");
        console.log(err);
      });
  };
  return (
    <div>
      <div>
        <div className="flex items-center justify-center pt-20">
          <h1 className="-screen text-4xl">Add Category Here</h1>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleCategoryAdding}
          className="bg-white shadow-xl rounded-lg p-6  w-full max-w-md border border-gray-200"
        >
          <div>
            <div className="pt-5">
              {" "}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 ">
                  {" "}
                  Enter the Name of the Categories of the Courses
                </label>
              </div>
              <div>
                <input
                  onChange={(e) => setCategory(e.target.value)}
                  name="categoryName"
                  id="categoryName"
                  className="border-2 rounded-xl px-3 font-semibold "
                  type="text"
                  placeholder="Category Name"
                />
              </div>{" "}
            </div>
            <div className="pt-5">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 ">
                  {" "}
                  Enter the Description of the Categories of the Courses
                </label>
              </div>
              <div className="pt-1">
                <input
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  name="categoryDescription"
                  className="border-2 rounded-xl px-3 font-semibold h-19 w-96 "
                  type="text"
                  placeholder="Category Description"
                />
              </div>
            </div>
            <div className=" pt-7 flex">
              <button
                type="submit"
                className="bg-black text-white hover:bg-amber-950 items-center rounded-2xl font-semibold w-40 h-12"
              >
                Add Category
              </button>

              <div className="pl-4 mt-1 text-gray-600">
                Already have a category?
                <a
                  href="/function/view/manageCategory"
                  className="underline text-blue-700 ml-2"
                >
                  Manage Category
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddCategory;
