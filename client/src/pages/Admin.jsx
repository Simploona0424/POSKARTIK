import React from 'react';
import { useEffect, useState } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import axios from "axios"

function Admin() {
    const [openFilter, setOpenFilter] = useState(false);
    const [expendRow, setExpendRow] = useState(false);
    const [innerExpendRow, setInnerExpendRow] = useState(false);
    const [customerData, setCustomerData] = useState([])
    const [selectLocation, setSelectLocation] = useState([])
    const [Location, setLocation] = useState("")
    const [filterLocation, setFilterLocation] = useState("")
    const [useLocation, setUserLocation] = useState("")
    const [currentPage, setCurrentPage] = useState(1);

    const today = new Date()
    let currentDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`

    const [date, setDate] = useState(currentDate)
    const formatDate = (isoDate) => {
        const [year, month, day] = isoDate.split("-");
        return `${day}/${month}/${year}`;
    };

    console.log(customerData)
    const fetchNewLocation = async () => {
        try {
            const res = await axios.get("https://poskartik.onrender.com/api/getlocation");
            setSelectLocation(res.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchNewLocation();
    }, []);

    const fetchAllCustomer = async () => {
        try {
            const res = await axios.get("https://poskartik.onrender.com/api/getsavedCustomer")
            setCustomerData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllCustomer()
    }, [])

    const handleFiltersection = () => {
        setOpenFilter((prev) => !prev)
    }

    const ToggleRow = (index) => {
        setExpendRow((prev) => (prev === index ? null : index));
    };


    useEffect(() => {
        const res = localStorage.getItem("location")
        setUserLocation(res)
    }, [])

    const ToggleinnerExpendRow = (index) => {
        setInnerExpendRow((prev) => (prev === index ? null : index))
    }

    //pagination
    // const totalPage = Math.ceil(selectLocation.length/10)
    // const startIndex = (currentPage-1)*10
    // const endIndex = startIndex + 10
    // const paginatedData =  selectLocation.slice(startIndex,endIndex)

    const handleDeleteCustomer = () => {

    }
    return (
        <>
            <div className="flex h-screen">
                <Sidebar />
                <main className="flex-1 flex flex-col bg-[#F3F7F9]">
                    <Header />
                    <section className="flex-1 m-5  bg-white border-2 border-gray-200 rounded-b-xl p-8 pt-2 mt-0">
                        <div className='text-base max-xl:text-sm font-medium flex items-center gap-3 justify-end'>
                            <div className='text-end '>
                                <select
                                    value={Location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="border w-[200px] px-3 py-2 focus-within:ring-[#0A6637] text-[#0A6637]  text-sm max-xl:text-xs font-normal border-[#0A6637] bg-white mt-1  rounded-md focus:outline-none focus:ring-1"
                                    id="SelectLocation"
                                >
                                    <option value="">--Select Location --</option>
                                    {Array.isArray(selectLocation) && selectLocation.map((loc, index) => (
                                        <option key={index} value={loc.city}>{loc.city}</option>
                                    ))}
                                </select>
                            </div>
                            <button onChange={(e) => setDate(formatDate(e.target.value))} className='px-4 py-2 text-[#0A6637] cursor-pointer transition-colors duration-300   max-2xl:px-3 max-2xl:py-1 rounded-lg border flex items-center gap-3'><input type="date" /></button>
                            <button onClick={handleFiltersection} className='px-4 transition-colors duration-300 hover:bg-[#0A6637] hover:text-white py-2 max-2xl:px-3 max-2xl:py-1  text-[#0A6637] cursor-pointer rounded-lg border flex items-center gap-3'><i class="fa-solid fa-filter"></i>Filter</button>
                            <button className='px-4 py-2 text-[#0A6637] cursor-pointer transition-colors duration-300 hover:bg-[#0A6637] hover:text-white  max-2xl:px-3 max-2xl:py-1 rounded-lg border flex items-center gap-3'><i className="fa-solid fa-arrow-up-from-bracket"></i> Export</button>
                        </div>
                        {openFilter &&
                            <div className='border mt-3 border-[#D8D8D8] rounded-xl p-3'>
                                <div className='flex justify-between'>
                                    <h2 className='text-xl font-medium text-[#202020]'>Filter</h2>
                                    <i onClick={() => setOpenFilter(false)} class="fa-solid fa-xmark cursor-pointer"></i>
                                </div>

                                <form action="" >
                                    <section className='bg-[#F6F6F6] p-3 mt-3 rounded-lg grid grid-cols-3 gap-3'>

                                        <div>
                                            <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                                Select Location
                                            </label>
                                            <select
                                                value={filterLocation}
                                                onChange={(e) => setFilterLocation(e.target.value)}
                                                className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                                id="State"
                                            >
                                                <option value="">--Select Location --</option>
                                                {Array.isArray(selectLocation) && selectLocation.map((loc, index) => (
                                                    <option key={index} value={loc.city}>{loc.city}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* <div>
                                            <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                                Status
                                            </label>
                                            <select
                                                className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                                id="PaymentStatus"
                                            >
                                                <option value="">-- Select Payment Status--</option>
                                                <option value="individual">Individual</option>
                                                <option value="company">Company</option>
                                                <option value="government">Government</option>
                                            </select>
                                        </div> */}
                                        <div>
                                            <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                                                Total Amount
                                            </label>
                                            <input
                                                className="border w-full  px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1  rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                                                type="number"
                                                name="amount"
                                                placeholder="Enter Amount"
                                            // value={city}
                                            // onChange={(e) => setCity(e.target.value)}
                                            />
                                        </div>
                                    </section>

                                    <div className='flex justify-end items-center gap-3 mt-3'>
                                        <button className='px-4 py-1 max-2xl:px-3 max-2xl:py-1  text-base max-xl:text-sm font-medium text-[#505050] border cursor-pointer rounded-lg'>Clear All</button>
                                        <button className='px-4 py-1 max-2xl:px-3 max-2xl:py-1 bg-[#0A6637] text-base max-xl:text-sm font-medium text-white cursor-pointer rounded-lg'>Apply</button>
                                    </div>
                                </form>
                            </div>
                        }
                        <section className='overflow-x-auto table-scroll-wrapper mt-3'>
                            <table className=' min-w-[100%] table-auto  border-separate border-spacing-0 rounded-t-xl shadow-sm '>
                                <thead className='bg-[#F6F6F6] rounded-t-xl'>
                                    <tr>
                                        <th className='px-4 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 rounded-tl-xl'>

                                        </th>
                                        <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300 '>
                                            #
                                        </th>
                                        <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                                            Date
                                        </th>
                                        <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                                            Table No.
                                        </th>
                                        <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                                            Total Amount
                                        </th>
                                        <th className='px-6 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-base max-xl:text-sm font-medium text-start border-b border-gray-300'>
                                            Location
                                        </th>
                                        <th className="w-20 px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A] text-base max-xl:text-sm  font-medium text-start border-b border-gray-300 rounded-tr-xl">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (() => {
                                            const rows = [];
                                            selectLocation
                                                .filter(loc => loc.city === (!Location ? useLocation : Location))
                                                .forEach((matchedPantry) => {
                                                    for (let i = 1; i <= matchedPantry.table; i++) {
                                                        const matchOrder = customerData.filter((data) =>
                                                            data.currentDate === date &&
                                                            data.customerID.split("-")[1] === String(i) &&
                                                            data.customerLocation === (!Location ? useLocation : Location)


                                                        )
                                                        console.log("matchOrder", matchOrder)
                                                        const totalAmount = matchOrder
                                                            .flatMap((customer) => customer.ordersetList)
                                                            .reduce((total, item) => {
                                                                const price = Number(item.sellingPrice);
                                                                const count = Number(item.count);
                                                                return total + price * count;
                                                            }, 0)
                                                        const rowKey = `${matchedPantry.city}-${i}`;
                                                        const isExpanded = expendRow === String(i);
                                                        rows.push(
                                                            <tr key={`${matchedPantry.city}-${i}`}>
                                                                <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">  <i
                                                                    onClick={() => ToggleRow(`${i}`)}
                                                                    className={`fa-solid fa-chevron-right cursor-pointer text-[#9A9A9A] ${isExpanded ? "rotate-90" : ""
                                                                        }`}
                                                                ></i></td>
                                                                <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">{i}</td>
                                                                <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">{date}</td>
                                                                <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">{`Table ${i}`}</td>
                                                                <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">$ {totalAmount}</td>
                                                                <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300">{!Location ? useLocation : Location}</td>
                                                                <td className=" whitespace-nowrap px-6 py-[0.40rem] text-[#202020] text-sm max-xl:text-xs font-normal border-b text-start border-gray-300"><i onClick={handleDeleteCustomer} class="fa-solid fa-trash-can text-[#9A9A9A]"></i></td>
                                                            </tr>
                                                        );
                                                        if (isExpanded) {

                                                            rows.push(
                                                                <tr key={`${rowKey}-expanded`}>
                                                                    <td colSpan={7} className="px-6 py-2 bg-white text-sm text-[#202020]">
                                                                        <div className="mt-3 overflow-x-auto">
                                                                            <table className="min-w-[100%] table-auto  border-separate border-spacing-0 rounded-t-xl shadow-sm ">
                                                                                <thead className="bg-[#F6F6F6] rounded-t-xl border">
                                                                                    <tr>
                                                                                        <th className=" px-2 py-[0.40rem]  border-2 whitespace-nowrap  text-[#3A3A3A]  text-sm max-xl:text-xs font-medium text-center border-b-0 border-r-0 border-gray-200 rounded-tl-xl">
                                                                                            #
                                                                                        </th>
                                                                                        <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200 ">
                                                                                            Order ID
                                                                                        </th>
                                                                                        <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                                                                            Cuatomer Name
                                                                                        </th>

                                                                                        <th className=" px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                                                                            Phone No
                                                                                        </th>
                                                                                        <th className=" px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-sm max-xl:text-xs font-medium text-center border-2 border-b-0  border-gray-200 rounded-tr-xl">
                                                                                            Amount
                                                                                        </th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {matchOrder.map((data, index) => (
                                                                                        <React.Fragment key={index}>
                                                                                            <tr >
                                                                                                <td className="border-2 text-[#202020] flex justify-evenly items-center whitespace-nowrap  py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0  text-center border-gray-200 ">
                                                                                                    <i
                                                                                                        onClick={() => ToggleinnerExpendRow(index)}
                                                                                                        className={`fa-solid fa-chevron-right cursor-pointer text-[#9A9A9A] ${innerExpendRow === index ? "rotate-90" : ""
                                                                                                            }`}
                                                                                                    ></i>   {index + 1}
                                                                                                </td>
                                                                                                <td className="border-2 text-[#202020]  whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200 ">
                                                                                                    ORI{data._id}
                                                                                                </td>
                                                                                                <td className="border-2 text-[#202020]  whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200 ">
                                                                                                    {data.customerName}
                                                                                                </td>
                                                                                                <td className="border-2 text-[#202020]  whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0 text-center border-gray-200 ">
                                                                                                    {data.phoneno}
                                                                                                </td>
                                                                                                <td className="border-2 text-[#202020]  whitespace-nowrap px-2 py-[0.40rem] text-sm max-xl:text-xs font-normal  text-center border-gray-200 ">
                                                                                                    $ {data.ordersetList
                                                                                                        .reduce((total, item) => {
                                                                                                            const price = Number(item.sellingPrice);
                                                                                                            const count = Number(item.count);
                                                                                                            return total + price * count;
                                                                                                        }, 0)}
                                                                                                </td>

                                                                                            </tr>
                                                                                            {innerExpendRow === index && (
                                                                                                <tr>
                                                                                                    <td colSpan={5} className="bg-gray-50 px-4 py-1 text-sm text-left text-[#202020]">
                                                                                                        <div className="mt-3 overflow-x-auto">
                                                                                                            <table className="min-w-[100%] table-auto  border-separate border-spacing-0 rounded-t-xl shadow-sm ">
                                                                                                                <thead className="bg-[#F6F6F6] rounded-t-xl border">
                                                                                                                    <tr>
                                                                                                                        <th className=" px-2 py-[0.40rem]  border-2 whitespace-nowrap  text-[#3A3A3A]  text-sm max-xl:text-xs font-medium text-center border-b-0 border-r-0 border-gray-200 rounded-tl-xl">
                                                                                                                            #
                                                                                                                        </th>
                                                                                                                        <th className="px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200 ">
                                                                                                                            image
                                                                                                                        </th>
                                                                                                                        <th className="px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                                                                                                            Name
                                                                                                                        </th>

                                                                                                                        <th className=" px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                                                                                                            SKU ID
                                                                                                                        </th>

                                                                                                                        <th className=" px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                                                                                                            Category
                                                                                                                        </th>
                                                                                                                        <th className=" px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                                                                                                            Sub  Category
                                                                                                                        </th>
                                                                                                                        <th className=" px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                                                                                                            Brand
                                                                                                                        </th>
                                                                                                                        <th className=" px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                                                                                                            Unit Price
                                                                                                                        </th>
                                                                                                                        <th className=" px-2 whitespace-nowrap py-[0.40rem] text-[#3A3A3A] text-sm max-xl:text-xs font-medium text-center border-2 border-b-0 border-r-0 border-gray-200">
                                                                                                                            Qty
                                                                                                                        </th>
                                                                                                                        <th className=" px-2 py-[0.40rem] whitespace-nowrap  text-[#3A3A3A]  text-sm max-xl:text-xs font-medium text-center border-2 border-b-0  border-gray-200 rounded-tr-xl">
                                                                                                                            Amount
                                                                                                                        </th>
                                                                                                                    </tr>
                                                                                                                </thead>
                                                                                                                <tbody>

                                                                                                                    {data.ordersetList.map((item, index) => (
                                                                                                                        <tr key={index}>
                                                                                                                            <td className="border-2 text-[#202020]  whitespace-nowrap  py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0  text-center border-gray-200 ">
                                                                                                                                {index + 1}
                                                                                                                            </td>
                                                                                                                            <td className="border-2 text-[#202020]  whitespace-nowrap  py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0  text-center border-gray-200 ">
                                                                                                                                <img className='w-4' src={item.productImage} alt="product" />
                                                                                                                            </td>
                                                                                                                            <td className="border-2 text-[#202020]  whitespace-nowrap  py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0  text-center border-gray-200 ">
                                                                                                                                {item.productName}
                                                                                                                            </td>
                                                                                                                            <td className="border-2 text-[#202020]  whitespace-nowrap  py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0  text-center border-gray-200 ">
                                                                                                                                {item.skuid}
                                                                                                                            </td>
                                                                                                                            <td className="border-2 text-[#202020]  whitespace-nowrap  py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0  text-center border-gray-200 ">
                                                                                                                                {item.categorie}
                                                                                                                            </td>
                                                                                                                            <td className="border-2 text-[#202020]  whitespace-nowrap  py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0  text-center border-gray-200 ">
                                                                                                                                {item.subcategorie}
                                                                                                                            </td>
                                                                                                                            <td className="border-2 text-[#202020]  whitespace-nowrap  py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0  text-center border-gray-200 ">
                                                                                                                                {item.productbrand}
                                                                                                                            </td>
                                                                                                                            <td className="border-2 text-[#202020]  whitespace-nowrap  py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0  text-center border-gray-200 ">
                                                                                                                                $ {item.sellingPrice}
                                                                                                                            </td>
                                                                                                                            <td className="border-2 text-[#202020]  whitespace-nowrap  py-[0.40rem] text-sm max-xl:text-xs font-normal border-r-0  text-center border-gray-200 ">
                                                                                                                                {item.count}
                                                                                                                            </td>
                                                                                                                            <td className="border-2 text-[#202020]  whitespace-nowrap  py-[0.40rem] text-sm max-xl:text-xs font-normal border-r  text-center border-gray-200 ">
                                                                                                                                $ {item.sellingPrice * item.count}
                                                                                                                            </td>
                                                                                                                        </tr>
                                                                                                                    ))}

                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            )}
                                                                                        </React.Fragment>

                                                                                    ))}

                                                                                </tbody>

                                                                            </table>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    }
                                                });

                                            return rows;
                                        })()
                                    }
                                </tbody>
                            </table>
                        </section>
                    </section>
                </main>
            </div>
        </>
    )
}
export default Admin

