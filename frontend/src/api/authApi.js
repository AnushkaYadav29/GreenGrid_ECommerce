import API from "./axios";

export const registerUser=(data)=>API.post("/auth/register",data);

export const loginUser=(data)=>API.post("/auth/login",data);

export const forgotPassword=(email)=>API.post("/auth/forgot-password",{email});

export const resetPassword=(token,password)=>
API.put(`/auth/reset-password/${token}`,{password});