import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { ClipLoader } from "react-spinners";
function Users() {
  const [popup, setPopup] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userName, setUserName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [jobrole, setJobrole] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [EditUser, setEditUser] = useState(null);
  const [selectJobRole, setSelectJobRole] = useState([]);
  const [userImage, setUserImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [entryPerPage, setEntryPerPage] = useState(10);
  const [inputValue, setInputValue] = useState("");
  const [filter,setFilter] = useState("")
  

  const fetchjobrole = async () => {
    const res = await axios.get("https://poskartik.onrender.com/api/getRole");
    setSelectJobRole(res.data);
  };

  useEffect(() => {
    fetchjobrole();
  }, []);

  const toggleSection = () => {
    setPopup(true);
  };
  const fetchUserData = async () => {
    try {
      const res = await axios.get("https://poskartik.onrender.com/api/getUser");
      setUserData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const handleFileChange = (e) => {
    const selectfile = e.target.files[0];
    setUserImage(selectfile);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("employeeId", employeeId);
    formData.append("emailId", emailId);
    formData.append("password", password);
    formData.append("password2", password2);
    formData.append("jobrole", jobrole);
    formData.append("mobileNo", mobileNo);
    formData.append("location", location);
    formData.append("userImage", userImage);
    try {
      if (EditUser) {
        await axios.put(
          `https://poskartik.onrender.com/api/updateUser/${EditUser._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("https://poskartik.onrender.com/api/addUser", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setPopup(false);
      fetchUserData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const EditToUser = userData.find((user) => user._id === id);
    setEditUser(EditToUser);
    setPopup(true);
  };
  useEffect(() => {
    if (EditUser) {
      setUserName(EditUser.userName || "");
      setEmployeeId(EditUser.employeeId || "");
      setEmailId(EditUser.emailId || "");
      setPassword(EditUser.password || "");
      setPassword2(EditUser.password2 || "");
      setJobrole(EditUser.jobrole || "");
      setMobileNo(EditUser.mobileNo || "");
      setLocation(EditUser.location || "");
      setUserImage(EditUser.userImage || "");
    }
  }, [EditUser]);

  const confirmDelete = (id) => {
    setDeleteIndex(id);
    setOpenDeletePopup(true);
  };
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://poskartik.onrender.com/api/deleteUser/${id}`);
      setOpenDeletePopup(false);
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };

    const filterdata = userData.filter((sub) => {
    return (
      sub.userName.toLowerCase().includes(filter.toLowerCase()) ||
      sub.employeeId.toLowerCase().includes(filter.toLowerCase()) ||
      sub.emailId.toLowerCase().includes(filter.toLowerCase()) ||
      sub.jobrole.toLowerCase().includes(filter.toLowerCase()) ||
      sub.mobileNo.toLowerCase().includes(filter.toLowerCase()) ||
      sub.location.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const filterProduct = filterdata.filter((sub) => {
    return (
      sub.userName.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.employeeId.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.emailId.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.jobrole.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.mobileNo.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.location.toLowerCase().includes(inputValue.toLowerCase())
    );
  });



  const totalPages = Math.ceil(userData.length / entryPerPage);
  const startIndex = (currentPage - 1) * entryPerPage;
  const lastIndex = startIndex + entryPerPage;
  const currentData = filterProduct.slice(startIndex, lastIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col w-full min-w-0 bg-[#F3F7F9]">
        <Header name="Users" setInputValue={setInputValue} />
        <section className="m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0">
          <div className="flex justify-end gap-4">
            <div className="relative flex items-center border rounded-md px-3 py-[0.35rem] bg-white shadow-sm focus-within:ring-2 focus-within:ring-[#0A6637] transition">
              <i className="fa-solid fa-filter "></i>
              <input
                type="text"
                placeholder="Search Filter..."
                onChange={(e)=>setFilter(e.target.value)}
                className="ml-2 border-none outline-none placeholder-gray-400 text-sm max-xl:text-xs w-40 sm:w-60"
              />
            </div>
            <div>
              <NavLink to="/users/jobrole">
                <button className="flex items-center px-4 py-[0.35rem] gap-2 text-[#505050] border rounded-md cursor-pointer hover:bg-[#0A6637] hover:text-white transition duration-300">
                  <i className="fa-solid fa-shield-halved"></i> Manage Access
                </button>
              </NavLink>
            </div>
            <div>
              <button
                onClick={toggleSection}
                className="flex items-center px-4 py-[0.35rem] gap-2 border cursor-pointer rounded-md bg-[#0A6637] text-white transition duration-300"
              >
                <i className="fa-solid fa-circle-plus text-[#f7f7f7]"></i>Add
                User
              </button>
            </div>
          </div>
          {popup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
              <div className="bg-white border rounded-lg shadow-lg w-3/4 max-w-3xl">
                <div className="flex justify-between items-center p-5 border-b">
                  <h1 className="font-semibold text-xl max-xl:text-lg text-[#0A6637]">
                    New User
                  </h1>
                  <button
                    onClick={() => setPopup(false)}
                    className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                {/* Form Content */}
                <div className="p-5">
                  <form
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-5"
                  >
                    {/* Form Fields */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div>
                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                          Employee Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          onChange={(e) => setUserName(e.target.value)}
                          className="border px-3 py-[0.35rem] text-sm max-xl:text-xs mt-1 w-full font-normal text-[#A1A7C4] rounded-md border-[#aaaaaa] focus:outline-none focus:ring-1 focus:ring-[#0A6637]"
                          type="text"
                           required
                          value={userName}
                          placeholder="Yogendra Panchal"
                        />
                      </div>
                      <div>
                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                          Employee ID <span className="text-red-600">*</span>
                        </label>
                        <input
                          onChange={(e) => setEmployeeId(e.target.value)}
                          className="border px-3 py-[0.35rem] text-sm max-xl:text-xs mt-1 font-normal text-[#A1A7C4] w-full rounded-md border-[#aaaaaa] focus:outline-none focus:ring-1 focus:ring-[#0A6637]"
                          type="text"
                          required
                          value={employeeId}
                          placeholder="SIMP12345"
                        />
                      </div>
                      <div>
                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                          Email ID <span className="text-red-600">*</span>
                        </label>
                        <input
                          onChange={(e) => setEmailId(e.target.value)}
                          className="border px-3 py-[0.35rem] text-sm max-xl:text-xs mt-1 font-normal text-[#A1A7C4] w-full rounded-md border-[#aaaaaa] focus:outline-none focus:ring-1 focus:ring-[#0A6637]"
                          type="email"
                           required
                          value={emailId}
                          placeholder="info@simploona.com"
                        />
                      </div>
                      <div>
                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                          Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          onChange={(e) => setMobileNo(e.target.value)}
                          className="border px-3 py-[0.35rem] text-sm max-xl:text-xs mt-1 font-normal text-[#A1A7C4] w-full rounded-md border-[#aaaaaa] focus:outline-none focus:ring-1 focus:ring-[#0A6637]"
                          type="text"
                           required
                          value={mobileNo}
                          placeholder="9876543210"
                        />
                      </div>
                      <div>
                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                          Job Role <span className="text-red-600">*</span>
                        </label>
                        <select
                          onChange={(e) => setJobrole(e.target.value)}
                          className="border px-3 py-[0.35rem] text-sm max-xl:text-xs mt-1 font-normal text-[#A1A7C4] w-full rounded-md border-[#aaaaaa] focus:outline-none focus:ring-1 focus:ring-[#0A6637]"
                          value={jobrole}
                           required
                        >
                          <option value="" disabled>
                            --Select Job Role--
                          </option>
                          {selectJobRole.map((user, index) => (
                            <option key={index} value={user.roleName}>
                              {user.roleName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                          Location <span className="text-red-600">*</span>
                        </label>
                        <input
                          onChange={(e) => setLocation(e.target.value)}
                          className="border px-3 py-[0.35rem] text-sm max-xl:text-xs mt-1 font-normal text-[#A1A7C4] w-full rounded-md border-[#aaaaaa] focus:outline-none focus:ring-1 focus:ring-[#0A6637]"
                          type="text"
                          required
                          value={location}
                          placeholder="Gujarat"
                        />
                      </div>

                      <div className="relative">
                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                          Password <span className="text-red-600">*</span>
                        </label>
                        <input
                         required
                          onChange={(e) => setPassword(e.target.value)}
                          className="border px-3 py-[0.35rem] text-sm max-xl:text-xs mt-1 font-normal text-[#202020] w-full rounded-md border-[#aaaaaa] focus:outline-none focus:ring-1 focus:ring-[#0A6637] pr-10"
                          type={showPassword ? "text" : "password"}
                          placeholder="*********"
                          value={password}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className={`absolute right-3 ${
                            showMessage ? "top-[55%]" : "top-[55%]"
                          } transform -translate-y-1/2 text-[#A1A7C4] hover:text-[#0A6637]`}
                        >
                          <i
                            className={
                              showPassword
                                ? "fa-regular fa-eye-slash"
                                : "fa-regular fa-eye"
                            }
                          ></i>
                        </button>
                        <span className="font-normal text-[#202020] text-sm max-xl:text-xs">
                          (A-Z; a-z; 0-9; @, #, $, %)
                        </span>
                      </div>

                      <div className="relative">
                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                          Re-Enter Password
                        </label>
                        <input
                          onChange={(e) => {
                            setPassword2(e.target.value);
                            if (
                              password !== e.target.value &&
                              password !== ""
                            ) {
                              setShowMessage(true);
                            } else {
                              setShowMessage(false);
                            }
                          }}
                          className={`border px-3 py-[0.35rem] text-sm max-xl:text-xs mt-1 w-full font-normal text-[#202020] rounded-md ${
                            showMessage
                              ? "border-[#0A6637]"
                              : "border-[#aaaaaa]"
                          } focus:outline-none focus:ring-1 ${
                            showMessage
                              ? "focus:ring-[#0A6637]"
                              : "focus:ring-[#0A6637]"
                          } pr-10`}
                          type={showPassword2 ? "text" : "password"}
                          placeholder="Re-Enter Password"
                          value={password2}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword2((prev) => !prev)}
                          className={`absolute right-3 ${
                            showMessage ? "top-[55%]" : "top-[55%]"
                          } transform -translate-y-1/2 text-[#A1A7C4] hover:text-[#0A6637]`}
                        >
                          <i
                            className={
                              showPassword2
                                ? "fa-regular fa-eye-slash"
                                : "fa-regular fa-eye"
                            }
                          ></i>
                        </button>
                        {showMessage && (
                          <p className="text-[#0A6637] text-xs mt-1">
                            Passwords does not match.
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm max-xl:text-xs mb-1">
                        User Profile Photo <span className="text-red-600">*</span>
                      </p>
                      <div className="flex items-center rounded-md border border-gray-300">
                        <input
                          id="Personal_Proof"
                          type="file"
                          name="PersonalProof"
                          accept="image/*"
                          className="hidden"
                          required
                          onChange={handleFileChange}
                        />
                        <label
                          htmlFor="Personal_Proof"
                          className="flex items-center text-white text-sm max-xl:text-xs justify-center gap-3 px-4 py-[0.35rem] bg-[#0A6637] rounded-md shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                          <i className="fa-solid fa-cloud-arrow-up"></i>
                          Upload Profile Photo
                        </label>
                        {userImage && userImage instanceof File && (
                          <p className="ml-2 text-sm text-gray-700">
                            {userImage.name}
                          </p>
                        )}
                      </div>
                      {userImage && (
                        <img
                          src={
                            typeof userImage === "string"
                              ? userImage
                              : URL.createObjectURL(userImage)
                          }
                          alt="Product"
                          className="mt-2 rounded-full w-20 h-20 object-cover"
                        />
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-0 flex justify-start gap-3">
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
                        ) : EditUser ? (
                          "Update"
                        ) : (
                          "Create User"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <section className="mt-5">
            <div className="overflow-x-auto">
              <table className="min-w-[100%] table-auto  rounded-lg shadow-sm border-separate border-spacing-0">
                <thead className="bg-[#F6F6F6] rounded-t-lg">
                  <tr>
                    <th className="w-10 px-4 py-[0.40rem] text-[#3A3A3A]  whitespace-nowrap text-base max-xl:text-sm font-medium  text-start border-b border-gray-300 rounded-tl-lg">
                      Sr No.
                    </th>
                    <th className="px-4 py-[0.40rem] text-[#3A3A3A] whitespace-nowrap text-base max-xl:text-sm font-medium  text-start border-b border-gray-300">
                      User Name
                    </th>
                    <th className="px-4 py-[0.40rem] text-[#3A3A3A] whitespace-nowrap text-base max-xl:text-sm font-medium  text-start border-b border-gray-300">
                      Employee Id
                    </th>
                    <th className="px-4 py-[0.40rem] text-[#3A3A3A] whitespace-nowrap text-base max-xl:text-sm font-medium  text-start border-b border-gray-300">
                      Email ID
                    </th>
                    {/* <th className="px-4 py-3 text-white font-semibold text-center border-b border-gray-300">Password</th> */}
                    <th className="px-4 py-[0.40rem] text-[#3A3A3A] whitespace-nowrap text-base max-xl:text-sm font-medium  text-start border-b border-gray-300">
                      Job Role
                    </th>
                    <th className="w-32 py-[0.40rem] text-[#3A3A3A] whitespace-nowrap text-base max-xl:text-sm font-medium  text-start border-b border-gray-300">
                      Mobile No
                    </th>
                    <th className="px-4 py-[0.40rem] text-[#3A3A3A] whitespace-nowrap text-base max-xl:text-sm font-medium  text-start border-b border-gray-300">
                      Location
                    </th>
                    <th className="px-4 py-[0.40rem] text-[#3A3A3A] whitespace-nowrap text-base max-xl:text-sm font-medium  text-start border-b border-gray-300 rounded-tr-lg"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length > 0 ? (
                    currentData.map((user, index) => {
                      const key = user._id || `user-${index}`;
                      return (
                        <tr key={key} className="border-t   border-gray-300">
                          <td className="px-4 py-[0.40rem]  text-[#202020] border-b whitespace-nowrap text-sm max-xl:text-xs font-normal text-start border-gray-300">
                            {startIndex + index + 1}
                          </td>
                          <td className="px-6 py-[0.40rem]  text-[#202020] text-sm max-xl:text-xs font-normal whitespace-nowrap border-b text-start border-gray-300">
                            {user.userName}
                          </td>
                          <td className="px-6 py-[0.40rem]  text-[#202020] whitespace-nowrap border-b text-start border-gray-300 text-sm max-xl:text-xs font-normal">
                            {user.employeeId}
                          </td>
                          <td className="px-6 py-[0.40rem]  text-[#202020] whitespace-nowrap  border-b text-start border-gray-300 text-sm max-xl:text-xs font-normal">
                            {user.emailId}
                          </td>
                          <td className="px-6 py-[0.40rem]  text-[#202020] whitespace-nowrap border-b text-start border-gray-300 text-sm max-xl:text-xs font-normal">
                            {user.jobrole}
                          </td>
                          <td className="px-6 py-[0.40rem]  text-[#202020] whitespace-nowrap border-b text-start border-gray-300 text-sm max-xl:text-xs font-normal">
                            {user.mobileNo}
                          </td>
                          <td className="px-6 py-[0.40rem]  text-[#202020] whitespace-nowrap border-b text-start border-gray-300 text-sm max-xl:text-xs font-normal">
                            {user.location}
                          </td>
                          <td className="w-20  ml-3 py-[0.40rem] text-[#202020] border-b whitespace-nowrap text-start border-gray-300 text-sm max-xl:text-xs font-normal">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(user._id);
                              }}
                            >
                              <i className="fa-solid fa-pen-to-square text-[#9A9A9A] cursor-pointer"></i>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                confirmDelete(user._id);
                              }}
                            >
                              <i className="fa-regular fa-trash-can text-[#9A9A9A] ml-3 cursor-pointer"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <>
                      <tr>
                        <td
                          colSpan="10"
                          className="text-center text-sm max-xl:text-xs text-[#5A607F] py-5 border rounded-md"
                        >
                          <div className="flex flex-col items-center justify-center">
                            {/* <img src={myImage} alt="Description" className="mb-2" /> */}
                            <span>No User Available.</span>
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>

             
              {openDeletePopup && (
                <div className="fixed inset-0 bg-[#2424242a] bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded shadow-lg animate-[popupBounceIn_0.5s_cubic-bezier(0.68,-0.55,0.265,1.55)]">
                    <p className="mb-4">
                      Are you sure you want to delete this User?
                    </p>
                    <div className="flex  justify-stretch gap-4">
                      <button
                        className="px-4 py-2 w-full bg-gray-300 rounded cursor-pointer"
                        onClick={() => setOpenDeletePopup(false)}
                      >
                        No
                      </button>
                      <button
                        className="px-4 py-2 w-full bg-[#0A6637] cursor-pointer text-white rounded"
                        onClick={() => handleDeleteUser(deleteIndex)}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
             <div className="mt-5 flex justify-between items-center">
                <div>
                  <p className="text-sm max-xl:text-xs">
                    show :{" "}
                    <span className="border px-2 py-1 rounded-sm border-[#D8D8D8]">
                      10
                    </span>
                    <span className="text-[#9A9A9A]">
                      {" "}
                      / {userData.length} products
                    </span>
                  </p>
                </div>

                <div className="text-sm max-xl:text-xs">
                  <span className=" font-medium">Page </span>
                  <select
                    className="px-2 py-1 border rounded-md focus:outline-none border-[#D8D8D8]"
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                  >
                    {Array.from({ length: totalPages }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="border px-3 py-1 max-xl:py-[1px] rounded-lg border-[#D8D8D8]">
                    <i
                      disabled={currentPage === 1}
                      onClick={handlePrev}
                      className={`fa-solid fa-chevron-left pr-3 cursor-pointer ${
                        currentPage === 1 ? "text-[#D8D8D8]" : "text-[#202020]"
                      }`}
                    ></i>
                    <span className="border border-[#D8D8D8]"></span>
                    <i
                      disabled={currentPage === totalPages}
                      onClick={handleNext}
                      className={`fa-solid fa-chevron-right pl-3 cursor-pointer ${
                        currentPage === totalPages
                          ? "text-[#D8D8D8]"
                          : "text-[#202020]"
                      }`}
                    ></i>
                  </div>
                </div>
              </div>
            {/* <section className="flex justify-between items-center mt-4 text-sm max-xl:text-xs font-normal">
              <button
                className={`px-4 py-[0.35rem] rounded-md ${currentPage === 1 ? "bg-gray-300" : "bg-[#E84000] text-white"
                  }`}
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="">
                <span className="text-base max-xl:text-sm font-medium">Page : </span>
                <select
                  className="px-3 py-[0.35rem] border rounded-md text-sm max-xl:text-xs focus:outline-none border-[#E84000]"
                  value={entriesPerPage}
                  onChange={handleEntriesChange}
                >
                  {[10, 20, 30, 40, 50].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className={`px-4 py-[0.35rem] rounded-md ${currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-[#E84000] text-white"
                  }`}
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </section> */}
          </section>
        </section>
      </main>
    </div>
  );
}

export default Users;
