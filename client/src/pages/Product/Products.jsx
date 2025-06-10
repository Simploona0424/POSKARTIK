import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Products() {
  const [filterSection, setFilterSection] = useState(false);
  const [productData, setProductData] = useState([]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [skuid, setSkuid] = useState("");
  const [productName, setProductName] = useState("");
  const [selectcategorie, setSelectcategorie] = useState("");
  const [selectsubcategorie, setSelectsubcategorie] = useState("");
  const [selectproductbrand, setSelectproductbrand] = useState("");
  const [productbrand, setProductbrand] = useState("");
  const [categorie, setCategorie] = useState("");
  const [subcategorie, setSubcategorie] = useState("");
  const [openImportPopup, setOpenImportPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

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

  const handleFilterFormSubmit = (e) => {
    e.preventDefault();
    try {
      const filterresult = productData.filter((item) => {
        const matchproductName =
          !productName ||
          item.productName?.toLowerCase().includes(productName.toLowerCase());
        const matchselectcategorie =
          !categorie ||
          item.categorie?.toLowerCase().includes(categorie.toLowerCase());
        const matchselectsubcategorie =
          !subcategorie ||
          item.subcategorie?.toLowerCase().includes(subcategorie.toLowerCase());
        const matchselectproductbrand =
          !productbrand ||
          item.productbrand?.toLowerCase().includes(productbrand.toLowerCase());
        return (
          matchproductName &&
          matchselectcategorie &&
          matchselectsubcategorie &&
          matchselectproductbrand
        );
      });
      setProductData(filterresult);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async () => {
    const res = await axios.get("https://poskartik.onrender.com/api/getProduct");
    setProductData(res.data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const AddNewproduct = () => {
    navigate("/products/addnewproduct");
  };

  const handleProductView = () => {
    navigate("/products/productview");
  };

  const handleEdit = (id) => {
    const dataToEdit = productData.find((data) => data._id === id);
    navigate("/products/editproduct", { state: { data: dataToEdit } });
  };

  const openDeletePopup = (id) => {
    setDeleteIndex(id);
    setDeletePopup(true);
  };

  const HandleDeleteProduct = async (id) => {
    await axios.delete(`https://poskartik.onrender.com/api/deleteProduct/${id}`);
    toast.success("Product Delete Successfull...");
    setDeletePopup(false);
    fetchProduct();
  };

  const openFilterSection = () => {
    setIsActive((prev) => !prev);
    setFilterSection((prev) => !prev);
  };

  const handleExportToExcel = () => {
    if (!productData || productData.length === 0) {
      toast.error("No data available to export");
      return;
    }
    const formattedData = productData.map((item, index) => ({
      "Sr no": index + 1,
      Name: item.productName,
      "SKU ID": item.skuid,
      Category: item.categorie,
      "Sub Category": item.subcategorie,
      Brand: item.productbrand,
      productstock: item.productstock,
      sellingPrice: item.sellingPrice,
    }));
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Orders.xlsx");
  };

  const handleImportPopup = () => {
    setOpenImportPopup(true);
  };

  const handleFileChange = (e) => {
    const selectFile = e.target.files[0];
    if (selectFile) {
      setFile(selectFile);
    }
  };

  const handleImportSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a file to import");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      const formattedProducts = jsonData.map((row) => ({
        productName: row["Product Name"] || "",
        skuid: row["SKU ID"] || "",
        categorie: row["Category"] || "",
        subcategorie: row["Sub Category"] || "",
        productbrand: row["Brand Name"] || "",
        unit: row["Unit"] || "",
        productstock: row["Stock"] || 0,
        sellingPrice: row["Unit Price"] || 0,
      }));
      try {
        await axios.post(
          "https://poskartik.onrender.com/api/importProducts",
          formattedProducts
        );
        toast.success("Products imported successfully");
        setOpenImportPopup(false);
        fetchProduct();
        setFile(null);
      } catch (error) {
        console.error("Import error:", error);
        toast.error("Failed to import products");
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleImportSample = () => {
    const formattedData = [
      {
        "Sr no": 1,
        "Product Name": "mix chavanu",
        "SKU ID": 20,
        Category: "namkeen",
        "Sub Category": "tikkha mitha mix",
        "Brand Name": "Balaji",
        Unit: "sets",
        Stock: 100,
        "Unit Price": 250,
      },
    ];
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Product");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Product.xlsx");
  };
  

  const filterProduct = productData.filter((sub) => {
    return( 
      sub.productName.toLowerCase().includes(inputValue.toLowerCase())||
      sub.skuid.toLowerCase().includes(inputValue.toLowerCase())||
      sub.categorie.toLowerCase().includes(inputValue.toLowerCase())||
      sub.subcategorie.toLowerCase().includes(inputValue.toLowerCase())||
      sub.productbrand.toLowerCase().includes(inputValue.toLowerCase())||
      sub.sellingPrice.toLowerCase().includes(inputValue.toLowerCase())
  )
  });

  const totalPages = Math.ceil((productData.length || 0) / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const paginatedData = filterProduct.slice(startIndex, endIndex);

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

  const handleClearFilter = () => {
    setProductName("");
    setSkuid("");
    setCategorie("");
    setSubcategorie("");
    setProductbrand("");
  };  

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col w-full min-w-0 bg-[#F3F7F9]">
        <Header name="Products" setInputValue={setInputValue} />
        <section className="m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0">
          <div className="flex justify-end gap-4 max-2xl:gap-2 text-base max-xl:text-sm">
            <button
              onClick={AddNewproduct}
              className="px-4 max-2xl:px-3  cursor-pointer py-2 max-2xl:py-1  bg-[#0A6637] rounded-lg text-white flex items-center gap-3"
            >
              <i className="fa-solid fa-circle-plus"></i>Add New
            </button>
            <button
              onClick={openFilterSection}
              className={`focus:bg-[#0A6637] focus:text-white px-4 transition-colors duration-300 py-2 max-2xl:px-3 max-2xl:py-1  active:bg-[#0A6637] hover:bg-[#0A6637] hover:text-white text-[#505050] border-[#D8D8D8] cursor-pointer rounded-lg border flex items-center gap-3`}
            >
              <i className="fa-solid fa-filter"></i>Filters
            </button>
            <button
              onClick={handleImportPopup}
              className="px-4 transition-colors duration-300 py-2 max-2xl:px-3 max-2xl:py-1  active:text-[#0A6637] text-[#505050]  hover:bg-[#0A6637] hover:text-white border-[#D8D8D8] cursor-pointer rounded-lg border flex items-center gap-3"
            >
              <i className="fa-solid fa-file-import"></i>Import
            </button>
            <button
              onClick={handleExportToExcel}
              className="px-4  py-2 max-2xl:px-3 max-2xl:py-1 active:text-[#0A6637] text-[#505050] border-[#D8D8D8] hover:bg-[#0A6637] hover:text-white cursor-pointer rounded-lg border flex items-center gap-3 transition-colors duration-300"
            >
              <i className="fa-solid fa-arrow-up-from-bracket"></i>Export
            </button>
            <button className="px-4 py-2 max-2xl:px-3 transition-colors duration-300 max-2xl:py-1  active:text-[#0A6637] hover:bg-[#0A6637] hover:text-white text-[#505050]  border-[#D8D8D8] cursor-pointer rounded-lg border flex items-center gap-3">
              <i className="fa-solid fa-list"></i>
            </button>
            <button
              onClick={handleProductView}
              className="focus:bg-[#0A6637] focus:text-white active:bg-[#0A6637] px-4 transition-colors duration-300 py-2 max-2xl:px-3 max-2xl:py-1  hover:bg-[#0A6637] hover:text-white active:text-[#0A6637] text-[#505050] border-[#D8D8D8] cursor-pointer rounded-lg border flex items-center gap-3"
            >
              <i className="fa-solid fa-table-cells-large"></i>
            </button>
          </div>
          {openImportPopup && (
            <>
              <div className="fixed inset-0 flex justify-center items-center bg-[#2424242a] bg-opacity-45">
                <form
                  onSubmit={handleImportSubmit}
                  className="bg-white shadow-sm rounded-md p-6 w-[700px]"
                >
                  <div className="flex justify-between items-center border-b-2 border-[#D8D8D8]">
                    <h2 className="text-2xl max-xl:text-xl heading text-[#0A6637] font-semibold pb-3 ">
                      Import Products
                    </h2>
                    <i
                      onClick={() => {
                        setOpenImportPopup(false);
                      }}
                      className="cursor-pointer fa-solid fa-xmark text-2xl text-[#0A6637]"
                    ></i>
                  </div>
                  <div className="py-4">
                    <div className="w-full">
                      <div>
                        <p className="text-sm max-xl:text-xs mb-1">
                          Select a file to import products
                        </p>
                        <div className="flex items-center rounded-md border border-gray-300">
                          <input
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
                            Select a File
                          </label>
                          {file && file instanceof File && (
                            <p className="ml-2 text-sm text-gray-700">
                              {file.name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* buttons */}
                  <div className="pt-4 flex justify-end items-center gap-3">
                    <button
                      type="submit"
                      className="px-4 cursor-pointer py-2 max-2xl:px-3 font-medium max-2xl:py-1 rounded-lg text-white bg-[#0A6637] flex items-center gap-3"
                    >
                      Upload
                    </button>
                    <button
                      type="button"
                      onClick={handleImportSample}
                      className="px-4 cursor-pointer py-2 max-2xl:px-3 font-medium max-2xl:py-1 rounded-lg text-white bg-[#0A6637] flex items-center gap-3"
                    >
                      Download Sample
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
          {filterSection && (
            <form
              onSubmit={handleFilterFormSubmit}
              className="flex flex-col gap-5 mt-5 py-6 px-4 border border-gray-200 shadow rounded-xl"
            >
              <div className="flex justify-between">
                <h3 className="font-medium text-xl max-2xl:text-lg text-[#505050]">
                  Filter
                </h3>
                <i
                  onClick={() => setFilterSection(false)}
                  className="fa-solid fa-xmark text-xl cursor-pointer"
                ></i>
              </div>
              <div className="bg-[#F6F6F6] px-4 py-5 rounded-lg">
                <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-3">
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Product Name
                    </label>
                    <input
                      className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
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
                      className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      type="text"
                      name="SKUID"
                      placeholder="Enter SKU ID"
                      value={skuid}
                      onChange={(e) => setSkuid(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Product Brand
                    </label>
                    <select
                      className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      id="ProductBrand"
                      value={productbrand}
                      onChange={(e) => setProductbrand(e.target.value)}
                    >
                      <option value="">-- Select Product Brand --</option>
                      {selectproductbrand.map((categorie) => (
                        <option key={categorie} value={categorie}>
                          {categorie}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Product Category
                    </label>
                    <select
                      className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      id="ProductCategory"
                      value={categorie}
                      onChange={(e) => setCategorie(e.target.value)}
                    >
                      <option value="">-- Select Category --</option>
                      {selectcategorie.map((categorie) => (
                        <option key={categorie} value={categorie}>
                          {categorie}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Product Sub Category
                    </label>
                    <select
                      className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      id="ProductSubCategory"
                      value={subcategorie}
                      onChange={(e) => setSubcategorie(e.target.value)}
                    >
                      <option value="">-- Select Sub Category --</option>
                      {selectsubcategorie.map((categorie) => (
                        <option key={categorie} value={categorie}>
                          {categorie}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                      Product Stock
                    </label>
                    <select
                      className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                      id="ProductStock"
                    >
                      <option value="">-- Select Product Stock --</option>
                      <option value="individual">Individual</option>
                      <option value="company">Company</option>
                      <option value="government">Government</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center gap-3">
                <button
                  onClick={handleClearFilter}
                  className="px-4 py-1 max-2xl:px-3 max-2xl:py-1  text-base max-xl:text-sm font-medium text-[#505050] border cursor-pointer rounded-lg"
                >
                  Clear All
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 max-2xl:px-3 max-2xl:py-1  bg-[#0A6637] text-base max-xl:text-sm font-medium text-white cursor-pointer rounded-lg"
                >
                  Apply
                </button>
              </div>
            </form>
          )}
          <section className="overflow-x-auto mt-3">
            <table className=" min-w-[100%] table-auto  border-separate border-spacing-0 rounded-t-xl shadow-sm ">
              <thead className="bg-[#F6F6F6] rounded-t-xl">
                <tr>
                  <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 rounded-tl-xl">
                    #
                  </th>
                  <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                    Image
                  </th>
                  <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                    Name
                  </th>
                  <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                    SKU ID
                  </th>
                  <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                    Category
                  </th>
                  <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                    Sub Category
                  </th>
                  <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                    Brand
                  </th>
                  <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                    Unit
                  </th>
                  <th className="px-2 py-[0.40rem] w-18 whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                    Stock
                  </th>
                  <th className="px-2 py-[0.40rem] w-30 whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300">
                    Unit Price
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
                            className="w-10 h-10 object-contain bg-white"
                            src={data.productImage}
                            alt=""
                          />
                        </td>
                        <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                          {data.productName}
                        </td>
                        <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                          {data.skuid}
                        </td>
                        <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                          {data.categorie}
                        </td>
                        <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                          {data.subcategorie}
                        </td>
                        <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                          {data.productbrand}
                        </td>
                        <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                          Sets
                        </td>
                        <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                          {data.productstock}
                        </td>
                        <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                          $ {data.sellingPrice}
                        </td>
                        <td className=" whitespace-nowrap px-2 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">
                          <button className="mr-4">
                            <i
                              onClick={() => handleEdit(data._id)}
                              className="fa-regular fa-pen-to-square text-[#9A9A9A] cursor-pointer"
                            ></i>
                          </button>
                          <button
                            onClick={() => openDeletePopup(data._id)}
                            className=""
                          >
                            <i className="fa-regular fa-trash-can text-[#9A9A9A] cursor-pointer"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <></>
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
                  / {productData.length} products
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
              <div className="border px-3  py-1 max-xl:py-[1px] rounded-lg border-[#D8D8D8]">
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
          <>
            <div className="fixed inset-0 bg-[#2424242a] bg-opacity-50 flex justify-center items-center">
              <div className="bg-white shadow-sm rounded-md p-6 animate-[popupBounceIn_0.5s_cubic-bezier(0.68,-0.55,0.265,1.55)]">
                <h2 className="mb-4">
                  Are you sure you want to delete this item?
                </h2>
                <div className="flex  justify-stretch gap-4">
                  <button
                    className="px-4 py-2 w-full bg-gray-300 rounded cursor-pointer"
                    onClick={() => setDeletePopup(false)}
                  >
                    No
                  </button>
                  <button
                    className="px-4 py-2 w-full bg-[#0A6637] text-white rounded cursor-pointer"
                    onClick={() => HandleDeleteProduct(deleteIndex)}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Products;
