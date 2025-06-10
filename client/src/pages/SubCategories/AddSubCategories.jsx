import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
function AddSubCategories() {
  const location = useLocation();
  const EditSubcategorie = location.state?.data;
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subCategoryImage, setSubCategoryImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchcategorie = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getcategorie");
      setCategorie(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileChange = (e) => {
    const selectImage = e.target.files[0];
    if (selectImage) {
      setSubCategoryImage(selectImage);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("selectCategory", selectCategory);
    formData.append("subCategory", subCategory);
    formData.append("subCategoryImage", subCategoryImage);
    try {
      if (EditSubcategorie) {
        await axios.put(
          `http://localhost:3000/api/updateSubCategorie/${EditSubcategorie._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Subcategorie Update Successfully");
      } else {
        await axios.post(
          "http://localhost:3000/api/addSubCategorie",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Subcategorie Create Successfully");
      }
      navigate("/subcategories");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchcategorie();
  }, []);

  useEffect(() => {
    if (EditSubcategorie) {
      setSelectCategory(EditSubcategorie.selectCategory || "");
      setSubCategory(EditSubcategorie.subCategory || "");
      setSubCategoryImage(EditSubcategorie.subCategoryImage || "");
    }
  }, [EditSubcategorie]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 w-full min-w-0 flex flex-col bg-[#F3F7F9]">
        <Header name="Sub Categories" />
        <section className="m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0">
          <div className="flex justify-end">
            <NavLink
              to="/subcategories"
              className="cursor-pointer px-4 py-1 flex justify-center items-center gap-2 rounded-lg bg-[#0A6637] text-white"
            >
              <i className="fa-solid fa-left-long"></i>
              Back
            </NavLink>
          </div>
          <h2 className="text-base max-xl:text-sm text-[#505050]">
            Sub Categories /{" "}
            <span className="text-[#0A6637]">
              {EditSubcategorie ? "Edit" : "Create"}
            </span>
          </h2>

          <form
            onSubmit={handleFormSubmit}
            className="border w-[50%] max-xl:w-[70%] mt-5 rounded-xl border-gray-200 p-5 text-sm"
          >
            <div>
              <label className="text-[#202020]" htmlFor="">
                Select Category <span className='text-red-600'>*</span>
              </label>
              <select
                value={selectCategory}
                required
                onChange={(e) => setSelectCategory(e.target.value)}
                className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                id="customerType"
              >
                <option value="">-- Select --</option>
                {Array.isArray(categorie) &&
                  categorie.map((data) => (
                    <option key={data._id} value={data.categorieName}>
                      {data.categorieName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mt-5">
              <label className="text-[#202020]" htmlFor="">
                Sub Category Name <span className='text-red-600'>*</span>
              </label>
              <input
                placeholder="Enter Sub Category Name"
                value={subCategory}
                required
                onChange={(e) => setSubCategory(e.target.value)}
                className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                type="text"
              />
            </div>
            <div className="mt-5">
              <p className="text-sm max-xl:text-xs mb-1 text-[#202020]">
                Product Image <span className='text-red-600'>*</span>
              </p>
              <div className="flex items-center rounded-md border border-gray-300">
                <input
                  id="Personal_Proof"
                  required
                  type="file"
                  name="PersonalProof"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="Personal_Proof"
                  className="flex items-center  text-white text-sm max-xl:text-xs justify-center gap-3 px-4 py-[0.35rem] bg-[#0A6637] rounded-md shadow cursor-pointer  focus:outline-none focus:ring-2  focus:ring-offset-2"
                >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  Upload Photo
                </label>
                {subCategoryImage && (
                  <p className="ml-2 text-sm text-gray-700">
                    {subCategoryImage instanceof File
                      ? subCategoryImage.name
                      : subCategoryImage.split("/").pop()}
                  </p>
                )}
              </div>
              {subCategoryImage && (
                <img
                  src={
                    typeof subCategoryImage === "string"
                      ? subCategoryImage
                      : URL.createObjectURL(subCategoryImage)
                  }
                  alt="Product"
                  className="mt-2 w-30 max-w-xs rounded"
                />
              )}
            </div>
            <div type="submit" className="mt-5 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 cursor-pointer py-2 max-2xl:px-3 font-medium max-xl:py-[0.35rem] rounded-lg text-white flex items-center gap-3
                                                                ${
                                                                  loading
                                                                    ? "bg-gray-400 cursor-not-allowed"
                                                                    : "bg-[#0A6637]"
                                                                }`}
              >
                {loading ? (
                  <>
                    <ClipLoader size={20} color="#FFFFFF" />
                    <span className="text-white">Processing...</span>
                  </>
                ) : EditSubcategorie ? (
                  "Update"
                ) : (
                  "Add Sub Categories"
                )}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddSubCategories;
