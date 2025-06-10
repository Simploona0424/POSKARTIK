import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AddNewOrder() {
    const navigate = useNavigate()
    const allStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];
    const [selectstate] = useState(allStates)
    const [customer, setCustomer] = useState()
    const [emailid, setEmailid] = useState();
    const [phoneno, setPhoneno] = useState();
    const [gstno, setGstno] = useState();
    const [panno, setPanno] = useState();
    const [address1, setAddress1] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [pincode, setPincode] = useState();
    const [selectCustomer, setSelectCustomer] = useState([])
    const [selectProduct, setSelectProduct] = useState([])
    const [selectcategorie, setSelectcategorie] = useState([])
    const [selectsubcategorie, setSelectsubcategorie] = useState([])
    const [selectproductbrand, setSelectproductbrand] = useState([])
    const [productdetail, setProductdetail] = useState([{ id: 0, product: '', SKUID: '', Category: '', SubCategory: '', productBrand: "" }]);

    const AddNewRow = () => {
        setProductdetail([...productdetail, { id: productdetail.length + 1, product: '', SKUID: '', Category: '', SubCategory: '', productBrand: "" }])
    }

    console.log(selectCustomer)

    const fetchcustomers = async () => {
        try {
            const getcustomer = await axios.get("https://poskartik.onrender.com/api/getcustomer")
            const getproduct = await axios.get("https://poskartik.onrender.com/api/getProduct")
            const getcategorie = await axios.get("https://poskartik.onrender.com/api/getcategorie");
            const getsubcategorie = await axios.get("https://poskartik.onrender.com/api/getSubCategorie");
            const getproductbrand = await axios.get("https://poskartik.onrender.com/api/getproductbrand");
            setSelectCustomer(getcustomer.data)
            setSelectProduct(getproduct.data.map(item => item.productName));
            setSelectcategorie(getcategorie.data.map(item => item.categorieName));
            setSelectsubcategorie(getsubcategorie.data.map(item => item.subCategory));
            setSelectproductbrand(getproductbrand.data.map(item => item.brandName));

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchcustomers()
    }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("https://poskartik.onrender.com/api/addorder", { emailid, phoneno, gstno, panno, address1, state, city, pincode, customer, productdetail });
            navigate("/orders")
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputChange = (e, id, field) => {
        const value = e.target.value
        setProductdetail((preview) => preview.map((row) => row.id === id ? { ...row, [field]: value } : row))

    }

    const handleRemoveRow=()=>{

    }
    return (
        <div className='flex h-screen'>
            <Sidebar />
            <main className='flex-1 flex flex-col bg-[#F3F7F9]'>
                <Header name="orders" />
                <section className='m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0 '>
                    <h2 className='text-base max-xl:text-sm text-[#505050]'>orders / <span className='text-[#0A6637]'>Create</span></h2>
                    <form onSubmit={handleFormSubmit} className='flex flex-col gap-5 mt-5 py-6 px-4 border border-gray-200 shadow rounded-xl'>
                        <h2 className='text-xl max-xl:text-lg font-medium text-[#202020]'>Customer Details</h2>
                        <div className='bg-[#F6F6F6] px-4 py-5 rounded-lg'>
                            <div className='grid grid-cols-3 gap-4 max-xl:grid-cols-3' >
                                <div>
                                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                        Select Customer <span className='text-red-600'>*</span>
                                    </label>
                                    <select
                                        value={customer}
                                        onChange={(e) => setCustomer(e.target.value)}
                                        className="border px-3 py-[0.25rem] focus-within:ring-[#0A6637] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                        id="SelectCustomer"
                                        required={true}
                                    >
                                        <option value="">--Select Customer --</option>
                                        {Array.isArray(selectCustomer) && selectCustomer.map((customer) => (
                                            <option value={customer.companyName}>{customer.companyName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                        Email Id <span className='text-red-600'>*</span>
                                    </label>
                                    <input
                                        className="border px-3 focus-within:ring-[#0A6637] py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                        type="text"
                                        name="emailid"
                                        placeholder="Enter Email Id"
                                        value={emailid}
                                        required
                                        onChange={(e) => setEmailid(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                        Phone No.
                                    </label>
                                    <input
                                        className="border px-3 focus-within:ring-[#0A6637] py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                        type="text"
                                        name="phoneno"
                                        placeholder="Enter Phone No."
                                        value={phoneno}
                                        onChange={(e) => setPhoneno(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                        GST No. <span className='text-red-600'>*</span>
                                    </label>
                                    <input
                                        className="border px-3 focus-within:ring-[#0A6637] py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                        type="text"
                                        name="gstno"
                                        placeholder="Enter GST No."
                                        value={gstno}
                                        required
                                        onChange={(e) => setGstno(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                        PAN No. <span className='text-red-600'>*</span>
                                    </label>
                                    <input
                                        className="border px-3 focus-within:ring-[#0A6637] py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                        type="text"
                                        required
                                        name="panno"
                                        placeholder="Enter PAN No.."
                                        value={panno}
                                        onChange={(e) => setPanno(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                        Address Line 1 <span className='text-red-600'>*</span>
                                    </label>
                                    <input
                                        className="border px-3 focus-within:ring-[#0A6637] py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                        type="text"
                                        required
                                        name="Address"
                                        placeholder="Enter Address"
                                        value={address1}
                                        onChange={(e) => setAddress1(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                        State <span className='text-red-600'>*</span>
                                    </label>
                                    <select
                                        value={state}
                                        required
                                        onChange={(e) => setState(e.target.value)}
                                        className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                        id="State"
                                    >
                                        <option value="">-- Select State --</option>
                                        {Array.isArray(selectstate) && selectstate.map((state) => (
                                            <option value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                        City <span className='text-red-600'>*</span>
                                    </label>
                                    <input
                                        className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                        type="text"
                                        name="City"
                                        required
                                        placeholder="Enter City"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
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
                                        placeholder="Enter Pincode"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <h2 className='text-xl max-xl:text-lg font-medium tex-[#202020]'>Product Details</h2>
                        <div className='bg-[#F6F6F6]  px-4 py-5 rounded-lg'>
                            {productdetail.map((productDetail) => (
                                <div key={productDetail.id} className='force-cols-4orderpage grid grid-cols-5 max-xl:grid-cols-3 gap-3'>
                                    <div className='mb-3'>
                                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                            Select Product <span className='text-red-600'>*</span>
                                        </label>
                                        <select
                                            value={productDetail.product}
                                            required
                                            onChange={(e) => handleInputChange(e, productDetail.id, "product")}
                                            className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                            id="SelectProduct"
                                        >
                                            <option value="">--Select Product --</option>
                                            {Array.isArray(selectProduct) && selectProduct.map((product) => (
                                                <option value={product}>{product}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                            SKU ID <span className='text-red-600'>*</span>
                                        </label>
                                        <input
                                            className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                            type="text"
                                            name="SKUID"
                                            required
                                            placeholder="Enter SKU ID"
                                            value={productDetail.SKUID}
                                            onChange={(e) => handleInputChange(e, productDetail.id, "SKUID")}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                            Product Category <span className='text-red-600'>*</span>
                                        </label>
                                        <select
                                            value={productDetail.Category}
                                            required
                                            onChange={(e) => handleInputChange(e, productDetail.id, "Category")}
                                            className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                            id="Category"
                                        >
                                            <option value="">-- Select Category --</option>
                                            {Array.isArray(selectcategorie) && selectcategorie.map((categorie) => (
                                                <option value={categorie}>{categorie}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                            Product Sub Category <span className='text-red-600'>*</span>
                                        </label>
                                        <select
                                            value={productDetail.SubCategory}
                                            required
                                            onChange={(e) => handleInputChange(e, productDetail.id, "SubCategory")}
                                            className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                            id="SubCategory"
                                        >
                                            <option value="">-- Select Sub Category --</option>
                                            {Array.isArray(selectsubcategorie) && selectsubcategorie.map((subcategorie) => (
                                                <option value={subcategorie}>{subcategorie}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                            Product Brand <span className='text-red-600'>*</span>
                                        </label>
                                        <select
                                            value={productDetail.productBrand}
                                            required
                                            onChange={(e) => handleInputChange(e, productDetail.id, "productBrand")}
                                            className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                            id="ProductBrand"
                                        >
                                            <option value="">-- Select Product Brand --</option>
                                            {Array.isArray(selectproductbrand) && selectproductbrand.map((productbrand) => (
                                                <option value={productbrand}>{productbrand}</option>
                                            ))}
                                        </select>
                                        {/* <i onClick={() => handleRemoveRow(productDetail.id)} class="fa-regular fa-circle-xmark text-lg pb-2 font-medium text-red-600 cursor-pointer"></i> */}
                                    </div>
                                </div>
                            ))}
     
                            <div className='mt-4'>
                                <button onClick={AddNewRow} type='button' className='cursor-pointer text-base max-xl:text-sm max-xl:px-3 max-xl:py-[0.38rem] font-medium px-4 py-1 border rounded-lg border-[#D8D8D8] text-[#505050 bg-white'>Add New</button>
                            </div>
                        </div>
                        <div className='flex justify-end'>
                            <button type='submit' className='px-4 py-2 bg-[#0A6637] text-base max-xl:text-sm font-medium max-xl:px-3 max-xl:py-[0.38rem] text-white cursor-pointer rounded-lg'>Add New</button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    )
}

export default AddNewOrder