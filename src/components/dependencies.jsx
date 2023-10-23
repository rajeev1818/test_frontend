import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom"
import Loader from "./loader";





const Dependencies = () => {

    const [params]= useSearchParams();
    const [requestString, setRequestedString] = useState([]);
    const [loading, setLoading] = useState(false);


    const repo = params.get("repo");
    const owner = params.get("owner");
    const navigate = useNavigate();
    


    const fetchContent = async(token) => {
        try {
            setLoading(true);
            const {data} = await axios.get(`https://test-backend-uetn.onrender.com/api/parser/dependencies?repo=${repo}&owner=${owner}`, {
                headers: {
                    Authorization: token
                }
            })

            if(data.status){
                setRequestedString(data.parsed_string)
            }
            
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    

    useEffect(() => {
        const token = localStorage.getItem("AccessToken");
       if(!token){
            navigate("/");
       }
        fetchContent(token);  
    },[])

    return (
        <div className="p-8 shadow">
            
            {
                loading ?
                 <Loader /> 
                 :
                 <>
                <h2 className="mb-2 text-2xl font-semibold text-gray-900 text-start mb-5" >
                Dependencies
            </h2>
            <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside text-start">
                {
                    requestString.length === 0 ?
                    <p>No xml file found in this repository</p>
                    :
                    requestString.map((each, index) => (
                        <li key={index}>
                            {each}
                        </li>
                    ))
                }
                
                
            </ul>
            </>
            }

        </div>
    )
}


export default Dependencies;