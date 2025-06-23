import { useEffect, useState } from "react";
import axios from "axios";
function ManageCategory() {
  const [categoryName, setCategoryName] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/course/getCategories")
      .then((categoryName) => setCategoryName(categoryName.data))
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
      <div className="flex items-center justify-center pt-20">
        <h1 className="-screen text-4xl">Manage Category</h1>
      </div>
      <div className="mt-16 pl-32">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left px-6 py-3 font-semibold">
                  Category Name
                </th>
                <th className="text-right px-6 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {categoryName.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-3">{item.categoryName}</td>
                  <td className="px-6 py-3 text-right">
                    <button className="px-4 py-2 bg-black rounded-2xl hover:bg-amber-950 text-white">
                      Edit
                    </button>
                    <button className="ml-4 px-4 py-2 bg-red-600 rounded-2xl hover:bg-amber-950 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-7 flex items-center justify-center ">
          If you want to add category click
          <a
            href="/function/adding/addCategory"
            className="pl-2 text-blue-700 underline"
          >
            {" "}
            here
          </a>
        </div>
      </div>
    </>
  );
}
export default ManageCategory;
