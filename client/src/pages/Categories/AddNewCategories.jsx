import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
function AddNewCategories() {
  const location = useLocation();
  const EditCategorieData = location.state?.data;
  const navigate = useNavigate();
  const [categorieImage, setCategorieImage] = useState(null);
  const [categorieName, setCategorieName] = useState("");
  const [loading, setLoading] = useState(false);
  const [gst, setGst] = useState("");

  const handleFileChange = (e) => {
    const selectFile = e.target.files[0];
    setCategorieImage(selectFile);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("categorieName", categorieName);
    formData.append("gst", gst);
    formData.append("categorieImage", categorieImage);
    try {
      if (EditCategorieData) {
        await axios.put(
          `http://localhost:3000/api/updatecategorie/${EditCategorieData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Categorie Update Successfully...");
      } else {
        await axios.post("http://localhost:3000/api/addcategorie", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Categorie Create Successfully...");
      }
      navigate("/categories");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (EditCategorieData) {
      setCategorieName(EditCategorieData.categorieName || "");
      setGst(EditCategorieData.gst || "");
      setCategorieImage(EditCategorieData.categorieImage || "");
    }
  }, [EditCategorieData]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 w-full min-w-0 flex flex-col bg-[#F3F7F9]">
        <Header name="Product Brands" />
        <section className="flex-1 m-5 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0 overflow-auto">
          <div className="flex justify-end">
            <NavLink
              to="/categories"
              className="cursor-pointer px-4 py-1 flex justify-center items-center gap-2 rounded-lg bg-[#0A6637] text-white"
            >
              <i className="fa-solid fa-left-long"></i>
              Back
            </NavLink>
          </div>
          <h2 className="text-base max-xl:text-sm text-[#505050]">
            Category /{" "}
            <span className="text-[#0A6637]">
              {EditCategorieData ? "Edit" : "Create"}
            </span>
          </h2>

          <form
            onSubmit={handleFormSubmit}
            className="border w-[50%] max-xl:w-[70%] mt-5 rounded-xl border-gray-200 p-5 text-sm"
          >
            <div>
              <label htmlFor="">Category Name <span className='text-red-600'>*</span></label>
              <input
                placeholder="Enter Category Name"
                value={categorieName}
                required
                onChange={(e) => setCategorieName(e.target.value)}
                className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                type="text"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="">TAX (%) <span className='text-red-600'>*</span></label>
              <input
                placeholder="Enter TAX"
                value={gst}
                required
                onChange={(e) => setGst(e.target.value)}
                className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                type="text"
              />
            </div>
            <div className="mt-5">
              <p className="text-sm max-xl:text-xs mb-1">Category Image <span className='text-red-600'>*</span></p>
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
                {categorieImage && (
                  <p className="ml-2 text-sm text-gray-700">
                    {categorieImage instanceof File
                      ? categorieImage.name
                      : categorieImage.split("/").pop()}
                  </p>
                )}
              </div>
              {categorieImage && (
                <img
                  src={
                    typeof categorieImage === "string"
                      ? categorieImage
                      : URL.createObjectURL(categorieImage)
                  }
                  alt="Product"
                  className="mt-2 w-30 max-w-xs rounded"
                />
              )}
            </div>
            <div
              type="submit"
              disabled={loading}
              className="mt-5 flex justify-end"
            >
              <button
                className={`px-4 cursor-pointer font-medium py-2 max-2xl:px-3 max-2xl:py-[0.35rem] bg-[#0A6637] rounded-lg text-white flex items-center gap-3  ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#0A6637]"
                }`}
              >
                {loading ? (
                  <>
                    <ClipLoader size={20} color="#FFFFFF" />
                    <span className="text-white">Processing...</span>
                  </>
                ) : EditCategorieData ? (
                  "Update"
                ) : (
                  "Add Category"
                )}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddNewCategories;
