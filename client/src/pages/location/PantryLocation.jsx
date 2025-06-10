import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
// import image3 from "../../images/image 3.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";
function PantryLocation() {
  const navigate = useNavigate();
  const [pantryData, setPantryData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  
  const AddNewLocation = () => {
    navigate("/location/addnewlocation");
  };
  const handleLocationEdit = (id) => {
    const dataTOEdit = pantryData.find((data)=>data._id===id)
    navigate("/location/editlocation",{state:{data:dataTOEdit}});
  };

  const fetchNewLocation = async () => {
    try {
      const res = await axios.get("https://poskartik.onrender.com/api/getlocation");
      setPantryData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNewLocation();
  }, []);

  const filterProduct = pantryData.filter((sub) => {
    return (
      sub.address1.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.address2.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.city.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.state.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.productbrand.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.concernPerson.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.latitude.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.contact.toLowerCase().includes(inputValue.toLowerCase()) ||
      sub.longitude.toLowerCase().includes(inputValue.toLowerCase())||
      sub.table.toLowerCase().includes(inputValue.toLowerCase())
    );
  });
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 w-full min-w-0 flex flex-col bg-[#F3F7F9]">
        <Header name="PantryLocation" setInputValue={setInputValue} />
        <section className="m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0">
          <div className="text-base max-xl:text-sm font-medium flex items-center gap-3 justify-end">
            <button
              onClick={AddNewLocation}
              className="px-4 cursor-pointer py-2 max-2xl:px-3 max-2xl:py-1 bg-[#0A6637] rounded-lg text-white flex items-center gap-3"
            >
              <i className="fa-solid fa-circle-plus"></i>Add New
            </button>
          </div>

          <section className="grid grid-cols-3 max-xl:grid-cols-2 gap-4 max-xl:gap-3 mt-3">
            {filterProduct.map((pantry) => (
              <div
                key={pantry._id}
                className="w-full min-h-[410px] border rounded-2xl p-4 border-[#D8D8D8] "
              >
                <div className="border-b border-[#D8D8D8] pb-2 flex justify-between">
                  <h2 className="text-xl max-2xl:text-base font-medium text-[#202020]">
                    {pantry.pantryName}
                  </h2>
                  <div className="flex items-center">
                    <button className="mr-2" onClick={()=>handleLocationEdit(pantry._id)}>
                      <i className="fa-regular fa-pen-to-square text-[#9A9A9A] cursor-pointer"></i>
                    </button>
                    <button>
                      <i className="fa-regular fa-trash-can text-[#9A9A9A] cursor-pointer"></i>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-2 text-sm max-xl:text-xs text-[#202020]">
                  <div>
                    <iframe
                      src={pantry.map}
                      loading="lazy"
                      width="100%"
                      height="200"
                    ></iframe>
                  </div>
                  <div className="">
                    <p className=" font-medium">Address : </p>
                    <p className="font-light">
                      {pantry.address1},{pantry.address2},{pantry.city},
                      {pantry.state}
                    </p>
                  </div>
                  <div className="no-grid-between grid grid-cols-2 gap-10">
                    <div>
                      <p className="font-medium">Concern Person :</p>
                      <p className="font-light">{pantry.concernPerson}</p>
                    </div>
                    <div>
                      <p className="font-medium">Latitude :</p>
                      <p className="font-light">{pantry.latitude}</p>
                    </div>
                  </div>
                  <div className="no-grid-between grid grid-cols-2 gap-10">
                    <div>
                      <p className="font-medium">Contact Number :</p>
                      <p className="font-light">{pantry.contact}</p>
                    </div>
                    <div>
                      <p className="font-medium">Longitude :</p>
                      <p className="font-light">{pantry.longitude}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </section>
      </main>
    </div>
  );
}

export default PantryLocation;
