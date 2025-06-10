import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
function AddNewProduct() {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [skuid, setSkuid] = useState("");
  // const [productunit, setProductunit] = useState("")
  const [productstock, setProductstock] = useState("");
  const [minstock, setMinstock] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [categorie, setCategorie] = useState("");
  const [subcategorie, setSubcategorie] = useState("");
  const [productbrand, setProductbrand] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [selectcategorie, setSelectcategorie] = useState([]);
  const [selectsubcategorie, setSelectsubcategorie] = useState([]);
  const [selectproductbrand, setSelectproductbrand] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    const selectFile = e.target.files[0];
    if (selectFile) {
      setProductImage(selectFile);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getcategorie = await axios.get(
          "https://poskartik.onrender.com/api/getcategorie"
        );
        const getsubcategorie = await axios.get(
          "https://poskartik.onrender.com/api/getSubCategorie"
        );
        const getproductbrand = await axios.get(
          "https://poskartik.onrender.com/api/getproductbrand"
        );
        
        setSelectcategorie(getcategorie.data.map((item) => item.categorieName));
        setSelectsubcategorie(
          getsubcategorie.data.map((item) => item.subCategory)
        );
        setSelectproductbrand(
          getproductbrand.data.map((item) => item.brandName)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("skuid", skuid);
    formData.append("productstock", productstock);
    formData.append("minstock", minstock);
    formData.append("sellingPrice", sellingPrice);
    formData.append("categorie", categorie);
    formData.append("subcategorie", subcategorie);
    formData.append("productbrand", productbrand);
    formData.append("productImage", productImage);
    try {
      await axios.post("https://poskartik.onrender.com/api/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product Create Successfull...");
      navigate("/products");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex w-full min-w-0 flex-col bg-[#F3F7F9]">
        <Header name="Products" />
        <section className="m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0 ">
          <div className="flex justify-end">
            <NavLink
              to="/products"
              className="cursor-pointer px-4 py-1 flex justify-center items-center gap-2 rounded-lg bg-[#0A6637] text-white"
            >
              <i className="fa-solid fa-left-long"></i>
              Back
            </NavLink>
          </div>
          <h2 className="text-base max-xl:text-sm text-[#505050]">
            Products / <span className="text-[#0A6637]">Create</span>
          </h2>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-5 mt-5 py-6 px-4 border border-gray-200 shadow rounded-xl"
          >
            <h2 className="text-xl max-2xl:text-lg font-medium text-[#202020]">
              General Details
            </h2>
            <div className="bg-[#F6F6F6] px-4 py-5 rounded-lg">
              <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-3">
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Product Name <span className='text-red-600'>*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    name="ProductName"
                    placeholder="Enter Product Name"
                    value={productName}
                    required
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    SKU ID <span className='text-red-600'>*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    name="SKUID"
                    placeholder="Enter SKU ID"
                    value={skuid}
                    required
                    onChange={(e) => setSkuid(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Product Unit
                  </label>
                  <select
                    className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    id="ProductUnit"
                  >
                   
                    <option value="">-- Select Unit --</option>
                    <option value="individual">Individual</option>
                    <option value="company">Company</option>
                    <option value="government">Government</option>
                  </select>
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Product Category <span className='text-red-600'>*</span>
                  </label>
                  <select
                    value={categorie}
                    required
                    onChange={(e) => setCategorie(e.target.value)}
                    className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    id="ProductCategory"
                  >
                    <option value="">-- Select Category --</option>
                    {Array.isArray(selectcategorie) &&
                      selectcategorie.map((categorie) => (
                        <option key={categorie} value={categorie}>{categorie}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Product Sub Category <span className='text-red-600'>*</span>
                  </label>
                  <select
                    value={subcategorie}
                    required
                    onChange={(e) => setSubcategorie(e.target.value)}
                    className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    id="ProductSubCategory"
                  >
                    <option value="">-- Select Sub Category --</option>
                    {Array.isArray(selectsubcategorie) &&
                      selectsubcategorie.map((subcategorie) => (
                        <option key={subcategorie} value={subcategorie}>{subcategorie}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Product Brand <span className='text-red-600'>*</span>
                  </label>
                  <select
                    value={productbrand}
                    required
                    onChange={(e) => setProductbrand(e.target.value)}
                    className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    id="ProductBrand"
                  >
                    <option value="">-- Select Brand --</option>
                    {Array.isArray(selectproductbrand) &&
                      selectproductbrand.map((product) => (
                        <option key={product} value={product}>{product}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Product Stock <span className='text-red-600'>*</span>
                  </label>
                  <input
                  required
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    name="addressline2"
                    placeholder="Enter Product Stock"
                    value={productstock}
                    onChange={(e) => setProductstock(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Min. Stock
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    name="city"
                    placeholder="Enter Min. Stock"
                    value={minstock}
                    onChange={(e) => setMinstock(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Selling Price <span className='text-red-600'>*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    name="state"
                    required
                    placeholder="Enter Selling Price"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <h2 className="text-xl max-2xl:text-lg font-medium text-[#202020]">
              Product Images
            </h2>
            <div className="bg-[#F6F6F6] px-4 py-5 rounded-lg">
              <div className="w-[50%] max-2xl:w-[70%]">
                <div>
                  <p className="text-sm max-xl:text-xs mb-1">
                    Other Product Image <span className='text-red-600'>*</span>
                  </p> 
                  <div className="flex items-center rounded-md border border-gray-300">
                    <input
                    required
                      id="Personal_Proof"
                      type="file"
                      name="PersonalProof"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="Personal_Proof"
                      className="flex items-center text-white text-sm max-xl:text-xs justify-center gap-3 px-4 py-[0.35rem] bg-[#0A6637] rounded-md shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      Upload Other Product Images
                    </label>
                    {productImage && productImage instanceof File && (
                      <p className="ml-2 text-sm text-gray-700">
                        {productImage.name}
                      </p>
                    )}
                  </div>
                  {productImage && (
                    <img
                      src={
                        typeof productImage === "string"
                          ? productImage
                          : URL.createObjectURL(productImage)
                      }
                      alt="Product"
                      className="mt-2 w-30 max-w-xs rounded"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
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
                ) : (
                  "Add New"
                )}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddNewProduct;
