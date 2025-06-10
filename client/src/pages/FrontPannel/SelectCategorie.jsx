import React, { useEffect, useState } from "react";
import FrontPannelHeader from "../../components/FrontPannelHeader";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import coin from "../../assets/images/coin.png";

function SelectCategorie() {
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");  
  const selectedcategorie = location.state?.data;
  const [categorie, setCategorie] = useState([]);
  const [ordersetList, setOrdersetList] = useState([]);
  const [product, setProduct] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [customerData, setCustomerData] = useState([])
  const [customerID, setCustomerID] = useState("");
  const [customerLocation, setCustomerLocation] = useState("");
  const [orderType, setOrderType] = useState("");
  const [addCustomer, setAddCustomer] = useState(false);
  const [tableStatus, setTableStatus] = useState("Allotted")
  const [activeCategorie, setActiveCategorie] = useState(
    selectedcategorie?.categorieName || ""
  );
  const [activeCategorieIndex, setActiveCategorieIndex] = useState(null);
  const [openOrderItem, setOpenOrderItem] = useState(false);
  const [opensubCategorie, setSubCategorie] = useState(false);

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
    if (categorie.length && selectedcategorie) {
      const inisialIndex = categorie.findIndex(
        (cat) => cat.categorieName === selectedcategorie?.categorieName
      );
      setActiveCategorieIndex(inisialIndex);
    }
  }, [categorie, selectedcategorie]);

  const handleCategorie = (index) => {
    setActiveCategorieIndex(index);
    setActiveCategorie(categorie[index].categorieName);
    setSubCategorie(false);
  };

  const handleSubCategorie = (product) => {
    const existing = ordersetList.find((item) => item._id === product._id);
    if (!existing) {
      setOrdersetList((prev) => [...prev, { ...product, count: 1 }]);
    }
    setOpenOrderItem(true);
    setSubCategorie(true);
  };

  const updateCount = (id, delta) => {
    setOrdersetList((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, count: Math.max(1, item.count + delta) }
          : item
      )
    );
  };

  const deleteOrder = (id) => {
    const updatedOrdersetList = ordersetList.filter((item) => item._id !== id);
    setOrdersetList(updatedOrdersetList);
    if (updatedOrdersetList.length === 0) {
      setOpenOrderItem(false);
    }
  };

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

  useEffect(() => {
    const savedLocation = localStorage.getItem("location");
    if (savedLocation) {
      setCustomerLocation(savedLocation);
    }
  }, []);

  useEffect(() => {
    const savedOrdertype = localStorage.getItem("activeButton");
    if (savedOrdertype) {
      setOrderType(savedOrdertype);
    }
  }, []);

  const handleCustomerData = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/addCustomerData", { customerID, customerLocation, tableStatus, orderType, customerName, phoneno, ordersetList })
      setAddCustomer(true);
      fetchCustomerData()
      console.log("data saved successfull")
    } catch (error) {
      console.log(error)
    }
  }

  const navigate = useNavigate()

  
  const handleConfirm = async () => {
    navigate("/table")
  }

  return (
    <div className="">
      <FrontPannelHeader setInputValue={setInputValue} />
      <section
        className={`max-w-[1800px] mx-auto  ${openOrderItem ? "grid grid-cols-3" : ""
          }`}
      >
        {/* container-1 */}
        <div className={`p-6 ${openOrderItem ? "col-span-2" : ""}`}>

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
            {filterProduct
              .filter((sub) => sub.categorie === activeCategorie)
              .map((sub, index) => (
                <div
                  key={index}
                  className="w-[125px]  flex-none shrink-0  rounded-xl border-[#D8D8D8] hover:border-[#0FA814] cursor-pointer group"
                >
                  <img
                    className="w-[125px] h-[90px] bg-white object-contain rounded-t-xl p-2"
                    src={sub.productImage}
                    alt=""
                  />
                  <h2 className="bg-white text-center pb-1">{sub.productName}</h2>

                  {ordersetList.some((item) => item._id === sub._id) ? (
                    <button className="w-full text-white flex justify-between  px-4 py-1 max-xl:px-2 max-xl:py-2 max-xl:text-sm text-center bg-[#0FA814] rounded-b-xl  cursor-pointer">
                      <div onClick={() => updateCount(sub._id, -1)}>
                        <i className="fa-solid fa-minus cursor-pointer"></i>
                      </div>
                      <p>
                        {
                          ordersetList.find((item) => item._id === sub._id)
                            ?.count
                        }
                      </p>
                      <div onClick={() => updateCount(sub._id, +1)}>
                        <i className="fa-solid fa-plus cursor-pointer"></i>
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleSubCategorie(sub);
                      }}
                      className="w-full px-2 py-1 max-xl:px-1 max-xl:py-2 max-xl:text-sm text-center bg-[#D8D8D8] rounded-b-xl group-hover:text-[#0FA814] cursor-pointer"
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* container-2 */}
        <div
          className={`border-l-2 p-6 border-[#D8D8D8]  transition-all duration-300 ${openOrderItem ? "block h-full col-span-1" : "hidden"
            }`}
        >
          {addCustomer ? (<><div className="border mb-5 border-[#D8D8D8] flex justify-between items-center rounded-2xl p-6 max-xl:p-2 text-lg max-xl:text-base font-medium ">
            <div>
              {customerData
                .filter((data) => data.customerID === customerID)
                .map((data, index) => (
                  <div className="text-sm" key={index}>
                    <h2>{data.customerName}</h2>
                    <p><i class="fa-solid fa-phone text-xs mr-1"></i>{data.phoneno}</p>
                  </div>
                ))}

            </div>
            <button className="flex items-center gap-2 border px-2 border-[#FFAE00] bg-[#FFF7E6] rounded-lg">
              <p>5</p>
              <img className="w-5 h-5" src={coin} alt="" />
            </button>
          </div></>) : (<></>)}


          <div className=" border border-[#D8D8D8] rounded-2xl p-6 max-xl:p-2 text-lg max-xl:text-base font-medium ">
            <h4>5 Items in this Order</h4>

            <div className="py-4 max-xl:py-2 flex flex-col gap-2 text-sm max-xl:text-xs overflow-y-auto table-scroll-wrapper max-h-[400px]">
              {ordersetList.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-xl p-2 flex justify-between items-center border-[#D8D8D8]"
                >
                  <img
                    className="w-[86px] h-[74px] max-xl:w-[60px] max-xl:h-[60px] object-contain"
                    src={item.productImage}
                    alt=""
                  />
                  <div className="flex flex-col justify-between items-start gap-4">
                    <div>
                      <h2 className="text-[#0FA814]">{item.productName}</h2>
                      <p>
                       $
                        {item.sellingPrice}
                      </p>
                    </div>

                    <p className="text-[#505050]">
                      Amount:
                      <span className="text-[#202020]">
                       $
                        {item.sellingPrice * item.count}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-end gap-4">
                    <i
                      className="fa-solid fa-trash-can cursor-pointer text-red-500"
                      onClick={() => deleteOrder(item._id)}
                    ></i>
                    <button className="flex items-center gap-6 bg-[#0FA814] text-white px-2 py-1 rounded-lg">
                      <div onClick={() => updateCount(item._id, -1)}>
                        <i className="fa-solid fa-minus cursor-pointer"></i>
                      </div>
                      <p>{item.count}</p>
                      <div onClick={() => updateCount(item._id, 1)}>
                        <i className="fa-solid fa-plus cursor-pointer"></i>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center text-[#505050]">
              <h2>Total :</h2>
              <p>{totalAmount}</p>
            </div>
          </div>

          {addCustomer ? (
            <>
              <button
                type="button"
                onClick={handleConfirm}
                className="bg-[#18A038] w-full cursor-pointer py-3 text-base font-semibold text-white rounded-lg mt-6"
              >
                confirm Order
              </button>
            </>
          ) : (
            <>
              <section className="border mt-6 mb-6 rounded-2xl p-4  border-[#D8D8D8] ">
                <form onSubmit={handleCustomerData} className="flex flex-col gap-3" action="">
                  <div>
                    <label htmlFor="">Customer Name</label>
                    <br />
                    <input
                      type="text"
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                      }}
                      className="border w-full rounded-sm py-1.5 px-4 mt-1 border-[#D8D8D8]"
                      placeholder="Enter Customer Name "
                    />
                  </div>
                  <div>
                    <label htmlFor="">Phone No.</label>
                    <br />
                    <input
                      type="text"
                      onChange={(e) => {
                        setPhoneno(e.target.value);
                      }}
                      className="border w-full rounded-sm py-1.5 px-4 mt-1 border-[#D8D8D8]"
                      placeholder="Enter Phone No."
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      className="bg-[#18A038] w-full cursor-pointer py-3 text-base font-semibold text-white rounded-lg"
                    >
                      Add Details
                    </button>
                  </div>
                </form>
              </section>
            </>
          )}

        </div>
      </section>
    </div>
  );
}

export default SelectCategorie;
