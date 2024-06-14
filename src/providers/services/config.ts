
import axios from 'axios'
// const BASE_URL = "http://192.168.1.28:8000"
const BASE_URL = "https://flab-mangement.onrender.com"

// export const axiosPublic = axios.create({
//     baseURL: "http://localhost:3333/api",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

axios.defaults.baseURL = BASE_URL

axios.defaults.withCredentials=false;

export  function setToken(token: string |null): void{
    if(token){
        axios.defaults.headers.common.Authorization = token? `Bearer ${token}` : "";
    }

}