import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
function Customers() {
  const [expendRow, setExpendRow] = useState(false);
  const [activeTable, setActiveTable] = useState("address");
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showDeletePopUP, setShowDeletePopUP] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const fetchcustomers = async () => {
    try {
      const res = await axios.get("https://poskartik.onrender.com/api/getcustomer");
      setCustomerData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchcustomers();
  }, []);

  const navigate = useNavigate();

  const AddNewCustomers = () => {
    navigate("/customers/Addnewcustomer");
  };

  const ToggleRow = (index) => {
    setExpendRow((prev) => (prev === index ? null : index));
  };
  const EditCustomer = (id) => {
    const dataToEdit = customerData.find((invoice) => invoice._id === id);
    if (!dataToEdit) {
      console.error("Invoice not found!");
      return;
    }
    navigate("/customers/editcustomer", { state: { data: dataToEdit } });
  };
  const handleDeletePopup = async (id) => {
    setDeleteIndex(id);
    setShowDeletePopUP(true);
  };
  const HandleDeleteCustomers = async (id) => {
    try {
      await axios.delete(`https://poskartik.onrender.com/api/deletecustomer/${id}`);
      toast.success("Customer Delete Successfull...");
      setShowDeletePopUP(false);
      fetchcustomers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleExportToExcel = () => {
    if (!customerData || customerData.length === 0) {
      toast.error("No data available to export");
      return;
    }

    const formattedData = customerData.map((item, index) => {
      const pocDetails =
        item.newRows
          ?.map(
            (poc, i) =>
              `POC-${i + 1}:${" "} Full Name:${poc.fullName},${" "} Email Id:${
                poc.emailId
              },${" "} Phone No:${poc.phoneNo}`
          )
          .join(" | ") || "N/A";

      return {
        "Sr no": index + 1,
        "Customer Name": item.companyName,
        "RM Code": item.rMcode,
        "Customer Type": item.customerType,
        "Concern Person": item.concernPerson,
        Location: item.location,
        Email: item.emailID,
        "Phone No.": item.phoneNO,
        address1: item.address1,
        address2: item.address2,
        city: item.city,
        State: item.state,
        Pincode: item.pincode,
        "GST No": item.gstno,
        "POC Details": pocDetails,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "customers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "customers.xlsx");
  };

  const filterProdutcs = customerData.filter((item) => {
    return (
      item.companyName.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.rMcode.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.customerType.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.concernPerson.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.location.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.emailID.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.phoneNO.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.address1.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.city.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.state.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.pincode.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.gstno.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.newRows.some(
        (poc) =>
          poc.fullName.toLowerCase().includes(inputValue.toLowerCase()) ||
          poc.emailId.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  });

  const totalPages = Math.ceil(customerData.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedCustomerData = filterProdutcs.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage < 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col w-full min-w-0 bg-[#F3F7F9]">
        <Header name="Customers" setInputValue={setInputValue} />
        <section className="m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0 ">
          <div className="text-base max-xl:text-sm font-medium flex items-center gap-3 justify-end">
            <button
              onClick={AddNewCustomers}
              className="px-4 cursor-pointer py-2 max-2xl:px-3 max-2xl:py-1 bg-[#0A6637] rounded-lg text-white flex items-center gap-3"
            >
              <i className="fa-solid fa-circle-plus"></i>Add New
            </button>
            <button
              onClick={handleExportToExcel}
              className="px-4 transition-colors duration-300 py-2 text-[#0A6637] max-2xl:px-3 max-2xl:py-1 cursor-pointer rounded-lg border hover:bg-[#0A6637] hover:text-white flex items-center gap-3"
            >
              <i className="fa-solid fa-arrow-up-from-bracket"></i> Export
            </button>
          </div>
          {/* Table */}
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-[100%] table-auto  border-separate border-spacing-0 rounded-t-xl shadow-sm ">
              <thead className="bg-[#F6F6F6] rounded-t-xl">
                <tr>
                  <th className="px-2 py-[0.40rem] text-[#3A3A3A] whitespace-nowrap  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 rounded-tl-xl"></th>
                  <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 ">
                    #
                  </th>
                  <th className="w-96 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                    Customer Name
                  </th>
                  <th className=" px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                  Employee ID
                  </th>
                  <th className=" px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                    Customer Type
                  </th>
                  <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                    Concern Person
                  </th>
                  <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                    Location
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
                {Array.isArray(paginatedCustomerData) &&
                paginatedCustomerData.length > 0 ? (
                  paginatedCustomerData.map((data, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td className=" whitespace-nowrap px-2 text-[#202020] py-[0.40rem] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                            <i
                              onClick={() => ToggleRow(index)}
                              className={`fa-solid fa-chevron-right cursor-pointer text-[#9A9A9A] ${
                                expendRow === index ? "rotate-90" : ""
                              }`}
                            ></i>
                          </td>
                          <td className=" whitespace-nowrap px-2 text-[#202020] py-[0.40rem] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                            {startIndex + index + 1}
                          </td>
                          <td className=" whitespace-nowrap px-2 text-[#202020] py-[0.40rem] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            {data.companyName}
                          </td>
                          <td className=" whitespace-nowrap px-2 text-[#202020] py-[0.40rem] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            {data.rMcode}
                          </td>
                          <td className=" whitespace-nowrap px-2 text-[#202020] py-[0.40rem] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            {data.customerType}
                          </td>
                          <td className=" whitespace-nowrap px-2 text-[#202020] py-[0.40rem] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            {!data.concernPerson ? "-" : data.concernPerson}
                          </td>
                          <td className=" whitespace-nowrap px-2 text-[#202020] py-[0.40rem] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            {data.location}
                          </td>
                          <td className=" whitespace-nowrap px-2 text-[#202020] py-[0.40rem] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            {data.emailID}
                          </td>
                          <td className="w-30 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            {data.phoneNO}
                          </td>
                          <td className="w-20 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                EditCustomer(data._id);
                              }}
                              className="mr-4 cursor-pointer"
                            >
                              <i className="fa-regular fa-pen-to-square text-[#9A9A9A]"></i>
                            </button>
                            <button className="cursor-pointer">
                              <i
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeletePopup(data._id);
                                }}
                                className="fa-regular fa-trash-can text-[#9A9A9A] cursor-pointer"
                              ></i>
                            </button>
                          </td>
                        </tr>
                        {showDeletePopUP && (
                          <>
                            <div className="fixed inset-0 bg-[#2424242a] bg-opacity-50 flex justify-center items-center">
                              <div className="bg-white shadow-sm rounded-md p-6 animate-[popupBounceIn_0.5s_cubic-bezier(0.68,-0.55,0.265,1.55)]">
                                <h2 className="mb-4">
                                  Are you sure you want to delete this item?
                                </h2>
                                <div className="flex  justify-stretch gap-4">
                                  <button
                                    className="px-4 py-2 w-full bg-gray-300 rounded cursor-pointer"
                                    onClick={() => setShowDeletePopUP(false)}
                                  >
                                    No
                                  </button>
                                  <button
                                    className="px-4 py-2 w-full bg-[#0A6637] text-white rounded cursor-pointer"
                                    onClick={() =>
                                      HandleDeleteCustomers(deleteIndex)
                                    }
                                  >
                                    Yes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                        {expendRow === index && (
                          <tr>
                            <td colSpan="10" className="p-4 border-b">
                              <button
                                onClick={() => setActiveTable("address")}
                                className={`border px-4 py-1  max-xl:text-xs text-sm cursor-pointer rounded-md mr-2 text-[#0A6637] font-medium ${
                                  activeTable === "address"
                                    ? "bg-[#0A6637] text-white"
                                    : "bg-[#ffffff]"
                                }`}
                              >
                                Address
                              </button>
                              <button
                                onClick={() => setActiveTable("poc")}
                                className={`border px-4 py-1 max-xl:text-xs text-sm cursor-pointer rounded-md mr-2 text-[#0A6637] font-medium ${
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
                                    <thead className="bg-[#F6F6F6] rounded-t-xl border">
                                      <tr>
                                        <th className="w-[500px] px-2 py-[0.40rem]  border-2 whitespace-nowrap  text-[#3A3A3A]  text-sm max-xl:text-xs font-medium text-center border-b-0 border-r-0 border-gray-200 rounded-tl-xl">
                                          Address
                                        </th>
                                        <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200 ">
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
                                        <td className="border-2 text-[#202020]  whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0  text-center border-gray-200 ">
                                          {data.address1} {data.address2}
                                        </td>
                                        <td className="border-2 text-[#202020]  whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200 ">
                                          {data.city}
                                        </td>
                                        <td className="border-2 text-[#202020]  whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200 ">
                                          {data.state}
                                        </td>
                                        <td className="border-2 text-[#202020]  whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200 ">
                                          {data.pincode}
                                        </td>
                                        <td className="border-2 text-[#202020]  whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal  text-center border-gray-200 ">
                                          {!data.gstno ? "-" : data.gstno}
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
                                        <th className="w-10  px-2 py-[0.40rem]  border-2 whitespace-nowrap  text-[#3A3A3A]  text-sm max-xl:text-xs font-medium text-center border-b-0 border-r-0 border-gray-200 rounded-tl-xl">
                                          Sr. No.
                                        </th>
                                        <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200 ">
                                          Full Name
                                        </th>
                                        <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                          Email Id
                                        </th>
                                        <th className=" px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-sm max-xl:text-xs font-medium text-center border-2 border-b-0  border-gray-200 rounded-tr-xl">
                                          Phone No.
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {data.newRows &&
                                      data.newRows.length > 0 ? (
                                        data.newRows.map((Rows, index) => (
                                          <tr key={index} className="border-b">
                                            <td className=" border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200 ">
                                              {Rows.id}
                                            </td>
                                            <td className="border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200 ">
                                              {Rows.fullName}
                                            </td>
                                            <td className="border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200 ">
                                              {Rows.emailId}
                                            </td>
                                            <td className="border-2 whitespace-nowrap text-[#202020] px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal  text-center border-gray-200">
                                              {Rows.phoneNo}
                                            </td>
                                          </tr>
                                        ))
                                      ) : (
                                        <>
                                          <tr>
                                            <td
                                              colSpan="10"
                                              className="text-center text-sm text-[#5A607F] py-5  border-gray-200 border-2 rounded-md"
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
                        className="text-center text-sm text-[#5A607F] py-5 border rounded-md"
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
                  / {customerData.length} products
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
      </main>
    </div>
  );
}

export default Customers;
