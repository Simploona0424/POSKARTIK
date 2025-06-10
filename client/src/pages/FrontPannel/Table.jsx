import React, { useEffect, useState } from "react";
import FrontPannelHeader from "../../components/FrontPannelHeader";
import table from "../../assets/images/table.png";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { use } from "react";
function Table() {
  const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [customerData, setCustomerData] = useState([])
  const [pantryLocation, setPantryLocation] = useState([])
  const [userlocation, setUserLocation] = useState("")
  

  const fetchPantryLocation = async () => {
    try {
      const res = await axios.get("https://poskartik.onrender.com/api/getlocation");
      setPantryLocation(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUser = async () => {
    try {
      const storedlocation = localStorage.getItem("location");
      setUserLocation(storedlocation)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPantryLocation()
    fetchUser()
  }, [])

  console.log("pantryLocation", pantryLocation)

  useEffect(() => {
    if (pantryLocation.length > 0) {
      let matchTables = [];
      pantryLocation.forEach((pantry) => {
        if (pantry.city === userlocation) {
          for (let i = 1; i <= pantry.table; i++) {
            matchTables.push({
              tableID: `${pantry.city}-${i}`,
              name: `Table ${i}`,
              image: table,
            })
          }
        }
      })
      setTableData(matchTables);
    }
  }, [pantryLocation, userlocation])

  const fetchCustomerData = async () => {
    try {
      const res = await axios.get("https://poskartik.onrender.com/api/getCustomerData");
      setCustomerData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCustomerData()
  }, [])

  useEffect(() => {
    const savedTable = localStorage.getItem("tableID");
    if (savedTable) {
      setSelectedTable(savedTable);
    }
  }, []);

  const handleTable = (tableID) => {
    const isSelected = customerData.some((customer) => customer.customerID == tableID);
    if (isSelected) {
      navigate("/closeTable")
      setSelectedTable(tableID);
      localStorage.setItem("tableID", tableID);
    } else {
      setSelectedTable(tableID);
      localStorage.setItem("tableID", tableID);
      navigate(`/frontpannel`, { state: { data: tableID } });
    }
  }; 

  return (
    <div className="">
      <FrontPannelHeader />
      <section className="px-6 py-10 max-w-[1800px] mx-auto">
        <div className="mb-8">

            <h2 className="text-3xl sm:text-2xl font-serif font-semibold text-[#0A6637]">
              Table
            </h2>
         
          

          <div className="grid mt-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
            {tableData.map((item, index) => {
              const isSelected = customerData.some((customer) => customer.customerID == item.tableID);
              return (
                <div
                  key={index}
                  onClick={() => handleTable(item.tableID)}
                  className={`border ${isSelected ? "border-[#ED3820]" : "border-[#0FA814]"}  
                    } text-center w-[227px] h-[176px] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer group`}
                >
                  <img
                    src={item.image}
                    alt={`Table ${item.name}`}
                    className="p-4"
                  />
                  <div
                    className={`${isSelected ? "bg-[#FDEBE9]" : "bg-[#E7F6E8]"} 
                      } text-center py-3 transition-colors duration-300 group-hover:bg-[#EAFBEF]`}
                  >
                    <h3 className="text-base font-medium text-[#333]">
                      {item.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Table;
