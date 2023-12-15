import axios from "axios";

const MAHASISWA_URL = 'http://127.0.0.1:8000/api/list/mahasiswa/'

const listMahasiswa = async(accessToken) =>{
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    const response = await axios.get(MAHASISWA_URL, config)
    return response.data
}

const detailMahasiswa = async({id, accessToken})=>{
    const config = {
        headers:{
            "Content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    }
    const response = await axios.get(`${MAHASISWA_URL}detail/${id}/`, config)
    return response.data
}

const postsMahasiswa = async({addData, accessToken})=>{
    const config = {
        headers:{
            "Content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    }
    const response = await axios.post(`${MAHASISWA_URL}add/`,addData, config)
    return response.data
}

const deleteMahasiswa = async({id, accessToken})=>{
    const config = {
        headers:{
            "Authorization": `Bearer ${accessToken}`
        }
    }
    const response = await axios.delete(`${MAHASISWA_URL}delete/${id}/`, config)
    return response.data
}

const update = async({id, data, accessToken})=>{
    const config = {
        headers:{
            "Content-type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    }
    const response = await axios.patch(`${MAHASISWA_URL}update/${id}/`, data, config)
    return response.data
}


const mhsServices = {listMahasiswa, detailMahasiswa, postsMahasiswa, deleteMahasiswa, update}

export default mhsServices