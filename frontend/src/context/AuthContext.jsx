import { createContext, useContext, useEffect, useState } from "react";

const AuthContext=createContext();

export function AuthProvider({children}){

    const[user,setUser]=useState(null);

    const[token,setToken]=useState(
        localStorage.getItem("token")
    );

    useEffect(()=>{

        if(token){

            localStorage.setItem("token",token);

        }

    },[token]);

    const login=(userData,jwt)=>{

        setUser(userData);

        setToken(jwt);

    };

    const logout=()=>{

        setUser(null);

        setToken(null);

        localStorage.removeItem("token");

    };

    return(

        <AuthContext.Provider
        value={{
            user,
            token,
            login,
            logout
        }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export const useAuth=()=>useContext(AuthContext);