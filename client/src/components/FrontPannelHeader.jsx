import React, { useEffect, useState } from 'react'
import logo from "../assets/images/logo-second.png"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from "react-toastify";
function FrontPannelHeader({ setInputValue }) {
    const navigate = useNavigate()
    const today = new Date()
    let currentDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`
    const [openFilter, setOpenFilter] = useState(false)
    const [addCashPopup, setAddCashPopup] = useState(false)
    const [balencetype, setBalencetype] = useState("Opening Balence")
    const [onedollercoin, setOnedollercoin] = useState(null)
    const [fivedollercoin, setFivedollercoin] = useState(null)
    const [tendollercoin, setTendollercoin] = useState(null)
    const [twentydollercoin, setTwentydollercoin] = useState(null)
    const [fiftydollercoin, setFiftydollercoin] = useState(null)
    const [hundreddollercoin, setHundreddollercoin] = useState(null)
    const [fivedoller, setFivedoller] = useState(null)
    const [tendoller, setTendoller] = useState(null)
    const [twentydoller, setTwentydoller] = useState(null)
    const [fiftydoller, setFiftydoller] = useState(null)
    const [hundreddoller, setHundreddoller] = useState(null)
    const [thausanddoller, setThausanddoller] = useState(null)
    const [totalNote, setTotalNote] = useState(null)
    const [totalCoin, setTotalCoin] = useState(null)
    const [sumtotal, setSumtotal] = useState(null)
    const [fetchingData, setFatchingData] = useState([])
    const [userlocation, setUserLocation] = useState("")
    const [activeButton, setActiveButton] = useState(() => {
        return localStorage.getItem("activeButton") || "Dine in";
    });

    const fetchUser = async () => {
        try {
            const storedlocation = localStorage.getItem("location");
            setUserLocation(storedlocation)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:3000/api/balence", {
                currentDate,
                userlocation,
                balencetype,
                sumtotal,
                totalNote,
                totalCoin,
                fivedoller,
                tendoller,
                twentydoller,
                fiftydoller,
                hundreddoller,
                thausanddoller,
                onedollercoin,
                fivedollercoin,
                tendollercoin,
                twentydollercoin,
                fiftydollercoin,
                hundreddollercoin,

            })
            setAddCashPopup(false)
            toast.success("Balence save successfully...")
        } catch (error) {
            console.log(error)
        }
    }

    const fetchBalence = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/getbalence")
            setFatchingData(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchBalence()
    }, [])

    console.log("fetchingData", fetchingData)

    useEffect(() => {
        const todayData = fetchingData.find((data) => data.balencetype === "Opening Balence" && data.currentDate === currentDate)
        if (todayData) {
            setBalencetype("Clossing Balence")
        }
    }, [fetchingData])

    const Notecalculation = () => {
        const five = (Number(fivedoller) || 0) * 5;
        const ten = (Number(tendoller) || 0) * 10;
        const twenty = (Number(twentydoller) || 0) * 20;
        const fifty = (Number(fiftydoller) || 0) * 50;
        const hundred = (Number(hundreddoller) || 0) * 100;
        const thousand = (Number(thausanddoller) || 0) * 1000;

        return five + ten + twenty + fifty + hundred + thousand;
    };

    const Coincalculation = () => {
        const coinone = (Number(onedollercoin) || 0) * 1;
        const coinfive = (Number(fivedollercoin) || 0) * 5;
        const cointen = (Number(tendollercoin) || 0) * 10;
        const cointwenty = (Number(twentydollercoin) || 0) * 20;
        const coinfifty = (Number(fiftydollercoin) || 0) * 50;
        const coinhundred = (Number(hundreddollercoin) || 0) * 100;

        return coinone + coinfive + cointen + cointwenty + coinfifty + coinhundred;
    };



    // const handleAdmin = () => {
    //     setActiveButton("Admin")
    // }
    useEffect(() => {
        const noteTotal = Notecalculation();
        const coinTotal = Coincalculation();
        setTotalNote(noteTotal);
        setTotalCoin(coinTotal);
        setSumtotal(noteTotal + coinTotal);
    }, [fivedoller, tendoller, twentydoller, fiftydoller, hundreddoller, thausanddoller, onedollercoin, fivedollercoin, tendollercoin, twentydollercoin, fiftydollercoin, hundreddollercoin]);


    const handleDineIN = () => {
        setActiveButton("Dine in")
        navigate("/table")
    }

    const handleTakeAway = () => {
        setActiveButton("Take Away")
        navigate("/frontpannel")
    }


    useEffect(() => {
        localStorage.setItem("activeButton", activeButton);
    }, [activeButton]);

    const handleSearch = () => {
        setOpenFilter(true)
    }

    const closeSearch = () => {
        setOpenFilter(false)
    }

    const handleNavigate = () => {
        navigate("/table")
    }

    const handleAddCash = () => {
        setAddCashPopup((prev) => !prev)
    }

    return (
        <div>
            <section className='flex  justify-between items-center py-5 px-5 border-b-2 max-sm:py-2.5 max-sm:px-2.5 border-[#D8D8D8] min-w-full'>
                <img onClick={handleNavigate} className='max-md:h-6' src={logo} alt="" />
                <div>
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(event) => { setInputValue(event.target.value) }}
                        className="w-96 bg-[#F6F6F6] max-sm:hidden px-5 py-[0.35rem] border-1 border-gray-200 text-sm font-normal rounded-full focus:outline-none focus:ring-1"
                    />
                </div>
                <div>
                    <div className=' py-1 rounded-lg bg-[#E7F6E8] border border-[#0A6637]'>
                        {/* <button
                            onClick={handleAdmin}
                            className={`${activeButton === "Admin" ? "bg-green-600 text-white" : "bg-transparent"} px-6 py-1 cursor-pointer rounded-md transition-all duration-300 ease-in-out `}
                        >
                            Admin
                        </button> */}
                        <button
                            onClick={handleDineIN}
                            className={`${activeButton === "Dine in" ? "bg-[#0A6637] text-white" : "bg-transparent"} px-6 ml-1 py-1 cursor-pointer rounded-md transition-all duration-300 ease-in-out `}
                        >
                            Dine In
                        </button>
                        <button
                            onClick={handleTakeAway}
                            className={`${activeButton === "Take Away" ? "bg-[#0A6637] text-white" : "bg-transparent"} px-6 py-1 mr-1 cursor-pointer rounded-md transition-all duration-300 ease-in-out `
                            }
                        >
                            Take Away
                        </button>
                    </div>
                </div>

                <div>
                    <button onClick={handleAddCash} className='px-4 py-1 bg-[#E7F6E8] border rounded-md text-[#0A6637] font-medium  border-[#0A6637] cursor-pointer'>
                        Add Cash
                    </button>
                </div>

                {addCashPopup && (
                    <div className="fixed inset-0 bg-[#1717172a] bg-opacity-50 flex justify-center items-center">
                        <form onSubmit={handleFormSubmit} className="bg-white p-6 w-[600px] rounded shadow-lg animate-[popupBounceIn_0.5s_cubic-bezier(0.68,-0.55,0.265,1.55)]">
                            <div className='flex justify-between border-b-2 border-[#D8D8D8]'>
                                <h2 className="mb-4 font-medium text-xl text-[#0A6637]">
                                    {balencetype}
                                </h2>
                                <i onClick={() => setAddCashPopup(false)} class="fa-solid fa-xmark text-xl cursor-pointer"></i>
                            </div>

                            <div className='grid grid-cols-2 mt-3 gap-4'>
                                <div className='col-span-1 '>
                                    <h3 className='text-md font-medium bg-[#E7F6E8] py-1 pl-1'>Notes</h3>
                                    <div className='mt-4 flex flex-col gap-4'>
                                        <div className='flex items-center gap-4'>
                                            <label className='text-sm font-medium  w-[60px]'>$5 - </label>{" "}
                                            <input
                                                type="number"
                                                placeholder='Enter hear...'
                                                onChange={(e) => setFivedoller(e.target.value)}
                                                className="border-b border-gray-400 w-[150px] focus:outline-none focus:border-black bg-transparent"
                                            />
                                        </div>
                                        <div className='flex  items-center gap-4'>
                                            <label className='text-sm font-medium  w-[60px]'>$10 - </label>{" "}
                                            <input
                                                type="number"
                                                placeholder='Enter hear...'
                                                onChange={(e) => setTendoller(e.target.value)}
                                                className="border-b border-gray-400 w-[150px] focus:outline-none focus:border-black bg-transparent"
                                            />
                                        </div>
                                        <div className='flex  items-center gap-4'>
                                            <label className='text-sm font-medium  w-[60px]'>$20 - </label>{" "}
                                            <input
                                                type="number"
                                                placeholder='Enter hear...'
                                                onChange={(e) => setTwentydoller(e.target.value)}
                                                className="border-b border-gray-400 w-[150px] focus:outline-none focus:border-black bg-transparent"
                                            />
                                        </div>
                                        <div className='flex  items-center gap-4'>
                                            <label className='text-sm font-medium  w-[60px]'>$50 - </label>{" "}
                                            <input
                                                type="number"
                                                placeholder='Enter hear...'
                                                onChange={(e) => setFiftydoller(e.target.value)}
                                                className="border-b border-gray-400 w-[150px] focus:outline-none focus:border-black bg-transparent"
                                            />
                                        </div>
                                        <div className='flex  items-center gap-4'>
                                            <label className='text-sm font-medium  w-[60px]'>$100 - </label>{" "}
                                            <input
                                                type="number"
                                                placeholder='Enter hear...'
                                                onChange={(e) => setHundreddoller(e.target.value)}
                                                className="border-b border-gray-400 w-[150px] focus:outline-none focus:border-black bg-transparent"
                                            />
                                        </div>
                                        <div className='flex  items-center gap-4'>
                                            <label className='text-sm font-medium  w-[60px]'>$1000 - </label>{" "}
                                            <input
                                                type="number"
                                                placeholder='Enter hear...'
                                                onChange={(e) => setThausanddoller(e.target.value)}
                                                className="border-b border-gray-400 w-[150px] focus:outline-none focus:border-black bg-transparent"
                                            />
                                        </div>

                                        <div className='flex font-medium items-center gap-4 bg-[#E7F6E8] py-1'>
                                            <label className='pl-1 w-[60px]'>Total - </label>{" "}
                                            <h3>{Notecalculation()}</h3>
                                        </div>
                                    </div>

                                </div>
                                <div className='col-span-1'>
                                    <h3 className='text-md font-medium bg-[#E7F6E8] py-1 pl-1'>Coins</h3>
                                    <div className='mt-4 flex flex-col gap-4'>
                                        <div className='flex items-center gap-4'>
                                            <label className='text-sm font-medium  w-[60px]'>$1 - </label>{" "}
                                            <input
                                                type="text"
                                                placeholder='Enter hear...'
                                                onChange={(e) => setOnedollercoin(e.target.value)}
                                                className="border-b border-gray-400 w-[150px] focus:outline-none focus:border-black bg-transparent"
                                            />
                                        </div>
                                        <div className='flex  items-center gap-4'>
                                            <label className='text-sm font-medium  w-[60px]'>$5 - </label>{" "}
                                            <input
                                                type="text"
                                                placeholder='Enter hear...'
                                                onChange={(e) => setFivedollercoin(e.target.value)}
                                                className="border-b border-gray-400 w-[150px] focus:outline-none focus:border-black bg-transparent"
                                            />
                                        </div>
                                        <div className='flex  items-center gap-4'>
                                            <label className='text-sm font-medium  w-[60px]'>$10 - </label>{" "}
                                            <input
                                                type="text"
                                                placeholder='Enter hear...'
                                                onChange={(e) => setTendollercoin(e.target.value)}
                                                className="border-b border-gray-400 w-[150px] focus:outline-none focus:border-black bg-transparent"
                                            />
                                        </div>
                                        <div className='flex  items-center gap-4'>
                                            <label className='text-sm font-medium  w-[60px]'>$20 - </label>{" "}
                                            <input
                                                type="text"
                                                placeholder='Enter hear...'
                                                onChange={(e) => setTwentydollercoin(e.target.value)}
                                                className="border-b border-gray-400 w-[150px] focus:outline-none focus:border-black bg-transparent"
                                            />
                                        </div>
                                        <div className='flex  items-center gap-4'>
                                            <label className='text-sm font-medium  w-[60px]'>$50 - </label>{" "}
                                            <input
                                                type="text"
                                                placeholder='Enter hear...'
                                                onChange={(e) => setFiftydollercoin(e.target.value)}
                                                className="border-b border-gray-400 w-[150px] focus:outline-none focus:border-black bg-transparent"
                                            />
                                        </div>
                                        <div className='flex  items-center gap-4'>
                                            <label className='text-sm font-medium  w-[60px]'>$100 - </label>{" "}
                                            <input
                                                type="text"
                                                placeholder='Enter hear...'
                                                onChange={(e) => setHundreddollercoin(e.target.value)}
                                                className="border-b border-gray-400 w-[150px] focus:outline-none focus:border-black bg-transparent"
                                            />
                                        </div>

                                        <div className='flex font-medium items-center gap-4 bg-[#E7F6E8] py-1'>
                                            <label className='pl-1 w-[60px]'>Total - </label>{" "}
                                            <h3>{Coincalculation()}</h3>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-between items-center'>
                                <div className="px-4 py-2 w-[200px] bg-[#0A6637] flex justify-between items-center  text-white rounded mt-4 ">
                                    <h3>Total :</h3>
                                    <p>{Notecalculation() + Coincalculation()}</p>
                                </div>
                                <button type="submit" className="px-4 py-2  bg-[#0A6637] cursor-pointer w-20 text-white text-center rounded mt-4 ">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                <div className='flex items-center gap-3 max-sm:gap-2'>
                    <button
                        onClick={handleSearch}
                        className='border border-gray-300 rounded-full py-1 px-2 sm:hidden max-sm:py-[0.125rem] text-center'
                    >
                        <i className="fa-solid fa-magnifying-glass max-sm:text-xs"></i>
                    </button>
                    <button className='border border-gray-300 rounded-full py-1 px-2 max-sm:py-[0.125rem] text-center'>
                        <i className="fa-solid fa-cart-shopping max-sm:text-xs"></i>
                    </button>
                    <button className='border border-gray-300 rounded-full py-1 px-2 max-sm:py-[0.125rem] text-center'>
                        <i className="fa-solid fa-bars max-sm:text-xs"></i>
                    </button>
                </div>
            </section>

            {/* Mobile search bar overlay at the top */}
            {openFilter && (
                <div className="fixed top-0 left-0 right-0 bg-white p-2 flex items-center z-50 sm:hidden border-b border-gray-200 shadow">
                    <input
                        type="text"
                        placeholder="Search..."
                        autoFocus
                        className="flex-1 bg-[#F6F6F6] px-4 py-1 border border-gray-300 text-sm rounded-full focus:outline-none "
                    />
                    <button onClick={closeSearch} className="ml-2 text-gray-500 text-lg">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}
        </div>
    )
}

export default FrontPannelHeader