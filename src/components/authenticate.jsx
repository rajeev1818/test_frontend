import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




const Authenticate = () => {

    
    const navigate = useNavigate();
    const login = () => {
        
        window.location.href = "https://github.com/login/oauth/authorize?client_id=" + process.env.REACT_APP_CLIENT_IDE;
    }

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
 
 
        if(code){
             const getAccessToken = async() => {
                 const {data} = await axios.get("https://test-backend-uetn.onrender.com/api/auth/access_token?code=" + code);
                 
                 localStorage.setItem("AccessToken", data.token);
                 navigate("/repository")
             }
             getAccessToken();
             
        }
         
     }, [navigate]);


    return (
        <>
            <section className="bg-gray-50">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    
                    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Sign in to your Github Account
                            </h1>

                            <div className="space-y-4 md:space-y-6" >
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={login}
                            >
                            Sign In
                            </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

export default Authenticate;

