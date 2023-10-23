import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import Loader from "./loader";


const RepositoryList = () => {
    
    const [repositories, setRepositories] = useState([]);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const fetchUserRepositories = async(token) => {
        try {
            setLoading(true);
            const {data} = await axios.get("https://test-backend-uetn.onrender.com/api/parser/repo", {
                headers: {
                    Authorization: token
                }
            })

            setRepositories(data.repo_list);
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
        fetchUserRepositories(token);    
    }, [navigate]);


    return (
        
            <div className="p-12">

                <h1 className="text-start text-3xl mb-5">Repositories</h1>

                {
                    loading ?
                    <Loader />
                    :
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Repository Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Created At
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                            repositories.map((each) => (
                                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {each.name}
                                </th>
                                <td className="px-6 py-4">
                                    {dayjs(each.created_at).format("DD-MM-YYYY")}
                                </td>
                                
                                <td className="px-6 py-4">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                    onClick={() => navigate(`/dependencies?owner=${each.owner.login}&repo=${each.name}`)}
                                >
                                    View Dependencies
                                </button>
                                </td>
                            </tr>
                            ))
                            
                            }
                        </tbody>
                    </table>
                </div>
                }
            </div>
        
    )
}


export default RepositoryList;
