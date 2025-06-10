import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
function ProductView() {
    const navigate = useNavigate()
    const [openEdit, setOpenEdit] = useState(false)
    const [productDataView, setProductDataView] = useState()
    const [editProductData, setEditProductData] = useState(null);
    const [productName, setProductName] = useState("")
    const [skuid, setSkuid] = useState("")
    // const [productunit, setProductunit] = useState("")
    const [productstock, setProductstock] = useState("")
    const [minstock, setMinstock] = useState("")
    const [sellingPrice, setSellingPrice] = useState("")
    const [categorie, setCategorie] = useState("")
    const [subcategorie, setSubcategorie] = useState("")
    const [productbrand, setProductbrand] = useState("")
    const [productImage, setProductImage] = useState(null)
    const [selectcategorie, setSelectcategorie] = useState([])
    const [selectsubcategorie, setSelectsubcategorie] = useState([])
    const [selectproductbrand, setSelectproductbrand] = useState([])
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const getcategorie = await axios.get("http://localhost:3000/api/getcategorie");
                const getsubcategorie = await axios.get("http://localhost:3000/api/getSubCategorie");
                const getproductbrand = await axios.get("http://localhost:3000/api/getproductbrand");
                setSelectcategorie(getcategorie.data.map(item => item.CategorieName));
                setSelectsubcategorie(getsubcategorie.data.map(item => item.subCategory));
                setSelectproductbrand(getproductbrand.data.map(item => item.brandName));

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleFileChange = (e) => {
        const selectfile = e.target.files[0];
        if (selectfile) {
            setProductImage(selectfile)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("productName", productName)
        formData.append("skuid", skuid)
        formData.append("productstock", productstock)
        formData.append("minstock", minstock)
        formData.append("sellingPrice", sellingPrice)
        formData.append("categorie", categorie)
        formData.append("subcategorie", subcategorie)
        formData.append("productbrand", productbrand)
        formData.append("productImage", productImage)
        try {
            await axios.put(`http://localhost:3000/api/updateProduct/${editProductData._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Product Update Successfull...")
            navigate("/products")
        } catch (error) {
            console.log(error)
        }
    }


    const fetchProduct = async () => {
        const res = await axios.get("http://localhost:3000/api/getProduct")
        setProductDataView(res.data)
    }
    useEffect(() => {
        fetchProduct()
    }, [])

    const AddNewproduct = () => {
        navigate("/products/addnewproduct")
    }

    const handleProductView = () => {
        navigate("/products/productview")
    }

    const handleProductViewEdit = (id) => {
        setOpenEdit(true)
        setSelectedProductId(id)
        const dataToEdit = productDataView.find((data) => data._id === id)
        setEditProductData(dataToEdit)
    }
    const openDeletePopup = (id) => {
        setDeletePopup(true)
        setDeleteIndex(id)
    }

    const HandleDeleteProduct = async (id) => {
        await axios.delete(`http://localhost:3000/api/deleteProduct/${id}`);
        toast.success("Product Delete Succesfull...")
        setDeletePopup(false)
        fetchProduct()
    }

    const backgroundColors = [
        "#FFF7E6", "#F4F9FC", "#FDEEE8",
        "#F7F5FF", "#E7F6E8", "#FDEFFF"
    ];
    useEffect(() => {
        if (editProductData) {
            setProductName(editProductData.productName)
            setSkuid(editProductData.skuid)
            setProductstock(editProductData.productstock)
            setSellingPrice(editProductData.sellingPrice)
            setCategorie(editProductData.categorie)
            setSubcategorie(editProductData.subcategorie)
            setProductbrand(editProductData.productbrand)
            setProductImage(editProductData.productImage)
        }
    }, [editProductData])
    return (
        <div className='flex h-screen'>
            <Sidebar />
            <main className='flex-1 w-full min-w-0 flex flex-col bg-[#F3F7F9]'>
                <Header name="Products" />
                <section className='m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0'>
                    <div className='flex justify-end gap-4 max-2xl:gap-2 text-base max-xl:text-sm'>
                        <button onClick={AddNewproduct} className='px-4 max-2xl:px-3 max-2xl:py-1 cursor-pointer py-2 bg-[#0A6637] rounded-lg text-white flex items-center gap-3'><i className="fa-solid fa-circle-plus"></i>Add New</button>
                        <button className='px-4 py-2 max-2xl:px-3 max-2xl:py-1  hover:text-[#0A6637] active:text-[#0A6637] text-[#505050] border-[#D8D8D8] cursor-pointer rounded-lg border flex items-center gap-3'><i className="fa-solid fa-filter"></i>Filters</button>
                        <button className='px-4 py-2 max-2xl:px-3 max-2xl:py-1  hover:text-[#0A6637] active:text-[#0A6637] text-[#505050] border-[#D8D8D8] cursor-pointer rounded-lg border flex items-center gap-3'><i className="fa-solid fa-file-import"></i>Import</button>
                        <button className='px-4 py-2 max-2xl:px-3 max-2xl:py-1  hover:text-[#0A6637] active:text-[#0A6637] text-[#505050] border-[#D8D8D8] cursor-pointer rounded-lg border flex items-center gap-3'><i className="fa-solid fa-arrow-up-from-bracket"></i>Export</button>
                        <button className='px-4 py-2 max-2xl:px-3 max-2xl:py-1  hover:text-[#0A6637] active:text-[#0A6637] text-[#505050] border-[#D8D8D8] cursor-pointer rounded-lg border flex items-center gap-3'><i className="fa-solid fa-list"></i></button>
                        <button onClick={handleProductView} className='px-4 py-2 max-2xl:px-3 max-2xl:py-1  hover:text-[#0A6637] active:text-[#0A6637] text-[#505050] border-[#D8D8D8] cursor-pointer rounded-lg border flex items-center gap-3'><i className="fa-solid fa-table-cells-large"></i></button>
                    </div>
                    {/* box */}
                    <section className={`${openEdit ? "grid grid-cols-3 max-xl:grid-cols-2 gap-3" : ""}`}>
                        <div className={`grid ${openEdit ? "grid-cols-1 overflow-y-scroll h-screen" : "grid-cols-3 max-xl:grid-cols-2"}  mt-5 gap-4`}>
                            {productDataView?.map((product, index) => (
                                <div
                                    key={index}
                                    className={`w-full min-h-[208px] max-h-[250px] border rounded-2xl p-4 ${selectedProductId === product._id ? "border-[#0a0a0a] border-2" : "border-[#D8D8D8]"} `}
                                    style={{ backgroundColor: backgroundColors[index % backgroundColors.length] }}
                                >
                                    <div className='border-b border-[#D8D8D8] pb-2 flex justify-between'>
                                        <h2 className='text-xl max-2xl:text-base font-medium'>{product.productName}</h2>
                                        <div className='flex items-center'>
                                            <button className='mr-2  cursor-pointer' onClick={() => handleProductViewEdit(product._id)}>
                                                <i className="fa-regular fa-pen-to-square text-[#9A9A9A]"></i>
                                            </button>
                                            <button onClick={() => openDeletePopup(product._id)} className=' cursor-pointer'>
                                                <i className="fa-regular fa-trash-can text-[#9A9A9A]"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center mt-2'>
                                        <div className='text-xs flex flex-col gap-2'>
                                            <p className='font-medium'>SKU ID : <span className='font-light'>{product.skuid}</span></p>
                                            <p className='font-medium'>Category : <span className='font-light'>{product.categorie}</span></p>
                                            <p className='font-medium'>Sub Category : <span className='font-light'>{product.subcategorie}</span></p>
                                            <p className='font-medium'>Brand Name : <span className='font-light'>{product.productbrand}</span></p>
                                            <p className='font-medium'>Unit : <span className='font-light'>Sets</span></p>
                                            <p className='font-medium'>Stock : <span className='font-light'>{product.productstock}</span></p>
                                        </div>
                                        <div>
                                            <img className='w-[110px] h-[115px] object-contain' src={product.productImage} alt="Product" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {deletePopup && (
                            <>
                                <div className='fixed inset-0 bg-[#2424242a] bg-opacity-50 flex justify-center items-center'>
                                    <div className='bg-white shadow-sm rounded-md p-6 animate-[popupBounceIn_0.5s_cubic-bezier(0.68,-0.55,0.265,1.55)]'>
                                        <h2 className='mb-4'>Are you sure you want to delete this item?</h2>
                                        <div className="flex  justify-stretch gap-4">
                                            <button
                                                className="px-4 py-2 w-full bg-gray-300 rounded cursor-pointer"
                                                onClick={() => setDeletePopup(false)}
                                            >
                                                No
                                            </button>
                                            <button
                                                className="px-4 py-2 w-full bg-[#0A6637] text-white rounded cursor-pointer"
                                                onClick={() =>
                                                    HandleDeleteProduct(deleteIndex)
                                                }
                                            >
                                                Yes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {openEdit && (
                            <>
                                <div className='max-xl:col-span-1 col-span-2'>
                                    <section className=' flex-1 bg-white border-2 border-gray-200 rounded-xl p-8 max-xl:p-4 mt-5 '>
                                        <h2 className='text-base max-xl:text-sm font-medium'>Products / <span className='text-[#0A6637]'>Edit</span></h2>
                                        <form onSubmit={handleFormSubmit} className='flex flex-col gap-5 mt-5 py-6 px-4 border border-gray-200 shadow rounded-xl'>
                                            <h2 className='text-xl max-2xl:text-lg font-medium'>General Details</h2>
                                            <div className='bg-[#F6F6F6] px-4 py-5 rounded-lg'>
                                                <div className='grid grid-cols-3 gap-4 max-2xl:grid-cols-2 max-xl:grid-cols-1' >
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
                                                            Product Category
                                                        </label>
                                                        <select
                                                            value={categorie}
                                                            onChange={(e) => setCategorie(e.target.value)}
                                                            className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                                            id="ProductCategory"
                                                        >
                                                            <option value="">-- Select Category --</option>
                                                            {Array.isArray(selectcategorie) && selectcategorie.map((categorie) => (
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
                                                            value={subcategorie}
                                                            onChange={(e) => setSubcategorie(e.target.value)}
                                                            className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                                            id="ProductSubCategory"
                                                        >
                                                            <option value="">-- Select Sub Category --</option>
                                                            {Array.isArray(selectsubcategorie) && selectsubcategorie.map((subcategorie) => (
                                                                <option key={subcategorie} value={subcategorie}>{subcategorie}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                                            Product Brand
                                                        </label>
                                                        <select
                                                            value={productbrand}
                                                            onChange={(e) => setProductbrand(e.target.value)}
                                                            className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                                            id="ProductBrand"
                                                        >
                                                            <option value="">-- Select Brand --</option>
                                                            {Array.isArray(selectproductbrand) && selectproductbrand.map((product) => (
                                                                <option key={product} value={product}>
                                                                    {product}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                                            Product Stock
                                                        </label>
                                                        <input
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
                                                            Selling Price
                                                        </label>
                                                        <input
                                                            className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                                            type="text"
                                                            name="state"
                                                            placeholder="Enter Selling Price"
                                                            value={sellingPrice}
                                                            onChange={(e) => setSellingPrice(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <h2 className='text-xl max-2xl:text-lg font-medium'>Product Images</h2>
                                            <div className='bg-[#F6F6F6] px-4 py-5 rounded-lg'>
                                                <div className='w-[70%] max-2xl:w-full' >
                                                    <div>
                                                        <p className="text-sm max-xl:text-xs mb-1">
                                                            Other Product Image
                                                        </p>
                                                        <div className="flex items-center rounded-md border border-gray-300">
                                                            <input
                                                                id="Personal_Proof"
                                                                type="file"
                                                                name="PersonalProof"
                                                                accept='image/*'
                                                                className="hidden"
                                                                onChange={handleFileChange}
                                                            />
                                                            <label
                                                                htmlFor="Personal_Proof"
                                                                className="flex items-center font-medium text-white text-sm max-xl:text-xs justify-center gap-3 px-4 py-[0.35rem] bg-[#0A6637] rounded-md shadow cursor-pointer  focus:outline-none focus:ring-2  focus:ring-offset-2"
                                                            >
                                                                <i className="fa-solid fa-cloud-arrow-up"></i>
                                                                Upload 
                                                            </label>
                                                            {/* {productImage && (
                                                                <p className="ml-2 text-sm text-gray-700">
                                                                    {productImage instanceof File ? productImage.name : productImage.split('/').pop()}
                                                                </p>
                                                            )} */}
                                                        </div>
                                                        {productImage && (
                                                            <img
                                                                src={typeof productImage === 'string'
                                                                    ? productImage
                                                                    : URL.createObjectURL(productImage)}
                                                                alt="Product"
                                                                className="mt-2 w-[100px] h-[100px] object-contain max-w-xs rounded"
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex justify-end'>
                                                <button className='px-4 py-2 max-2xl:px-3 max-2xl-py-1 bg-[#0A6637] text-base max-xl:text-sm font-medium text-white cursor-pointer rounded-lg'>Update</button>
                                            </div>
                                        </form>
                                    </section>
                                </div>
                            </>
                        )}

                    </section>


                </section>
            </main>
        </div>
    )
}

export default ProductView