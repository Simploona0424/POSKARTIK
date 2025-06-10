import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
function AddNewLocation() {
  const navigate = useNavigate();
  const allStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const [selectstate] = useState(allStates);
  const [pantryName, setPantryName] = useState("");
  const [concernPerson, setConcernPerson] = useState("");
  const [contact, setContact] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [map, setMap] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [table, setTable] = useState("");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://poskartik.onrender.com/api/addlocation", {
        pantryName,
        concernPerson,
        contact,
        address1,
        address2,
        state,
        city,
        pincode,
        map,
        latitude,
        longitude,
        table
      });
      navigate("/location");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 w-full min-w-0 flex flex-col bg-[#F3F7F9]">
        <Header name="PantryLocation" />
        <section className="m-5 flex-1 bg-white border-2 border-gray-200 rounded-b-xl p-8 mt-0 ">
          <div className="flex justify-end">
            <NavLink
              to="/location"
              className="cursor-pointer px-4 py-1 flex justify-center items-center gap-2 rounded-lg bg-[#0A6637] text-white"
            >
              <i className="fa-solid fa-left-long"></i>
              Back
            </NavLink>
          </div>
          <h2 className="text-base max-xl:text-sm text-[#505050]">
            Pantry Location / <span className="text-[#0A6637]">Create</span>
          </h2>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-5 mt-5 py-6 px-4 border border-gray-200 shadow rounded-xl"
          >
            <div className="bg-[#F6F6F6] px-4 py-5 rounded-lg">
              <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-3">
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Pantry Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    name="pantryName"
                    required
                    placeholder="Enter Pantry Name"
                    value={pantryName}
                    onChange={(e) => setPantryName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Concern Person <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    name="concernPerson"
                    required
                    placeholder="Enter Concern Person Name"
                    value={concernPerson}
                    onChange={(e) => setConcernPerson(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Contact No. <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    name="contact"
                    required
                    placeholder="Enter Contact No."
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Address Line 1 <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    required
                    name="address1"
                    placeholder="Enter Address"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Address Line 2 <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    required
                    name="address2"
                    placeholder="Enter Address"
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    State <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={state}
                    required
                    onChange={(e) => setState(e.target.value)}
                    className="border px-3 py-[0.25rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    id="State"
                  >
                    <option value="">-- Select State --</option>
                    {Array.isArray(selectstate) &&
                      selectstate.map((state) => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    City <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    required
                    name="city"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Pincode <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    required
                    name="pincode"
                    placeholder="Enter Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Google Map Link <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    name="map"
                    required
                    placeholder="Attach Google Map Link"
                    value={map}
                    onChange={(e) => setMap(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Latitude <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    required
                    name="latitude"
                    placeholder="Enter Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Longitude <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="text"
                    required
                    name="longitude"
                    placeholder="Enter Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
                <div>
                  <label className="font-normal text-[#202020] text-sm max-xl:text-xs">
                    Seating Area <span className="text-red-600">*</span>
                  </label>
                  <input
                    className="border px-3 py-[0.35rem] text-sm max-xl:text-xs font-normal text-black bg-white mt-1 w-full rounded-md border-[#d8d8d8] focus:outline-none focus:ring-1"
                    type="number"
                    required
                    name="table"
                    placeholder="Enter Total Number of Tables "
                    value={table}
                    onChange={(e) => setTable(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 max-2xl:px-3 max-2xl:py-1 bg-[#0A6637] text-base max-xl:text-sm font-medium text-white cursor-pointer rounded-lg"
              >
                Add New
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AddNewLocation;
