import axios from 'axios'
import { getAccessTokenFromCookie } from "../components/CookieUtils.js";
const instance=axios.create({
    baseURL:"http://localhost:5555",
    timeout:10000,
    headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${getAccessTokenFromCookie()}`,
    }
})

export default instance
