import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FrontPannelHeader from '../../components/FrontPannelHeader'
import { useNavigate } from 'react-router-dom'
function FrontPannel() {
    const navigate = useNavigate()
    const [categorie, setCategorie] = useState([])
    console.log(categorie)
    const fetchCategorie = async () => {
        const response = await axios.get("http://localhost:3000/api/getcategorie")
        setCategorie(response.data)
    }
    useEffect(() => {
        fetchCategorie()
    }, [])

    const handleCategorie=(id)=>{
      const dataToEdit = categorie.find((data) => data._id === id)
      navigate("/frontpannel/selectcategorie", { state: { data: dataToEdit } })
    }
    return (
        <div className=''>
            <FrontPannelHeader />
            <section className="px-6 py-10 max-w-[1800px] mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl sm:text-2xl font-serif font-semibold text-[#0A6637]">
                        Categories
                    </h2>
                </div>
  
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                    {categorie.map((product, index) => (
                        <div
                            key={index}
                            onClick={()=>handleCategorie(product._id)}
                            className="border border-[#D8D8D8] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#0FA814] cursor-pointer group"
                        >
                            <img
                                src={product.categorieImage}
                                alt={product.categorieName}
                                className="w-full h-50 object-cover"
                            />
                            <div className="bg-[#F3F3F3] text-center py-3 transition-colors duration-300 group-hover:bg-[#EAFBEF]">
                                <h3 className="text-base font-medium text-[#333] group-hover:text-[#0FA814]">
                                    {product.categorieName}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default FrontPannel