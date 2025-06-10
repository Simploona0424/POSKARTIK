import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ClipLoader } from "react-spinners";
function EditCustomers() {
  const location = useLocation();
  const navigate = useNavigate();
  const customerData = location.state?.data;
  const [customerType] = useState(customerData.customerType);
  const [businessProof, setBusinessProof] = useState(
    customerData?.businessProof || ""
  );
  const [personalproof, setPersonalproof] = useState(
    customerData?.personalproof || ""
  );
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerType: customerData?.customerType || "",
    companyName: customerData?.companyName || "",
    concernPerson: customerData?.concernPerson || "",
    emailID: customerData?.emailID || "",
    phoneNO: customerData?.phoneNO || "",
    location: customerData?.location || "",
    rMcode: customerData?.rMcode || "",
    address1: customerData?.address1 || "",
    address2: customerData?.address2 || "",
    city: customerData?.city || "",
    state: customerData?.state || "",
    pincode: customerData?.pincode || "",
    gstno: customerData?.gstno || "",
    personalproof: customerData?.personalproof || "",
    businessProof: customerData?.businessProof || "",
    newRows: customerData?.newRows || [],
  });

  const AddNewRow = () => {
    const Row = {
      id: (formData.newRows?.length || 0) + 1,
      fullName: "",
      emailId: "",
      phoneNo: "",
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      newRows: [...(prevFormData.newRows || []), Row],
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = customerData?._id;

    const data = new FormData();

    // Append all fields
    data.append("customerType", formData.customerType);
    data.append("companyName", formData.companyName);
    data.append("concernPerson", formData.concernPerson);
    data.append("emailID", formData.emailID);
    data.append("phoneNO", formData.phoneNO);
    data.append("location", formData.location);
    data.append("rMcode", formData.rMcode);
    data.append("address1", formData.address1);
    data.append("address2", formData.address2);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("pincode", formData.pincode);
    data.append("gstno", formData.gstno);
    data.append("newRows", JSON.stringify(formData.newRows));
    if (personalproof) data.append("personalproof", personalproof);
    if (businessProof) data.append("businessProof", businessProof);

    try {
      await axios.put(`https://poskartik.onrender.com/api/updatecustomer/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Customer Update Successfull...");
      navigate("/customers");
    } catch (error) {
      console.error("Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRow = (rowId) => {
    const updatedRows = formData.newRows.filter((row) => row.id !== rowId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      newRows: updatedRows,
    }));
  };

  const handlePersonalProofChange = (e) => {
    const selectFile = e.target.files[0];
    setPersonalproof(selectFile);
  };
  const handlebusinessProofChange = (e) => {
    const selectFile = e.target.files[0];
    setBusinessProof(selectFile);
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const HandleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedRows = [...formData.newRows];
    updatedRows[index] = {
      ...updatedRows[index],
      [name]: value,
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      newRows: updatedRows,
    }));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 w-full min-w-0 flex flex-col">
        <Header name="Customers" />
        <section className="m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0">
          <div className="flex justify-end">
            <NavLink
              to="/customers"
              className="cursor-pointer px-4 py-1 flex justify-center items-center gap-2 rounded-lg bg-[#0A6637] text-white"
            >
              <i className="fa-solid fa-left-long"></i>
              Back
            </NavLink>
          </div>
          <h2 className="text-base max-xl:text-sm text-[#505050]">
            Customer / <span className="text-[#0A6637]">Edit</span>
          </h2>

          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-5 mt-5 py-6 px-4 border border-gray-200 shadow rounded-xl"
          >
            <div className="flex items-center gap-3 text-sm max-xl:text-xs">
              <h4 className="text-[#202020]">Customers :</h4>
              <div className="flex items-center gap-4 cursor-pointer">
                <div>
                  <input
                    className="mr-1"
                    type="radio"
                    name="Customers"
                    readOnly
                    checked={formData.customerType === "Individual"}
                    id="Individual"
                  />
                  <label className="text-[#505050]" htmlFor="Individual">
                    Individual
                  </label>
                </div>
                <div>
                  <input
                    className="mr-1"
                    type="radio"
                    checked={formData.customerType === "Agency"}
                    readOnly
                    name="Customers"
                    id="Agency"
                  />
                  <label className="text-[#505050]" htmlFor="Agency">
                    Agency
                  </label>
                </div>
              </div>
            </div>
            {customerType === "Individual" && (
              <>
                <div className="bg-[#F6F6F6] px-4 py-5 rounded-lg">
                  <div className="grid grid-cols-5 max-2xl:grid-cols-4 gap-4 max-xl:grid-cols-3">
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Company Name <span className='text-red-600'>*</span>
                      </label> 
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="companyName"
                        value={formData.companyName}
                        placeholder="Enter company name"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Email Id <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="email"
                        required
                        name="emailID"
                        value={formData.emailID}
                        placeholder="Enter email Id"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Phone no. <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="phoneNO"
                        value={formData.phoneNO}
                        placeholder="Enter phone no"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Location <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        placeholder="Enter location"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Employee ID <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="rMcode"
                        required
                        value={formData.rMcode}
                        placeholder="Enter RM code"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Address Line 1 <span className='text-red-600'>*</span>
                      </label> 
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="address1"
                        required
                        value={formData.address1}
                        placeholder="Enter Address"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Address Line 2 <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="address2"
                        required
                        value={formData.address2}
                        placeholder="Enter Address"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        City <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="city"
                        value={formData.city}
                        placeholder="Enter Address"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        State <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="state"
                        required
                        value={formData.state}
                        placeholder="Enter State"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Pincode <span className='text-red-600'>*</span>
                      </label> 
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="pincode"
                        value={formData.pincode}
                        placeholder="Enter pincode"
                        onChange={handleGeneralChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[40%] max-xl:w-[60%]">
                  <p className="text-sm max-xl:text-xs mb-1">Personal Proof <span className='text-red-600'>*</span></p>
                  <div className="flex items-center rounded-md border border-gray-300">
                    <input
                      id="Personal_Proof"
                      type="file"
                      required
                      name="PersonalProof"
                      value={formData.personalproof.name}
                      className="hidden"
                      onChange={handlePersonalProofChange}
                    />
                    <label
                      htmlFor="Personal_Proof"
                      className="flex items-center text-white text-sm max-xl:text-xs justify-center gap-3 px-4 py-[0.35rem] bg-[#0A6637] rounded-md shadow cursor-pointer  focus:outline-none focus:ring-2  focus:ring-offset-2"
                    >
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      Upload Document.pdf 
                    </label>
                    {personalproof.name ? (
                      <p className="mt-1 text-sm max-xl:text-xs text-gray-700 font-medium truncate">
                        {personalproof.name}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm max-xl:text-xs text-gray-700 px-2 font-medium truncate">
                        {customerData?.personalproof?.split("-").pop()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-end ">
                  <button className="px-4 py-2 max-xl:px-3 max-xl:py-[0.38rem] bg-[#0A6637] text-base max-xl:text-sm font-medium text-white cursor-pointer rounded-lg">
                    Update
                  </button>
                </div>
              </>
            )}
            {customerType === "Agency" && (
              <>
                <div className="bg-[#F6F6F6] px-4 py-5 rounded-lg">
                  <div className="grid grid-cols-5 max-2xl:grid-cols-4 gap-4 max-xl:grid-cols-3">
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Company Name <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        placeholder="Enter company name"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Concern Person <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="concernPerson"
                        value={formData.concernPerson}
                        placeholder="Enter Concern Person name"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Email Id <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="email"
                        name="emailID"
                        required
                        value={formData.emailID}
                        placeholder="Enter email Id"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Phone no. <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="phoneNO"
                        required
                        value={formData.phoneNO}
                        placeholder="Enter phone no"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Location <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="location"
                        required
                        value={formData.location}
                        placeholder="Enter location"
                        onChange={handleGeneralChange}
                      />
                    </div>

                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Address Line 1 <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="address1"
                        required
                        value={formData.address1}
                        placeholder="Enter Address"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Address Line 2 <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="address2"
                        value={formData.address2}
                        placeholder="Enter Address"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        City <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        placeholder="Enter Address"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        State <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="state"
                        value={formData.state}
                        placeholder="Enter State"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Pincode <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="pincode"
                        value={formData.pincode}
                        placeholder="Enter pincode"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        GST No <span className='text-red-600'>*</span>
                      </label> 
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="gstno"
                        value={formData.gstno}
                        placeholder="Enter gst no"
                        onChange={handleGeneralChange}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        RM Code <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="rMcode"
                        value={formData.rMcode}
                        placeholder="Enter RM code"
                        onChange={handleGeneralChange}
                      />
                    </div>
                  </div>
                </div>

                <div className=" bg-[#F6F6F6] px-4 py-5 rounded-lg">
                  <h3 className="text-base max-xl:text-sm font-semibold">
                    POC
                  </h3>
                  <div className="mt-3 overflow-x-auto">
                    <table className="min-w-[100%] table-auto  border-separate border-spacing-0 rounded-t-xl shadow-sm ">
                      <thead className="bg-[#D8D8D8] rounded-t-xl">
                        <tr>
                          <th className="w-10 px-2 py-[0.40rem] whitespace-nowrap border text-black  text-sm max-xl:text-xs font-medium text-center  border-gray-300 rounded-tl-xl">
                            Sr. No.
                          </th>
                          <th className="px-2 py-[0.40rem] whitespace-nowrap  text-black border text-sm max-xl:text-xs font-medium text-center  border-gray-300 ">
                            Full Name <span className='text-red-600'>*</span>
                          </th>
                          <th className="px-2 whitespace-nowrap py-[0.40rem] text-black border text-sm max-xl:text-xs font-medium text-center  border-gray-300">
                            Email ID <span className='text-red-600'>*</span>
                          </th>
                          <th className=" px-2 py-[0.40rem] whitespace-nowrap  text-black border text-sm max-xl:text-xs font-medium text-center  border-gray-300">
                            Phone no <span className='text-red-600'>*</span>
                          </th>
                          <th className=" px-2 py-[0.40rem] whitespace-nowrap  text-black border text-sm max-xl:text-xs font-medium text-center  border-gray-300 rounded-tr-xl"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {formData.newRows.map((row, index) => (
                          <tr key={row.id || index}>
                            <td className=" whitespace-nowrap px-2 py-1 text-sm max-xl:text-xs font-normal border  text-center border-gray-300 ">
                              {row.id}
                            </td>
                            <td className=" whitespace-nowrap px-2 py-1 text-sm max-xl:text-xs font-normal border text-center border-gray-300 ">
                              <input
                                type="text"
                                required
                                name="fullName"
                                value={row.fullName}
                                onChange={(e) => HandleChange(e, index)}
                                className="border border-gray-200 py-1 w-full px-2 text-gray-500 rounded-md"
                              />
                            </td>
                            <td className=" whitespace-nowrap px-2 py-1 text-sm max-xl:text-xs font-normal border text-center border-gray-300 ">
                              <input
                                type="email"
                                name="emailId"
                                required
                                value={row.emailId}
                                onChange={(e) => HandleChange(e, index)}
                                className="border border-gray-200 py-1 w-full px-2 text-gray-500 rounded-md"
                              />
                            </td>
                            <td className=" whitespace-nowrap px-2 py-1 text-sm max-xl:text-xs font-normal border-b text-center border-gray-300 ">
                              <input
                                type="text"
                                name="phoneNo"
                                required
                                value={row.phoneNo}
                                onChange={(e) => HandleChange(e, index)}
                                className="border border-gray-200 py-1 w-full px-2 text-gray-500 rounded-md"
                              />
                            </td>
                            <td className="px-2 text-center border-b border-gray-300">
                              <i
                                onClick={() => handleDeleteRow(row.id)}
                                className="fa-regular fa-circle-xmark text-red-600  text-lg max-xl:text-base cursor-pointer"
                              ></i>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={AddNewRow}
                      className="px-4 py-2 max-xl:px-3 max-xl:py-[0.38rem] bg-[#0A6637] text-base max-xl:text-sm font-medium text-white cursor-pointer rounded-lg"
                    >
                      Add New
                    </button>
                  </div>
                </div>

                <div className="w-[40%] max-xl:w-[60%]">
                  <p className="text-sm max-xl:text-xs mb-1">Business Proof <span className='text-red-600'>*</span></p>
                  <div className="flex items-center rounded-md border border-gray-300">
                    <input
                      id="business_Proof"
                      type="file"
                      required
                      name="business_Proof"
                      className="hidden"
                      onChange={handlebusinessProofChange}
                    />
                    <label
                      htmlFor="business_Proof"
                      className="flex items-center text-white text-sm max-xl:text-xs justify-center gap-3 px-4 py-[0.35rem] bg-[#0A6637] rounded-md shadow cursor-pointer  focus:outline-none focus:ring-2  focus:ring-offset-2"
                    >
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      Upload Document.pdf
                    </label>
                    {businessProof.name ? (
                      <p className="mt-1 text-sm max-xl:text-xs text-gray-700 font-medium truncate">
                        {businessProof.name}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm max-xl:text-xs text-gray-700 px-2 font-medium truncate">
                        {customerData?.businessProof?.split("-").pop()}
                      </p>
                    )}
                  </div>
                </div>

                <div type="submit" className="text-end ">
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
                      "Update"
                    )}
                  </button>
                </div>
              </>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}

export default EditCustomers;
