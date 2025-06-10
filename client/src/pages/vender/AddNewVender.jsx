import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function AddNewVender() {
  const navigate = useNavigate();
  const location = useLocation();
  const EditVenderData = location.state?.data;

  const allStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const [vender, setVender] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [gstno, setGstno] = useState("");
  const [pan, setPan] = useState("");
  const [productbrand, setProductbrand] = useState("");
  const [newRow, setNewRow] = useState([
    { id: 0, ProductName: "", SKUID: "", Category: "", SubCategory: "" },
  ]);
  const [selectstate] = useState(allStates);
  const [selectcategorie, setSelectcategorie] = useState([]);
  const [selectsubcategorie, setSelectsubcategorie] = useState([]);
  const [selectproductbrand, setSelectproductbrand] = useState([]);
  const [userName, setUserName] = useState();
  const [vendercode, setVendercode] = useState("");
  const [counter, setCounter] = useState(1);


  useEffect(() => {
    if (vender) {
      const currentYear = new Date().getFullYear().toString().slice(-2);
      const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
      setVendercode(`PANTRY${currentYear}${currentMonth}${counter}`);
    }
  }, [vender, counter]);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName);
  }, []);

  const AddNewRow = () => {
    setNewRow([
      ...newRow,
      {
        id: newRow.length + 1,
        ProductName: "",
        SKUID: "",
        Category: "",
        SubCategory: "",
      },
    ]);
  };

  const handleInputChange = (e, id, field) => {
    const value = e.target.value;
    setNewRow((prevrow) =>
      prevrow.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleRemoveRow = (id) => {
    const updatenewRow = newRow.filter((row) => row.id !== id);
    setNewRow(updatenewRow);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getcategorie = await axios.get(
          "http://localhost:3000/api/getcategorie"
        );
        const getsubcategorie = await axios.get(
          "http://localhost:3000/api/getSubCategorie"
        );
        const getproductbrand = await axios.get(
          "http://localhost:3000/api/getproductbrand"
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

  useEffect(() => {
    const storedCounter = localStorage.getItem("venderCounter");
    if (storedCounter) {
      setCounter(parseInt(storedCounter, 10));
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (EditVenderData) {
        await axios.put(
          `http://localhost:3000/api/updateVender/${EditVenderData._id}`,
          {
            vender,
            email,
            phoneno,
            address,
            state,
            city,
            pincode,
            gstno,
            pan,
            productbrand,
            newRow,
          }
        );
        toast.success("Vender Update Successfully...");
      } else {
        await axios.post("http://localhost:3000/api/addVender", {
          vender,
          vendercode,
          userName,
          email,
          phoneno,
          address,
          state,
          city,
          pincode,
          gstno,
          pan,
          productbrand,
          newRow,
        });
        toast.success("Vender Create Successfully...");
      }
      const newCounter = counter + 1;
      setCounter(newCounter);
      localStorage.setItem("venderCounter", newCounter);
      navigate("/vendors");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (EditVenderData) {
      setVender(EditVenderData.vender || "");
      setEmail(EditVenderData.email || "");
      setPhoneno(EditVenderData.phoneno || "");
      setAddress(EditVenderData.address || "");
      setState(EditVenderData.state || "");
      setCity(EditVenderData.city || "");
      setPincode(EditVenderData.pincode || "");
      setGstno(EditVenderData.gstno || "");
      setPan(EditVenderData.pan || "");
      setProductbrand(EditVenderData.productbrand || "");
      setNewRow(EditVenderData.newRow || "");
    }
  }, [EditVenderData]);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col w-full min-w-0 bg-[#F3F7F9]">
        <Header name="Vendors" />
        <section className="m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0 ">
          <div className="flex justify-end">
            <NavLink
              to="/vendors"
              className="cursor-pointer px-4 py-1 flex justify-center items-center gap-2 rounded-lg bg-[#0A6637] text-white"
            >
              <i className="fa-solid fa-left-long"></i>
              Back
            </NavLink>
          </div>
          <h2 className="text-base max-xl:text-sm text-[#505050]">
            Vendors /{" "}
            <span className="text-[#0A6637]">
              {EditVenderData ? "Edit" : "Create"}
            </span>
          </h2>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-5 mt-5 py-6 px-4 border border-gray-200 shadow rounded-xl"
          >
            <h2 className="text-xl max-2xl:text-lg font-medium text-[#202020]">
              Vendor Details
            </h2>
            <div className="bg-[#F6F6F6] px-4 py-5 rounded-lg">
              <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-3">
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Vendor Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    name="VendorName"
                    required
                    placeholder="Enter Vendor Name"
                    value={vender}
                    onChange={(e) => setVender(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Email Id <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    required
                    name="EmailId"
                    placeholder="Enter Email Id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Phone No. <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    name="city"
                    required
                    placeholder="Enter Phone No."
                    value={phoneno}
                    onChange={(e) => setPhoneno(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    name="Address"
                    required
                    placeholder="Enter Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    State <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={state}
                    required
                    onChange={(e) => setState(e.target.value)}
                    className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    id="State"
                  >
                    <option value="">-- Select State --</option>
                    {Array.isArray(selectstate) &&
                      selectstate.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    City <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    required
                    name="City"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Pincode <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    required
                    name="Pincode"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    GST No. <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    required
                    name="GSTNo"
                    placeholder="Enter GST No."
                    value={gstno}
                    onChange={(e) => setGstno(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    PAN No. <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    required
                    name="PANNo"
                    placeholder="Enter PAN No."
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Product Brand <span className="text-red-600">*</span>
                  </label>
                  <select
                    required
                    value={productbrand}
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
              </div>
            </div>

            <h2 className="text-xl max-2xl:text-lg font-medium text-[#202020]">
              Product Details
            </h2>
            <div className="bg-[#F6F6F6]  px-4 py-5 rounded-lg">
              {newRow.map((row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-4 max-xl:grid-cols-3 gap-3"
                >
                  <div className="mb-3">
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Product Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      type="text"
                      required
                      name="ProductName"
                      placeholder="Enter Product Name"
                      value={row.ProductName}
                      onChange={(e) =>
                        handleInputChange(e, row.id, "ProductName")
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      SKU ID <span className="text-red-600">*</span>
                    </label>
                    <input
                      className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      type="text"
                      required
                      name="SKUID"
                      placeholder="Enter SKU ID"
                      value={row.SKUID}
                      onChange={(e) => handleInputChange(e, row.id, "SKUID")}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Product Category <span className="text-red-600">*</span>
                    </label>
                    <select
                      required
                      value={row.Category}
                      onChange={(e) => handleInputChange(e, row.id, "Category")}
                      className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      id="Category"
                    >
                      <option value="">-- Select Category --</option>
                      {Array.isArray(selectcategorie) &&
                        selectcategorie.map((categorie) => (
                          <option key={categorie} value={categorie}>{categorie}</option>
                        ))}
                    </select>
                  </div>
                  <div className="flex items-end gap-3 mb-3">
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Product Sub Category <span className="text-red-600">*</span>
                      </label>
                      <select
                        value={row.SubCategory}
                        required
                        onChange={(e) =>
                          handleInputChange(e, row.id, "SubCategory")
                        }
                        className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        id="SubCategory"
                      >
                        <option value="">-- Select Sub Category --</option>
                        {Array.isArray(selectsubcategorie) &&
                          selectsubcategorie.map((subcategorie) => (
                            <option key={subcategorie} value={subcategorie}>{subcategorie}</option>
                          ))}
                      </select>
                    </div>
                    <i
                      onClick={() => handleRemoveRow(row.id)}
                      className="fa-regular fa-circle-xmark text-lg pb-2 font-medium text-red-600 cursor-pointer"
                    ></i>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={AddNewRow}
                  className="text-base cursor-pointer max-xl:text-sm font-medium px-4 py-1 max-xl:px-3 max-xl:py-[0.38rem] border rounded-lg border-[#D8D8D8] text-[#505050 bg-white"
                >
                  Add New
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 max-xl:px-3 max-xl:py-1 bg-[#0A6637] text-base max-xl:text-sm font-medium text-white cursor-pointer rounded-lg"
              >
                {EditVenderData ? "Update" : "Add New"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddNewVender;
