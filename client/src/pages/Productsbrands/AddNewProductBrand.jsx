import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
function AddNewProductBrand() {
  const location = useLocation();
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const EditBrandData = location.state?.data;

  const handleFileChange = (e) => {
    const selectimage = e.target.files[0];
    if (selectimage) {
      setBrandImage(selectimage);
    } else {
      alert("No file selected");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("brandName", brandName);
    formData.append("brandImage", brandImage);
    try {
      if (EditBrandData) {
        await axios.put(
          `https://poskartik.onrender.com/api/updateproductbrand/${EditBrandData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("ProductBrand Update Successfully....");
      } else {
        await axios.post(
          "https://poskartik.onrender.com/api/addproductbrand",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("ProductBrand Create Successfully....");
      }
      navigate("/brands");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (EditBrandData) {
      setBrandName(EditBrandData.brandName);
      setBrandImage(EditBrandData.brandImage);
    }
  }, [EditBrandData]);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col w-full min-w-0 bg-[#F3F7F9]">
        <Header name="Product Brands" />
        <section className="flex-1 m-5 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0 overflow-auto">
          <div className="flex justify-end">
            <NavLink
              to="/brands"
              className="cursor-pointer px-4 py-1 flex justify-center items-center gap-2 rounded-lg bg-[#0A6637] text-white"
            >
              <i className="fa-solid fa-left-long"></i>
              Back
            </NavLink>
          </div>
          <h2 className="text-base max-xl:text-sm  text-[#505050]">
            Product Brands /{" "}
            <span className="text-[#0A6637]">
              {EditBrandData ? "Edit" : "Create"}
            </span>
          </h2>

          <form
            onSubmit={handleFormSubmit}
            className="border w-[50%] max-xl:w-[70%]  mt-5 rounded-xl border-gray-200 p-5 text-sm"
          >
            <div>
              <label className="text-[#202020]" htmlFor="">
                Brand Name <span className='text-red-600'>*</span>
              </label>
              <input
                placeholder="Enter Brand Name"
                value={brandName}
                required
                onChange={(e) => setBrandName(e.target.value)}
                className="border px-3 py-2 text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                type="text"
              />
            </div>
            <div className="mt-5">
              <p className="text-sm max-xl:text-xs mb-1">Thumbnail <span className='text-red-600'>*</span></p>
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
                  className="flex items-center  text-white text-sm max-xl:text-xs justify-center gap-3 px-4 py-[0.40rem] bg-[#0A6637] rounded-md shadow cursor-pointer  focus:outline-none focus:ring-2  focus:ring-offset-2"
                >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  Upload Photo
                </label>
                {brandImage && (
                  <p className="ml-2 text-sm text-gray-700">
                    {brandImage instanceof File
                      ? brandImage.name
                      : brandImage.split("/").pop()}
                  </p>
                )}
              </div>
              {brandImage && (
                <img
                  src={
                    typeof brandImage === "string"
                      ? brandImage
                      : URL.createObjectURL(brandImage)
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
                className={`px-4 cursor-pointer py-2 max-2xl:px-3 font-medium max-2xl:py-1 rounded-lg text-white flex items-center gap-3
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
                ) : EditBrandData ? (
                  "Update"
                ) : (
                  "Add Brand"
                )}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddNewProductBrand;
