import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
function AddNewCustomers() {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState([]);
  const [customerType, setCustomerType] = useState("Individual");
  const [companyName, setCompanyName] = useState("");
  const [concernPerson, setConcernPerson] = useState("");
  const [emailID, setEmailID] = useState("");
  const [phoneNO, setPhoneNO] = useState("");
  const [location, setLocation] = useState("");
  const [rMcode, setRMcode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [gstno, setGstno] = useState("");
  const [loading, setLoading] = useState(false);
  const [businessProof, setBusinessProof] = useState(null);
  const [personalproof, setPersonalproof] = useState(null);

  const [newRows, setNewRows] = useState([]);
  const handleChangeRow = (e, id, field) => {
    const value = e.target.value;
    setNewRows((prevSections) =>
      prevSections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };
  const addNewRow = () => {
    setNewRows([
      ...newRows,
      { id: newRows.length + 1, fullName: "", emailId: "", phoneNo: "" },
    ]);
  };

  const handleDeleteRow = (id) => {
    const updatedRow = newRows.filter((section) => section.id !== id);
    setNewRows(updatedRow);
  };
  const handleChangeCustomers = (event) => {
    setCustomerType(event.target.id);
  };

  const handlePersonalProofChange = (e) => {
    const selectFile = e.target.files[0];
    setPersonalproof(selectFile);
  };
  const handlebusinessProofChange = (e) => {
    const selectFile = e.target.files[0];
    setBusinessProof(selectFile);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("customerType", customerType);
    formData.append("companyName", companyName);
    formData.append("concernPerson", concernPerson);
    formData.append("emailID", emailID);
    formData.append("phoneNO", phoneNO);
    formData.append("location", location);
    formData.append("rMcode", rMcode);
    formData.append("address1", address1);
    formData.append("address2", address2);
    formData.append("city", city);
    formData.append("state", state);
    formData.append("pincode", pincode);
    formData.append("gstno", gstno);
    formData.append("newRows", JSON.stringify(newRows));
    if (personalproof) formData.append("personalproof", personalproof);
    if (businessProof) formData.append("businessProof", businessProof);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/setcustomer",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCustomerData(response.data);
      toast.success("Customer Create Successfully...");
      navigate("/customers");
      setCustomerType("Individual");
      setCompanyName("");
      setConcernPerson("");
      setEmailID("");
      setPhoneNO("");
      setLocation("");
      setRMcode("");
      setAddress1("");
      setAddress2("");
      setCity("");
      setState("");
      setPincode("");
      setGstno("");
      setPersonalproof("");
      setNewRows([
        {
          id: 1,
          fullName: "",
          emailId: "",
          phoneNo: "",
        },
      ]);
    } catch (error) {
      console.error("Error submitting customer data:", error);
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-base max-xl:text-sm  text-[#505050]">
            Customer / <span className="text-[#0A6637]">Create</span>
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
                    id="Individual"
                    onChange={handleChangeCustomers}
                    defaultChecked
                  />
                  <label className="text-[#505050]" htmlFor="Individual">
                    Individual
                  </label>
                </div>
                <div>
                  <input
                    className="mr-1"
                    type="radio"
                    name="Customers"
                    id="Agency"
                    onChange={handleChangeCustomers}
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
                  <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 gap-4 ">
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Company Name <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="companyname"
                        placeholder="Enter company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
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
                        name="emailid"
                        placeholder="Enter email Id"
                        value={emailID}
                        onChange={(e) => setEmailID(e.target.value)}
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
                        name="phoneno"
                        placeholder="Enter phone no"
                        value={phoneNO}
                        onChange={(e) => setPhoneNO(e.target.value)}
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
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Employee ID <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="rmcode"
                        placeholder="Enter RM code"
                        value={rMcode}
                        onChange={(e) => setRMcode(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Address Line 1 <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="addressline1"
                        placeholder="Enter Address"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Address Line 2
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        
                        name="addressline2"
                        placeholder="Enter Address"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
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
                        placeholder="Enter Address"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
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
                        placeholder="Enter State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Pincode <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="pincode"
                        required
                        placeholder="Enter pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-[40%] max-xl:w-[60%]">
                  <p className="text-sm max-xl:text-xs mb-1 text-[#202020]">
                    Personal Proof <span className='text-red-600'>*</span>
                  </p>
                  <div className="flex items-center rounded-md border border-gray-300">
                    <input
                      id="Personal_Proof"
                      type="file"
                      name="PersonalProof"
                      required
                      className="hidden"
                      onChange={handlePersonalProofChange}
                    />
                    <label
                      htmlFor="Personal_Proof"
                      className="flex items-center  text-white text-sm max-xl:text-xs justify-center gap-3 px-4 py-[0.35rem] bg-[#0A6637] rounded-md shadow cursor-pointer  focus:outline-none focus:ring-2  focus:ring-offset-2"
                    >
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      Upload Document.pdf
                    </label>
                    {personalproof && (
                      <p className="mt-1 text-sm max-xl:text-xs text-gray-700  truncate">
                        {personalproof.name}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            {customerType === "Agency" && (
              <>
                <div className="bg-[#F6F6F6] px-4 py-5 rounded-lg">
                  <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 gap-4 ">
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Company Name <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="companyname"
                        placeholder="Enter company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
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
                        name="concernperson"
                        placeholder="Enter Concern Person name"
                        value={concernPerson}
                        onChange={(e) => setConcernPerson(e.target.value)}
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
                        name="emailid"
                        placeholder="Enter email Id"
                        value={emailID}
                        onChange={(e) => setEmailID(e.target.value)}
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
                        name="phoneno"
                        placeholder="Enter phone no"
                        value={phoneNO}
                        onChange={(e) => setPhoneNO(e.target.value)}
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
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Address Line 1 <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        required
                        name="addressline1"
                        placeholder="Enter Address"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Address Line 2 <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="addressline2"
                        required
                        placeholder="Enter Address"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
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
                        placeholder="Enter Address"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
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
                        placeholder="Enter State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
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
                        placeholder="Enter pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        GST No <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="GST No"
                        required
                        placeholder="Enter gst no"
                        value={gstno}
                        onChange={(e) => setGstno(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Employee ID <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="rmcode"
                        required
                        placeholder="Enter employee id"
                        value={rMcode}
                        onChange={(e) => setRMcode(e.target.value)}
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
                          <th className="w-10 px-2 py-[0.40rem] whitespace-nowrap border text-[#3A3A3A]  text-sm max-xl:text-xs font-medium text-center  border-gray-300 rounded-tl-xl">
                            Sr. No. 
                          </th>
                          <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A] border text-sm max-xl:text-xs font-medium text-center  border-gray-300 ">
                            Full Name <span className='text-red-600'>*</span>
                          </th>
                          <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] border text-sm max-xl:text-xs font-medium text-center  border-gray-300">
                            Email ID <span className='text-red-600'>*</span>
                          </th>
                          <th className=" px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A] border text-sm max-xl:text-xs font-medium text-center  border-gray-300">
                            Phone no <span className='text-red-600'>*</span>
                          </th>
                          <th className=" px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A] border text-sm max-xl:text-xs font-medium text-center  border-gray-300 rounded-tr-xl"></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {newRows.map((row, index) => (
                          <tr key={row.id}>
                            <td className=" whitespace-nowrap px-2 py-1 text-sm max-xl:text-xs font-normal border  text-center border-gray-300 ">
                              {index + 1}
                            </td>
                            <td className=" whitespace-nowrap px-2 py-1 text-sm max-xl:text-xs font-normal border text-center border-gray-300 ">
                              <input
                                type="text" 
                                required
                                value={row.fullName}
                                onChange={(e) =>
                                  handleChangeRow(e, row.id, "fullName")
                                }
                                className="border border-gray-200 py-1 w-full px-2 text-gray-500 rounded-md"
                              />
                            </td>
                            <td className=" whitespace-nowrap px-2 py-1 text-sm max-xl:text-xs font-normal border text-center border-gray-300 ">
                              <input
                                type="email"
                                required
                                value={row.emailId}
                                onChange={(e) =>
                                  handleChangeRow(e, row.id, "emailId")
                                }
                                className="border border-gray-200 py-1 w-full px-2 text-gray-500 rounded-md"
                              />
                            </td>
                            <td className=" whitespace-nowrap px-2 py-1 text-sm max-xl:text-xs font-normal border-b text-center border-gray-300 ">
                              <input
                                type="text"
                                required
                                value={row.phoneNo}
                                onChange={(e) =>
                                  handleChangeRow(e, row.id, "phoneNo")
                                }
                                className="border border-gray-200 py-1 w-full px-2 text-gray-500 rounded-md"
                              />
                            </td>
                            <td className="px-2 text-center border-b border-gray-300">
                              <i
                                onClick={() => handleDeleteRow(row.id)}
                                class="fa-regular fa-circle-xmark text-red-600  text-lg max-xl:text-base cursor-pointer"
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
                      onClick={addNewRow}
                      className="px-4 py-1 max-2xl:px-3 max-2xl:py-[0.35rem] text-[#0A6637] text-base max-xl:text-sm font-medium bg-white border-[#0A6637] border cursor-pointer rounded-lg"
                    >
                      Add New
                    </button>
                  </div>
                </div>

                <div className="w-[40%] max-xl:w-[60%]">
                  <p className="text-sm max-xl:text-xs mb-1 text-[#202020]">
                    Business Proof <span className='text-red-600'>*</span>
                  </p>
                  <div className="flex items-center rounded-md border border-gray-300">
                    <input
                      id="business_Proof"
                      required
                      type="file"
                      name="businessProof"
                      className="hidden"
                      onChange={handlebusinessProofChange}
                    />
                    <label
                      htmlFor="business_Proof"
                      className="flex items-center  text-white text-sm max-xl:text-xs justify-center gap-3 px-4 py-[0.35rem] bg-[#0A6637] rounded-md shadow cursor-pointer  focus:outline-none focus:ring-2  focus:ring-offset-2"
                    >
                      <i className="fa-solid fa-cloud-arrow-up"></i>
                      Upload Document.pdf
                    </label>
                    {businessProof && (
                      <p className="mt-1 text-sm max-xl:text-xs text-gray-700 truncate">
                        {businessProof.name}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className="text-end ">
              <button
                disabled={loading}
                type="submit"
                className="px-4 py-2 max-2xl:px-3 max-2xl:py-[0.35rem] bg-[#0A6637] text-base max-xl:text-sm font-medium text-white cursor-pointer rounded-lg"
              >
                {" "}
                {loading ? (
                  <>
                    <ClipLoader size={20} color="#FFFFFF" />
                    <span className="text-white">Processing...</span>
                  </>
                ) : (
                  "Add Customer"
                )}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddNewCustomers;
