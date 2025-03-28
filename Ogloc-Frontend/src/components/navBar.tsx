import React, { useState } from "react";

import Logo from "../assets/Ogloc logo 2.png"

import { useEffect } from "react";

import axios from "axios";

import { Flame, Activity, Trophy } from "lucide-react";

import UserButton from "./userButton";
import { useNavigate } from "react-router-dom";

import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface UserInfo {
    name:string
    username:string
    exp:number,
    dias:number,
    ranking:number

}


const NavBar: React.FC = () => {

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("auth");


    useEffect(()=>{


        const userInfoRequest = async () => {


            try {

                const userInfoRes = await axios.post<UserInfo>("http://localhost:8000/userInfo",
                                        {},
                                         { params: {
                                        id:userId,
                                    }})

                setUserInfo(userInfoRes.data);
                localStorage.setItem('userInfo', JSON.stringify(userInfoRes.data));



                setLoading(false);
    
    
            }
    
            catch (error) {
    
                console.log(error)
    
            }
    
        }



       userInfoRequest();

       

    },[])



    return (

        <div className="flex flex-row gap-3 justify-between min-w-full py-2 items-center shadow-md shadow-gray-500">
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <h1 className="ml-10 text-2xl whitespace-normal text-white cursor-pointer p-2" onClick={() => navigate("/")}> English <br /> &emsp;  with Ogloc</h1>

            <div className="flex flex-row gap-8 items-center">
                

                <div className="flex flex-row gap-2 items-center">

                    <Activity className="text-orange-500"/>
                    <span className="text-white font-semibold">
                        {loading ? (<Skeleton width={50} />) : (`${userInfo?.exp} exp`)}
                    </span>
                </div>

                <div className=" flex flex-row gap-2">

                    <Flame className="text-orange-500"/>
                    <span className="text-white font-semibold">

                    {loading ? (
                        <Skeleton width={50} />) : (
                            `${userInfo?.dias} Dias`
                        )}

                    </span>
                </div>

                <div className=" flex flex-row gap-2">

                    <Trophy className="text-orange-500"/>
                    <span className="text-white font-semibold">

                        {loading ? (
                            <Skeleton width={50}/>
                        ) 
                        : (
                            `# ${userInfo?.ranking}`
                        )}

                    </span>
                </div>
                
   
                
            </div>

        
            <div className="flex flex-row gap-5 items-center mx-10">

            <span className="text-white  text-lg"> 
                
                {loading ? (

                    <Skeleton width={70} />

                ) : (
                    userInfo?.username
                )} 
            
            </span>
            
            <UserButton></UserButton>

            </div>

            </SkeletonTheme>
           


        

        </div>
    )



}



export default NavBar;