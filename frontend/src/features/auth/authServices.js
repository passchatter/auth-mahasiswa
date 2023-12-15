import axios from 'axios'



const BASE_URL = 'http://127.0.0.1:8000/api'

const register = async(userData) => {
    const config = {
        headers:{
            "Content-type": "application/json"
        }
    }

    const response = await axios.post(`${BASE_URL}/register/`, userData, config)

    return response.data

}


const login = async(userData) => {
    const config = {
       headers:{
        "Content-type": "application/json"
       }
    }

    const response = await axios.post(`${BASE_URL}/token/`, userData, config)

    if(response.data){
      localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data

}  


const getUserInfo = async (accessToken) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }

    const response = await axios.get("http://127.0.0.1:8000/api/profile/", config)

    return response.data
}


const logout = () => {
    return localStorage.removeItem("user")
}

const authServices = {register, login, getUserInfo, logout}

export default authServices