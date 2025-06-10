import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";
function ProductBrands() {
  const navigate = useNavigate();
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [branddata, setBranddata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  
  const handleAddNewProduct = () => {
    navigate("/brands/newbrand");
  };
  const fetchBrandData = async () => {
    try {
      const res = await axios.get("https://poskartik.onrender.com/api/getproductbrand");
      setBranddata(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBrandData();
  }, []);

  const EditProductBrands = (id) => {
    const dataToEdit = branddata.find((brand) => brand._id === id);
    navigate("/brands/newbrand", { state: { data: dataToEdit } });
  };

  const openDeletePopup = (id) => {
    setDeleteIndex(id);
    setDeletePopup(true);
  };

  const HandleDeletebrand = async (id) => {
    try {
      await axios.delete(`https://poskartik.onrender.com/api/deleteproductbrand/${id}`);
      toast.success("ProductBrand Delete Sucessfully...");
      setDeletePopup(false);
      fetchBrandData();
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleExportToExcel = () => {
    if (!branddata || branddata.length === 0) {
      toast.error("No data available to export");
      return;
    }
    const formattedData = branddata.map((item, index) => ({
      "Sr no": index + 1,
      "Brand Name": item.brandName,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Product Brand");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Product Brand.xlsx");
  };
 
  const filterData = branddata.filter((item)=>{
    return(
      item.brandName.toLowerCase().includes(inputValue.toLowerCase())
    )
  })

  const totalPages = Math.ceil(branddata.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedData = filterData.slice(startIndex, endIndex);

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
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex w-full min-w-0 flex-col bg-[#F3F7F9]">
        <Header name="Product Brands" setInputValue={setInputValue} />
        <section className="m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0">
          <div className="w-[50%] max-xl:w-[70%]">
            <div className="flex justify-end gap-5 text-base max-xl:text-sm">
              <button
                onClick={handleAddNewProduct}
                className="px-4 cursor-pointer py-2 max-2xl:px-3 max-2xl:py-1 bg-[#0A6637] rounded-lg text-white flex items-center gap-3"
              >
                <i className="fa-solid fa-circle-plus"></i>Add New
              </button>
              <button
                onClick={handleExportToExcel}
                className="px-4 transition-colors duration-300 py-2 text-[#0A6637] cursor-pointer hover:bg-[#0A6637] hover:text-white rounded-lg max-2xl:px-3 max-2xl:py-1 border flex items-center gap-3"
              >
                <i className="fa-solid fa-arrow-up-from-bracket"></i>Export
              </button>
            </div>
            <section className="mt-3 overflow-x-auto">
              <table className="min-w-[100%] table-auto border-separate border-spacing-0 rounded-t-xl shadow-sm">
                <thead className="bg-[#F6F6F6] rounded-t-xl">
                  <tr>
                    <th className="px-2 py-[0.40rem] whitespace-nowrap text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 rounded-tl-xl">
                      #
                    </th>
                    <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                      image
                    </th>
                    <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                      Name
                    </th>
                    <th className="w-20 px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm  font-medium text-start border-b border-gray-300 rounded-tr-xl">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                    paginatedData.map((data, index) => {
                      return (
                        
                          <tr key={index}>
                            <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                              {startIndex + index + 1}
                            </td>
                            <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                              <img
                                className="w-10 object-cover"
                                src={data.brandImage}
                                alt=""
                                
                              />
                            </td>
                            <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                              {data.brandName}
                            </td>
                            <td className="w-20 whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300 ">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  EditProductBrands(data._id);
                                }}
                                className="mr-4 cursor-pointer"
                              >
                                <i className="fa-regular fa-pen-to-square text-[#9A9A9A]"></i>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openDeletePopup(data._id);
                                }}
                                className="cursor-pointer"
                              >
                                <i className="fa-regular fa-trash-can text-[#9A9A9A]"></i>
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
              {deletePopup && (
                <div className="inset-0 fixed bg-[#2424242a] bg-opacity-50 flex justify-center items-center">
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
                        onClick={() => HandleDeletebrand(deleteIndex)}
                      >
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
                    / {branddata.length} products
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
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProductBrands;
