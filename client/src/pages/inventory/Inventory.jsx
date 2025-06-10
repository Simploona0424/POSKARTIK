import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
function Inventory() {
  const [expendRowBig, setExpendRowBig] = useState(false);
  const [expandRowSmall, setExpandRowSmall] = useState(false);
  const [openfilter, setOpenfilter] = useState(false);
  const [location, setLocation] = useState("");
  const [productName, setProductName] = useState("");
  const [skuid, setSkuid] = useState("");
  const [productData, setProductData] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [subcategorie, setSubcategorie] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [entryPerPage, setEntryPerPage] = useState(10);
  const [inputValue, setInputValue] = useState("");
  const [selectLocation, setSelectLocation] = useState([])

  const fetchNewLocation = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getlocation");
      setSelectLocation(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNewLocation();
  }, []);

  const hadlecategorieFilter = (data) => {
    if (!data) return;
    const InventoryFilter = productData.filter((item) => {
      const matchesCategorie = item.categorie
        ?.toLowerCase()
        .includes(data.toLowerCase());
      const matchesSubCategorie = item.subcategorie
        ?.toLowerCase()
        .includes(data.toLowerCase());
      return matchesCategorie || matchesSubCategorie;
    });
    setProductData(InventoryFilter);
  };

  const hsndleFilterForm = (e) => {
    e.preventDefault();
    const filterResult = productData?.filter((item) => {
      // const matchVendorName = !location || item.vender?.toLowerCase().includes(location.toLowerCase());
      const matchPincode =
        !productName ||
        item.productName?.toLowerCase().includes(productName.toLowerCase());
      const matchSkuid =
        !skuid || item.skuid?.toLowerCase().includes(skuid.toLowerCase());
      return matchPincode && matchSkuid;
    });
    setProductData(filterResult);
  };

  const handleClearAll = () => {
    setLocation("");
    setProductName("");
    setSkuid("");
  };

  const fetchProduct = async () => {
    const res = await axios.get("http://localhost:3000/api/getProduct");
    setProductData(res.data);
  };

  const fetchCategorie = async () => {
    const res = await axios.get("http://localhost:3000/api/getcategorie");
    setCategorie(res.data);
  };

  const fetchSubCategorie = async () => {
    const res = await axios.get("http://localhost:3000/api/getSubCategorie");
    setSubcategorie(res.data);
  };

  useEffect(() => {
    fetchCategorie();
    fetchSubCategorie();
    fetchProduct();
  }, []);

  const handleSmallExpendedRow = (index) => {
    setExpandRowSmall((prev) => (prev === index ? null : index));
  };
  const handleBigExpendedRow = (index) => {
    setExpendRowBig((prev) => (prev === index ? null : index));
  };
  const OpenFilterSection = () => {
    setOpenfilter((prev) => !prev);
  };


  const handleExportToExcel = () => {
    if (!productData || productData.length === 0) {
      toast.error("No data available to export");
      return;
    }
    const formattedData = productData.map((item, index) => ({
      "Sr no": index + 1,
      "Product Name": item.productName,
      "SKU ID": item.skuid,
      Category: item.categorie,
      "Sub Category": item.subcategorie,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Inventory.xlsx");
  };

  const filterProduct = productData.filter((sub) => {
    return (
      sub.productName.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.skuid.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.categorie.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.subcategorie.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.productbrand.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.sellingPrice.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  const totalpages = Math.ceil(productData.length / entryPerPage);
  const startindex = (currentpage - 1) * entryPerPage;
  const lastindex = startindex + entryPerPage;
  const paginateddata = filterProduct.slice(startindex, lastindex);

  const handlenext = () => {
    if (currentpage < totalpages) {
      setCurrentpage((prev) => prev + 1);
    }
  };

  const handleprev = () => {
    if (currentpage > 1) {
      setCurrentpage((prev) => prev - 1);
    }
  };

  const totalPages = Math.ceil(categorie.length / entryPerPage);
  const startIndex = (currentPage - 1) * entryPerPage;
  const lastIndex = startIndex + entryPerPage;
  const paginatedData = categorie.slice(startIndex, lastIndex);

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
      <main className="flex-1 flex-col w-full min-w-0 flex bg-[#F3F7F9]">
        <Header name="Inventory" setInputValue={setInputValue} />
        <section className="m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0">
          <div className="flex justify-end gap-3 max-2xl:gap-2">
            <select
              className="border px-3 w-60 py-[0.25rem] max-2xl:px-3 max-2xl:py-1 text-sm max-xl:text-xs font-normal text-[#505050] bg-white   rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
              id="SelectCustomer"
            >
              <option value="">Select Pantry Location</option>
              {Array.isArray(selectLocation) && selectLocation.map((loc, index) => (
                <option key={index} value={loc.city}>{loc.city}</option>
              ))}
            </select>
            <select
              className="border w-30 max-2xl:px-3 max-2xl:py-1 px-4 py-2 text-sm max-xl:text-xs font-normal text-[#505050] bg-white  rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
              id="SelectCustomer"
            >
              <option className="" value="Weekly">
                Weekly
              </option>
              <option value="company">Company</option>
              <option value="government">Government</option>
            </select>
            <button
              onClick={OpenFilterSection}
              className="px-4 py-2   transition-colors duration-300  hover:bg-[#0A6637] hover:text-white max-2xl:px-3 text-base max-2xl:text-sm max-2xl:py-1 text-[#505050] cursor-pointer rounded-lg border flex items-center gap-3"
            >
              <i className="fa-solid fa-filter"></i>Filters
            </button>
            <button
              onClick={handleExportToExcel}
              className="px-4 hover:bg-[#0A6637] transition-colors duration-300 hover:text-white py-2 text-[#505050] max-2xl:px-3 text-base max-2xl:text-sm max-2xl:py-1 cursor-pointer rounded-lg border flex items-center gap-3"
            >
              <i className="fa-solid fa-arrow-up-from-bracket"></i>Export
            </button>
            <button
              onClick={() => fetchProduct()}
              className="px-4 py-2   transition-colors duration-300  hover:bg-[#0A6637] hover:text-white text-[#505050] max-2xl:px-3 text-base max-2xl:text-sm max-2xl:py-1 cursor-pointer rounded-lg border flex items-center gap-3"
            >
              <i className="fa-solid fa-arrows-rotate"></i>
            </button>
          </div>

          {openfilter && (
            <>
              <div className="border mt-3 border-[#D8D8D8] rounded-xl p-3">
                <div className="flex justify-between">
                  <h2 className="text-xl max-2xl:text-lg font-medium">
                    Filter
                  </h2>
                  <i
                    onClick={() => setOpenfilter(false)}
                    className="fa-solid fa-xmark cursor-pointer"
                  ></i>
                </div>

                <form onSubmit={hsndleFilterForm} action="">
                  <section className="bg-[#F6F6F6] p-3 mt-3 rounded-lg grid grid-cols-3 max-xl:grid-cols-3 gap-3">
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Location
                      </label>
                      <input
                        className="border w-full  px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1  rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="Location"
                        placeholder="Enter Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        Product Name
                      </label>
                      <input
                        className="border w-full  px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1  rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="ProductName"
                        placeholder="Enter Product Name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        SKU ID
                      </label>
                      <input
                        className="border w-full  px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1  rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="text"
                        name="SKUID"
                        placeholder="Enter SKU ID"
                        value={skuid}
                        onChange={(e) => setSkuid(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        From Date
                      </label>
                      <input
                        className="border w-full  px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1  rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="date"
                        name="FromDate"
                        placeholder="Enter From Date"
                      // value={city}
                      // onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                        To Date
                      </label>
                      <input
                        className="border w-full  px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1  rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                        type="date"
                        name="ToDate"
                        placeholder="Enter To Date"
                      // value={city}
                      // onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </section>

                  <div className="flex justify-end items-center gap-3 mt-3">
                    <button
                      onClick={handleClearAll}
                      className="px-4 py-2 max-2xl:px-3 max-2xl:py-1 text-base max-xl:text-sm font-medium text-[#505050] border cursor-pointer rounded-lg"
                    >
                      Clear All
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#0A6637] max-2xl:px-3 max-2xl:py-1 text-base max-xl:text-sm font-medium text-white cursor-pointer rounded-lg"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
          {/* table one */}
          <section className="grid grid-cols-3 mt-3 gap-3">
            <div className="col-span-2">
              <div className="  table-scroll-wrapper overflow-x-scroll rounded-t-xl">
                <table className="min-w-[100%] border-separate border-spacing-0 rounded-t-xl shadow-sm table-auto">
                  <thead className="rounded-t-xl bg-[#F6F6F6]">
                    <tr>
                      <th className="w-20 px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 rounded-tl-xl"></th>
                      <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                        #
                      </th>
                      <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                        Name
                      </th>
                      <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                        SKU ID
                      </th>
                      <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                        Category
                      </th>
                      <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                        Sub Category
                      </th>
                      <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                        Ordered
                      </th>
                      <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                        Sold
                      </th>
                      <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                        Available
                      </th>
                      <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                        In
                      </th>
                      <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                        Out
                      </th>
                      <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                        Balance
                      </th>
                      <th className="w-30 px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300">
                        Last In
                      </th>
                      <th className="w-20 px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm  font-medium text-start border-b border-gray-300 rounded-tr-xl">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(paginateddata) && paginateddata.length > 0 ? (
                      paginateddata.map((product, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <td className="w-20 whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                                <i
                                  onClick={() => {
                                    handleBigExpendedRow(index);
                                  }}
                                  className={`fa-solid fa-chevron-right cursor-pointer ${expendRowBig === index ? "rotate-90" : ""
                                    } text-[#9A9A9A] `}
                                ></i>
                              </td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                                {index + 1}
                              </td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                                {product.productName}
                              </td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                                {product.skuid}
                              </td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                                {product.categorie}
                              </td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                                {product.subcategorie}
                              </td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"></td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"></td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"></td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"></td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"></td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"></td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"></td>
                              <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                                <button className="mr-4">
                                  <i className="fa-regular fa-pen-to-square text-[#9A9A9A]"></i>
                                </button>
                                <button>
                                  <i className="fa-regular fa-trash-can text-[#9A9A9A] cursor-pointer"></i>
                                </button>
                              </td>
                            </tr>

                            {expendRowBig === index && (
                              <tr>
                                <td colSpan="10" className="p-4">
                                  ff
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
                            colSpan="16"
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
                      / {productData.length} products
                    </span>
                  </p>
                </div>

                <div className="text-sm max-xl:text-xs">
                  <span className=" font-medium">Page </span>
                  <select
                    className="px-2 py-1 border rounded-md focus:outline-none border-[#D8D8D8]"
                    value={currentpage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                  >
                    {Array.from({ length: totalpages }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="border px-3 py-1 max-xl:py-[1px] rounded-lg border-[#D8D8D8]">
                    <i
                      disabled={currentpage === 1}
                      onClick={handleprev}
                      className={`fa-solid fa-chevron-left pr-3 cursor-pointer ${currentpage === 1 ? "text-[#D8D8D8]" : "text-[#202020]"
                        }`}
                    ></i>
                    <span className="border border-[#D8D8D8]"></span>
                    <i
                      disabled={currentpage === totalpages}
                      onClick={handlenext}
                      className={`fa-solid fa-chevron-right pl-3 cursor-pointer ${currentpage === totalpages
                        ? "text-[#D8D8D8]"
                        : "text-[#202020]"
                        }`}
                    ></i>
                  </div>
                </div>
              </div>
            </div>

            {/* table-two */}
            <div>
              <table className="min-w-[100%] table-auto border-separate border-spacing-0 rounded-t-xl shadow-sm">
                <thead className="bg-[#F6F6F6] rounded-t-xl">
                  <tr>
                    <th className="w-10 px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A] text-base max-xl:text-sm font-medium text-start border-b border-gray-300 rounded-tl-xl"></th>
                    <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 ">
                      #
                    </th>
                    <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                      Category
                    </th>
                    <th className="w-20 px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm  font-medium text-start border-b border-gray-300 rounded-tr-xl">
                      Total Stock
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                    paginatedData.map((data, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                              <i
                                onClick={() => {
                                  handleSmallExpendedRow(index);
                                }}
                                className={`fa-solid fa-chevron-right cursor-pointer ${expandRowSmall === index ? "rotate-90" : ""
                                  } text-[#9A9A9A] `}
                              ></i>
                            </td>
                            <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                              {startIndex + index + 1}
                            </td>
                            <td
                              onClick={() => {
                                hadlecategorieFilter(data.categorieName);
                              }}
                              className=" whitespace-nowrap cursor-pointer px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"
                            >
                              {data.categorieName}
                            </td>
                            <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                              30
                            </td>
                          </tr>
                          {expandRowSmall === index && (
                            <tr className="mt-2">
                              <td colSpan="10" className="p-2 border-b">
                                <table className="min-w-[100%] table-auto border-separate border-spacing-0 rounded-t-xl shadow-sm ">
                                  <thead className="bg-[#F6F6F6] rounded-t-xl">
                                    <tr>
                                      <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 rounded-tl-xl">
                                        #
                                      </th>
                                      <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A] text-base max-xl:text-sm font-medium text-start border-b border-gray-300 ">
                                        Sub Category
                                      </th>
                                      <th className="w-20 px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm  font-medium text-start border-b border-gray-300 rounded-tr-xl">
                                        Total Stock
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {subcategorie
                                      .filter(
                                        (sub) =>
                                          sub.selectCategory ===
                                          data.categorieName
                                      )
                                      .map((sub, index) => (
                                        <tr key={index}>
                                          <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                                            {index + 1}
                                          </td>
                                          <td
                                            onClick={() => {
                                              hadlecategorieFilter(
                                                sub.subCategory
                                              );
                                            }}
                                            className=" whitespace-nowrap cursor-pointer px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 "
                                          >
                                            {sub.subCategory}
                                          </td>
                                          <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                                            6
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>

              <div className="mt-5 flex justify-between items-center">
                <div>
                  <p className="text-sm max-xl:text-xs">
                    show :{" "}
                    <span className="border px-2 max-xl:px-1 py-1 max-xl:py-0 rounded-sm border-[#D8D8D8]">
                      10
                    </span>
                    <span className="text-[#9A9A9A]">
                      {" "}
                      / {paginatedData.length} products
                    </span>
                  </p>
                </div>

                <div className="text-sm max-xl:text-xs">
                  <span className=" font-medium">Page </span>
                  <select
                    className="px-2 max-xl:px-1 py-1 max-xl:py-0 border rounded-md focus:outline-none border-[#D8D8D8]"
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
                  <div className="border px-3 max-xl:px-1 py-1 max-xl:py-0 rounded-lg border-[#D8D8D8]">
                    <i
                      disabled={currentPage === 1}
                      onClick={handlePrev}
                      className={`fa-solid fa-chevron-left max-xl:text-xs pr-3 max-xl:pr-1 cursor-pointer ${currentPage === 1 ? "text-[#D8D8D8]" : "text-[#202020]"
                        }`}
                    ></i>
                    <span className="border border-[#D8D8D8]"></span>
                    <i
                      disabled={currentPage === totalPages}
                      onClick={handleNext}
                      className={`fa-solid fa-chevron-right pl-3 max-xl:text-xs max-xl:pl-1 cursor-pointer ${currentPage === totalPages
                        ? "text-[#D8D8D8]"
                        : "text-[#202020]"
                        }`}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Inventory;
