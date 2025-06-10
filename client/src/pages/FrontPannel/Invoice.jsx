import React, { useEffect, useState } from "react";
import FrontPannelHeader from "../../components/FrontPannelHeader";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import coin from "../../assets/images/coin.png";
import LogoFull from '../../assets/images/para-logo 1 copy.png';
import { toast } from "react-toastify";
function Invoice() {
    const navigate = useNavigate()
    const location = useLocation();
    const [inputValue, setInputValue] = useState("");
    const selectedcategorie = location.state?.data;
    const [categorie, setCategorie] = useState([]);
    const [ordersetList, setOrdersetList] = useState([]);
    const [product, setProduct] = useState([]);
    const [customerData, setCustomerData] = useState([])
    const [customerID, setCustomerID] = useState("");
    const [activeCategorie, setActiveCategorie] = useState(selectedcategorie?.categorieName || "");
    const [activeCategorieIndex, setActiveCategorieIndex] = useState(null);
    

    const fetchCategorie = async () => {
        const response = await axios.get("http://localhost:3000/api/getcategorie");
        setCategorie(response.data);
    };
    const fetchProduct = async () => {
        const res = await axios.get("http://localhost:3000/api/getProduct");
        setProduct(res.data);
    };
    useEffect(() => {
        fetchCategorie();
        fetchProduct();
    }, []);

    useEffect(() => {
        if (categorie.length) {
            let initialIndex = -1;

            if (selectedcategorie) {
                initialIndex = categorie.findIndex(
                    (cat) => cat.categorieName === selectedcategorie?.categorieName
                );
            }
            // Fallback to Chocolate if nothing is passed
            if (initialIndex === -1) {
                initialIndex = categorie.findIndex(
                    (cat) => cat.categorieName.toLowerCase() === "chocolate"
                );
            }
            if (initialIndex !== -1) {
                setActiveCategorieIndex(initialIndex);
                setActiveCategorie(categorie[initialIndex].categorieName);
            }
        }
    }, [categorie, selectedcategorie]);

    const handleCategorie = (index) => {
        setActiveCategorieIndex(index);
        setActiveCategorie(categorie[index].categorieName);
    };



    const handleSubCategorie = async (product) => {

        const existing = ordersetList.find((item) => item._id === product._id);

        if (!existing) {
            const newItem = { ...product, count: 1 };
            const updatedList = [...ordersetList, newItem];
            setOrdersetList(updatedList);
            try {
                await axios.put(
                    `http://localhost:3000/api/putCustomerData/${customerID}`,
                    { ordersetList: [newItem] }
                );
                fetchCustomerData()
            } catch (error) {
                console.error("Error adding item to customer:", error);
            }
        }
    };


    const updateSubcategorieCount = async (itemId, delta) => {

        setOrdersetList((prev) => {
            const updatedList = prev.map((item) =>
                item._id === itemId
                    ? { ...item, count: Number(item.count) + delta }
                    : item
            ).filter(item => item.count > 0);

            return updatedList;
        });


        try {
            await axios.patch(`http://localhost:3000/api/UpdateSubcategorieCustomer/${customerID}`, {
                itemId,
                delta
            });
            fetchCustomerData()
        } catch (error) {
            console.error("Failed to update count in backend", error);
        }
    };


    // const updateCount = async (customerId, itemId, delta) => {
    //     try {
    //         await axios.patch(
    //             `http://localhost:3000/api/updateCustomerData/${customerId}/${itemId}`,
    //             { delta: Number(delta) }
    //         );
    //         fetchCustomerData();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const deleteOrder = async (customerId, itemId) => {
    //     try {
    //         await axios.delete(`http://localhost:3000/api/deleteCustomerData/${customerId}/${itemId}`);
    //         const updatedOrdersetList = ordersetList.filter((item) => item._id !== itemId);
    //         setOrdersetList(updatedOrdersetList);
    //         fetchCustomerData();
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };

    // filter
    const filterProduct = product.filter((sub) => {
        return sub.productName.toLowerCase().includes(inputValue.toLowerCase());
    });

    const totalAmount = ordersetList.reduce((acc, item) => {
        return acc + item.sellingPrice * item.count;
    }, 0);

    const fetchCustomerData = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/getCustomerData");
            setCustomerData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCustomerData()
    }, [])

    useEffect(() => {
        const savedTables = localStorage.getItem("tableID");
        if (savedTables) {
            setCustomerID(savedTables);
        }
    }, []);

    const handleRepertOrder = () => {
        navigate("/closeTable")

    }

    const today = new Date()
    let currentDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`
    const Time = new Date()
    let hours = Time.getHours();
    const currentTime = `${String(Time.getHours()).padStart(2, "0")}:${String(Time.getMinutes()).padStart(2, "0")}`
    const AMPM = hours >= 12 ? 'PM' : 'AM';

    const handleCloseTable = async () => {
        const currentCustomer = customerData.find((data) => data.customerID === customerID);
        const id = currentCustomer?._id;
        if (!id) {
            console.error("Customer not found");
            return;
        }
        try {
            await axios.post(`http://localhost:3000/api/savedCustomer`, { ...currentCustomer, currentDate });
            await axios.delete(`http://localhost:3000/api/DeleteCurrentCustomer/${id}`);
            toast.success("Table Close Successfull..")
            navigate("/table");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <FrontPannelHeader />
                <section className="max-w-[1800px] mx-auto  grid grid-cols-3">
                    {/* container 1 */}
                    <div className={`p-6 col-span-2`}>
                        <h2 className="text-3xl sm:text-2xl font-serif font-semibold text-[#0A6637]">
                            Categories
                        </h2>

                        <div className="flex overflow-x-auto table-scroll-wrapper gap-6 flex-nowrap  mb-3 mt-3 pb-3 custom-scrollbar ">
                            {categorie.map((product, index) => {
                                const isActive = index === activeCategorieIndex;
                                return (
                                    <div
                                        onClick={() => handleCategorie(index)}
                                        key={index}
                                        className={`max-w-[125px] flex-none shrink-0 border rounded-2xl cursor-pointer group
                                            ${isActive
                                                ? "border-[#0FA814]"
                                                : "border-[#D8D8D8] hover:border-[#0FA814]"
                                            }`}
                                    >
                                        <img
                                            className="w-[125px] h-[90px] bg-white object-contain rounded-t-2xl p-2"
                                            src={product.categorieImage}
                                            alt={product.categorieName}
                                        />
                                        <h2
                                            className={`px-2 py-2 text-center bg-white rounded-b-2xl
                                            ${isActive ? "text-[#0FA814]" : "group-hover:text-[#0FA814]"
                                                }`}
                                        >
                                            {product.categorieName}
                                        </h2>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="border-t-2 flex flex-wrap gap-6 justify-start border-[#D8D8D8]  py-5 overflow-y-auto table-scroll-wrapper min-h-[530px]">
                            {customerData
                                .filter((data) => data.customerID === customerID)
                                .map((data) => (
                                    <>
                                        {data.ordersetList.map((item, index) => (
                                            <div
                                                key={index}
                                                className="w-[125px]  flex-none shrink-0  rounded-xl border-[#D8D8D8] hover:border-[#0FA814] cursor-pointer group"
                                            >
                                                <img
                                                    className="w-[125px] h-[90px] bg-white object-contain rounded-t-xl p-2"
                                                    src={item.productImage}
                                                    alt=""
                                                />
                                                <h2 className="bg-white text-center pb-1">{item.productName}</h2>
                                                <button className="w-full text-white flex justify-between  px-4 py-1 max-xl:px-2 max-xl:py-2 max-xl:text-sm text-center bg-[#0FA814] rounded-b-xl  cursor-pointer">
                                                    <div >
                                                        <i className="fa-solid fa-minus cursor-pointer"></i>
                                                    </div>
                                                    <p>
                                                        {item.count}
                                                    </p>
                                                    <div >
                                                        <i className="fa-solid fa-plus cursor-pointer"></i>
                                                    </div>
                                                </button>
                                            </div>
                                        ))}
                                    </>
                                ))}
                        </div>
                    </div>

                    {/* container 2 */}
                    <div className="border-l-2 p-6 border-[#D8D8D8]  transition-all duration-300 block h-full col-span-1">
                        <div className="border mb-5 border-[#D8D8D8] flex justify-between items-center rounded-2xl p-6 max-xl:p-2 text-lg max-xl:text-base font-medium ">
                            <div>
                                {customerData
                                    .filter((data) => data.customerID === customerID)
                                    .map((data, index) => (
                                        <div className="text-sm" key={index}>
                                            <h2>{data.customerName}</h2>
                                            <p><i className="fa-solid fa-phone text-xs mr-1"></i>{data.phoneno}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <button className="flex items-center gap-2 border px-2 border-[#FFAE00] bg-[#FFF7E6] rounded-lg">
                                <p>5</p>
                                <img className="w-5 h-5" src={coin} alt="" />
                            </button>
                        </div>

                        <div className="border border-[#D8D8D8] rounded-lg">
                            <div className="flex justify-between items-center p-4 border-b-2 border-[#D8D8D8]">
                                <h2 className="font-semibold text-lg">Invoice</h2>
                                <i class="fa-solid fa-print"></i>
                            </div>

                            <div>
                                {customerData
                                    .filter((data) => data.customerID === customerID)
                                    .map((data, index) => (
                                        <div className="text-sm" key={index}>
                                            <div className="text-center py-4">
                                                <img className="w-[130px]" src={LogoFull} alt="" />
                                            </div>

                                            <div className="px-4 text-xs">
                                                <div className="border-b-2 border-[#D8D8D8] pb-2">
                                                    <div className="flex justify-between items-center">
                                                        <h2>
                                                            Order ID : <span>1234</span>
                                                        </h2>
                                                        <h2>
                                                            Date : <span>{currentDate}</span>
                                                        </h2>
                                                    </div>
                                                    <h2>
                                                        Time : <span>{currentTime}{" "}{AMPM}</span>
                                                    </h2>
                                                </div>

                                                <div className="py-2 leading-5 border-b-2 border-dashed border-[#D8D8D8]">
                                                    <h2 className="font-medium">
                                                        Customer Name :{" "}
                                                        <span className="font-light">
                                                            {data.customerName}
                                                        </span>
                                                    </h2>
                                                    <h2 className="font-medium">
                                                        Customer ID :{" "}
                                                        <span className="font-light">PANTRY00{data.customerID}</span>
                                                    </h2>
                                                </div>

                                                <div className="py-2 leading-5 border-b-2 border-dashed border-[#D8D8D8]">
                                                    <h2 className="font-medium">Order Items</h2>
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr>
                                                                <th></th>
                                                                <th></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="w-full">
                                                            {data.ordersetList.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        {" "}
                                                                        {item.count} X {item.productName}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {item.sellingPrice}
                                                                    </td>
                                                                    <td className="text-end">
                                                                        $ {item.sellingPrice * item.count}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                    {/* {data.ordersetList.map((item, index) => (
                                                        <div
                                                        key={index}
                                                        className="flex justify-between items-start"
                                                        >
                                                        <div>
                                                            {item.count} X {item.productName}
                                                        </div>
                                                        <div className="">{item.sellingPrice}</div>
                                                        <div> ₹{item.sellingPrice * item.count}</div>
                                                        </div>
                                                    ))} */}
                                                </div>

                                                <div className="py-2 leading-5">
                                                    <div className="flex justify-between">
                                                        <h2 className="font-medium">Total :</h2>
                                                        <p>
                                                            {" "}
                                                            ${" "}
                                                            {customerData
                                                                .filter(
                                                                    (data) => data.customerID === customerID
                                                                )
                                                                .flatMap((customer) => customer.ordersetList)
                                                                .reduce((total, item) => {
                                                                    const price = Number(item.sellingPrice);
                                                                    const count = Number(item.count);
                                                                    return total + price * count;
                                                                }, 0)}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <h2 className="font-medium">Paid Via :</h2>
                                                        <p>Tap ID Card</p>
                                                    </div>
                                                </div>

                                                <div className="text-center p-4 leading-5">
                                                    <p>Thank you for choosing us !</p>
                                                    <p>Have a productive day and enjoy your break !</p>
                                                    <p className="font-medium">
                                                        For inquires :{" "}
                                                        <span className="font-light">+98279993733</span> |{" "}
                                                        <span className="font-light">info@gmail.com</span>
                                                    </p>
                                                    <p className="font-medium">
                                                        Visit :{" "}
                                                        <span className="font-light">
                                                            www.paragraph.business
                                                        </span>
                                                    </p>
                                                    <p className="flex gap-2 items-center justify-center mt-2">
                                                        <i class="fa-brands fa-facebook-f"></i>
                                                        <i class="fa-brands fa-twitter"></i>
                                                        <i class="fa-brands fa-linkedin-in"></i>
                                                        <i class="fa-brands fa-instagram"></i>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <button type="button" onClick={handleRepertOrder} className="bg-[#18A038] text-white px-4 py-2 rounded-lg cursor-pointer">Repert Orders</button>
                            <button type="button" onClick={handleCloseTable} className="bg-[#CF0202] cursor-pointer text-white px-4 py-2 rounded-lg">Close Table</button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default Invoice