import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
function Vendors() {
  const navigate = useNavigate();
  const [vender, setVender] = useState([]);
  const [expendRow, setExpendRow] = useState(false);
  const [activeTable, setActiveTable] = useState("address");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [productBrand, setProductBrand] = useState([]);
  const [venderName, setVenderName] = useState("");
  const [pincode, setPincode] = useState("");
  const [productName, setProductName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entryPerPage, setEntryPerPage] = useState(10);
  const [inputValue, setInputValue] = useState("");

  const hadleFilterFormSubmit = (e) => {
    e.preventDefault();
    const filterResult = vender?.filter((item) => {
      const matchVendorName =
        !venderName ||
        item.vender?.toLowerCase().includes(venderName.toLowerCase());
      const matchPincode =
        !pincode || item.pincode?.toLowerCase().includes(pincode.toLowerCase());
      const matchesProductName =
        !productName ||
        item.newRow?.some((row) =>
          row.ProductName?.toLowerCase().includes(productName.toLowerCase())
        );
      return matchVendorName && matchPincode && matchesProductName;
    });
    setVender(filterResult);
  };

  const handleClearAll = () => {
    setVenderName("");
    setPincode("");
    setProductName("");
  };

  const fetchProductBrand = async () => {
    const res = await axios.get("https://poskartik.onrender.com/api/getproduct");
    setProductBrand(res.data);
  };
  useEffect(() => {
    fetchProductBrand();
  }, []);

  const fetchvenderData = async () => {
    try {
      const res = await axios.get("https://poskartik.onrender.com/api/getVender");
      setVender(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchvenderData();
  }, []);

  const openDeletePopup = (id) => {
    setDeleteIndex(id);
    setDeletePopup(true);
  };

  const HandleDeleteVender = async (id) => {
    try {
      await axios.delete(`https://poskartik.onrender.com/api/deleteVender/${id}`);
      setDeletePopup(false);
      fetchvenderData();
    } catch (error) {
      console.log(error);
    }
  };

  const ToggleRow = (index) => {
    setExpendRow((prev) => (prev === index ? null : index));
  };
  const AddNewVender = () => {
    navigate("/vendors/addnewvender");
  };
  const handleEditVender = (id) => {
    const dataToEdit = vender.find((data) => data._id === id);
    navigate("/vendors/addnewvender", { state: { data: dataToEdit } });
  };

  const handleFiltersection = () => {
    setOpenFilter((prev) => !prev);
  };

  
  const handleExportToExcel = () => {
    if (!vender || vender.length === 0) {
      toast.error("No data available to export");
      return;
    }
    const formattedData = vender.map((item, index) => {
      const pocDetails =
        item.newRow
          ?.map(
            (poc, i) =>
              `POC-${i + 1}:${" "} Product Name:${
                poc.ProductName
              },${" "} SKU ID:${poc.SKUID},${" "} Category:${
                poc.Category
              },${" "} SubCategory:${poc.SubCategory}`
          )
          .join(" | ") || "N/A";

      return {
        "Sr no": index + 1,
        "Customer Name": item.vender,
        "RM Code": item.vendercode,
        "Customer Type": item.userName,
        "Concern Person": item.email,
        Location: item.phoneno,
        Email: item.address,
        "Phone No.": item.city,
        address1: item.state,
        address2: item.pincode,
        city: item.gstno,
        "POC Details": pocDetails,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendors");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Vendors.xlsx");
  };

  const filterProduct = vender.filter((sub) => {
    return (
      sub.vender.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.vendercode.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.userName.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.email.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.phoneno.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.city.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.state.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.pincode.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.gstno.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.newRow.some(
        (row) =>
          row.ProductName.toLowerCase().includes(
            inputValue.toLocaleLowerCase()
          ) ||
          row.SKUID.toLowerCase().includes(inputValue.toLocaleLowerCase()) ||
          row.Category.toLowerCase().includes(inputValue.toLocaleLowerCase()) ||
          row.SubCategory.toLowerCase().includes(inputValue.toLocaleLowerCase())
      )
    );
  });

  const totalPages = Math.ceil(vender.length / entryPerPage);
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
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col w-full min-w-0 bg-[#F3F7F9]">
        <Header name="Vendors" setInputValue={setInputValue} />
        <section className="m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0">
          <div className="text-base max-xl:text-sm font-medium flex items-center gap-3 justify-end">
            <button
              onClick={AddNewVender}
              className="px-4 max-2xl:px-3 max-2xl:py-1 cursor-pointer py-2 bg-[#0A6637] rounded-lg text-white flex items-center gap-3"
            >
              <i className="fa-solid fa-circle-plus"></i>Add New
            </button>
            <button
              onClick={handleFiltersection}
              className="px-4   transition-colors duration-300  hover:bg-[#0A6637] hover:text-white py-2 max-2xl:px-3 max-2xl:py-1 text-[#0A6637] cursor-pointer rounded-lg border flex items-center gap-3"
            >
              <i className="fa-solid fa-filter"></i>Filter
            </button>
            <button
              onClick={handleExportToExcel}
              className="px-4 hover:bg-[#0A6637] hover:text-white py-2 max-2xl:px-3 max-2xl:py-1 text-[#0A6637] cursor-pointer rounded-lg border flex items-center gap-3"
            >
              <i className="fa-solid fa-arrow-up-from-bracket"></i> Export
            </button>
          </div>
          {openFilter && (
            <div className="border mt-3 border-[#D8D8D8] rounded-xl p-3">
              <div className="flex justify-between">
                <h2 className="text-xl max-2xl:text-lg font-medium">Filter</h2>
                <i
                  onClick={() => setOpenFilter(false)}
                  className="fa-solid fa-xmark cursor-pointer"
                ></i>
              </div>

              <form onSubmit={hadleFilterFormSubmit} action="">
                <section className="bg-[#F6F6F6] p-3 mt-3 rounded-lg grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Vendor Name
                    </label>
                    <input
                      className="border w-full  px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1  rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      type="text"
                      name="vendorName"
                      placeholder="Enter Vendor Name"
                      value={venderName}
                      onChange={(e) => setVenderName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Pincode
                    </label>
                    <input
                      className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      type="text"
                      name="pincode"
                      placeholder="Enter Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Product Name
                    </label>
                    <select
                      name="productName"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      id="ProductName"
                    >
                      <option value="">-- Select Product Stock --</option>
                      {Array.isArray(productBrand) &&
                        productBrand.map((product) => (
                          <option value={product.brandName}>
                            {product.brandName}
                          </option>
                        ))}
                    </select>
                  </div>
                </section>

                <div className="flex justify-end items-center gap-3 mt-3">
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="px-4 py-1 max-2xl:px-3 max-2xl:py-1 text-base max-xl:text-sm font-medium text-[#505050] border cursor-pointer rounded-lg"
                  >
                    Clear All
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 bg-[#0A6637] max-2xl:px-3 max-2xl:py-1 text-base max-xl:text-sm font-medium text-white cursor-pointer rounded-lg"
                  >
                    Apply
                  </button>
                </div>
              </form>
            </div>
          )}
          {/* Table */}
          <section className="mt-3 overflow-x-auto">
            <table className="min-w-[100%] table-auto  border-separate border-spacing-0 rounded-t-xl shadow-sm ">
              <thead className="bg-[#F6F6F6] rounded-t-xl">
                <tr>
                  <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 rounded-tl-xl"></th>
                  <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 ">
                    #
                  </th>
                  <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                    Vendor Name
                  </th>
                  <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                    Vendor Code
                  </th>
                  <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                    Created By
                  </th>
                  <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                    Email
                  </th>
                  <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                    Phone No.
                  </th>
                  <th className="w-20 px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm  font-medium text-start border-b border-gray-300 rounded-tr-xl">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(currentData) && currentData.length > 0 ? (
                  currentData.map((data, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                            <i
                              onClick={() => ToggleRow(index)}
                              className={`fa-solid fa-chevron-right cursor-pointer text-[#9A9A9A] ${
                                expendRow === index ? "rotate-90" : ""
                              }`}
                            ></i>
                          </td>
                          <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                            {startIndex + index + 1}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            {data.vender}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            {data.vendercode}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            {data.userName}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            {data.email}
                          </td>
                          <td className="w-30 whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            {data.phoneno}
                          </td>
                          <td className="w-20 whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            <button
                              onClick={() => handleEditVender(data._id)}
                              className="mr-4 cursor-pointer"
                            >
                              <i className="fa-regular fa-pen-to-square text-[#9A9A9A]"></i>
                            </button>
                            <button
                              onClick={() => openDeletePopup(data._id)}
                              className="cursor-pointer "
                            >
                              <i className="fa-regular fa-trash-can text-[#9A9A9A] "></i>
                            </button>
                          </td>
                        </tr>

                        {expendRow === index && (
                          <tr>
                            <td colSpan="10" className="p-4 border-b">
                              <button
                                onClick={() => setActiveTable("address")}
                                className={`border px-4 py-1  text-xs cursor-pointer rounded-md mr-2 text-[#0A6637] font-medium ${
                                  activeTable === "address"
                                    ? "bg-[#0A6637] text-white"
                                    : "bg-[#ffffff]"
                                }`}
                              >
                                Address
                              </button>
                              <button
                                onClick={() => setActiveTable("poc")}
                                className={`border px-4 py-1 text-xs cursor-pointer rounded-md mr-2 text-[#0A6637] font-medium ${
                                  activeTable === "poc"
                                    ? "bg-[#0A6637] text-white"
                                    : "bg-[#ffffff]"
                                }`}
                              >
                                POC Details
                              </button>

                              {activeTable === "address" && (
                                <div className="mt-3 overflow-x-auto">
                                  <table className="min-w-[100%] table-auto  border-separate border-spacing-0 rounded-t-xl shadow-sm ">
                                    <thead className="bg-[#F6F6F6] rounded-t-xl">
                                      <tr>
                                        <th className="w-[500px] px-2 py-[0.40rem]  border-2 whitespace-nowrap  text-[#3A3A3A]  text-sm max-xl:text-xs font-medium text-center border-b-0 border-r-0 border-gray-200 rounded-tl-xl">
                                          Address
                                        </th>
                                        <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                          City
                                        </th>
                                        <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                          State
                                        </th>

                                        <th className=" px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                          Pincode
                                        </th>
                                        <th className=" px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-sm max-xl:text-xs font-medium text-center border-2 border-b-0  border-gray-200 rounded-tr-xl">
                                          GST No
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className=" border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200  ">
                                          {data.address}
                                        </td>
                                        <td className=" border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200  ">
                                          {data.city}
                                        </td>
                                        <td className=" border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200  ">
                                          {data.state}
                                        </td>
                                        <td className="border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200  ">
                                          {data.pincode}
                                        </td>
                                        <td className="border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal  text-center border-gray-200">
                                          {data.gstno}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              )}

                              {activeTable === "poc" && (
                                <div className="mt-3 overflow-x-auto">
                                  <table className="min-w-[100%] table-auto  border-separate border-spacing-0 rounded-t-xl shadow-sm ">
                                    <thead className="bg-[#F6F6F6] rounded-t-xl">
                                      <tr>
                                        <th className="w-10 px-2 py-[0.40rem]  border-2 whitespace-nowrap  text-[#3A3A3A]  text-sm max-xl:text-xs font-medium text-center border-b-0 border-r-0 border-gray-200 rounded-tl-xl">
                                          Sr. No.
                                        </th>
                                        <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                          Product Name
                                        </th>
                                        <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                          SKU ID
                                        </th>
                                        <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                          Category
                                        </th>
                                        <th className=" px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-sm max-xl:text-xs font-medium text-center border-2 border-b-0  border-gray-200 rounded-tr-xl">
                                          Sub Category
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {data.newRow && data.newRow.length > 0 ? (
                                        data.newRow.map((Rows, index) => (
                                          <tr key={index} className="border-b">
                                            <td className="border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200  ">
                                              {Rows.id}
                                            </td>
                                            <td className="border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200  ">
                                              {Rows.ProductName}
                                            </td>
                                            <td className="border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200 ">
                                              {Rows.SKUID}
                                            </td>
                                            <td className=" border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200 ">
                                              {Rows.Category}
                                            </td>
                                            <td className=" border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal  text-center border-gray-200">
                                              {Rows.SubCategory}
                                            </td>
                                          </tr>
                                        ))
                                      ) : (
                                        <>
                                          <tr>
                                            <td
                                              colSpan="10"
                                              className="text-center text-sm max-xl:text-xs text-[#5A607F] py-5 border   rounded-md"
                                            >
                                              <div className="flex flex-col items-center justify-center">
                                                {/* <img src={myImage} alt="Description" className="mb-2" /> */}
                                                <span>
                                                  No POC Details Available.
                                                </span>
                                              </div>
                                            </td>
                                          </tr>
                                        </>
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })
                ) : (
                  <>
                    <tr>
                      <td
                        colSpan="10"
                        className="text-center text-sm max-xl:text-xs text-[#5A607F] py-5 border   rounded-md"
                      >
                        <div className="flex flex-col items-center justify-center">
                          {/* <img src={myImage} alt="Description" className="mb-2" /> */}
                          <span>No Data Available.</span>
                        </div>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </section>
          <div className="mt-5 flex justify-between items-center">
            <div>
              <p className="text-sm max-xl:text-xs">
                show :{" "}
                <span className="border px-2 py-1 rounded-sm border-[#D8D8D8]">
                  10
                </span>
                <span className="text-[#9A9A9A]">
                  {" "}
                  / {vender.length} products
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
        </section>

        {deletePopup && (
          <div className="inset-0 fixed flex justify-center items-center bg-opacity-50 bg-[#2424242a]">
            <div className="bg-white shadow-sm rounded-md p-6 animate-[popupBounceIn_0.5s_cubic-bezier(0.68,-0.55,0.265,1.55)]">
              <h2 className="mb-4">
                Are you sure you want to delete this item?
              </h2>
              <div className="flex justify-stretch gap-4">
                <button
                  className="px-4 py-2 w-full bg-gray-300 rounded cursor-pointer"
                  onClick={() => setDeletePopup(false)}
                >
                  No
                </button>
                <button
                  className="px-4 py-2 w-full bg-[#0A6637] text-white rounded cursor-pointer"
                  onClick={() => HandleDeleteVender(deleteIndex)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Vendors;
