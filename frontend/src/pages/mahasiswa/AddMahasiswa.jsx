import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addMahasiswa, reset } from '../../features/mahasiswa/postsSlice'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'

const AddMahasiswa = () => {

    const [formData, setFormData] = useState({
        "name":"",
        "nim":"",
        "alamat":"",
        "prody":"",
        "jurusan":""
    })

    const {name, nim, alamat, prody, jurusan} = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {isLoading, isSuccess, isError} = useSelector((state)=>state.posts)

    const handleChange = (e) => {
         setFormData((prev)=>({
            ...prev,
            [e.target.name]: e.target.value
         }))
    }


    const handleSubmit = (e) =>{
        e.preventDefault()
        const addData = {
            name,
            nim,
            alamat,
            prody,
            jurusan
        }

        dispatch(addMahasiswa(addData))
    }

    useEffect(()=>{
        if(isError){
           toast.error("error add mahasiswa")
        }

        if(isSuccess){
            navigate("/mahasiswa")
            toast.success("mahasiswa successfully created", {
              autoClose: 3000 // Menampilkan selama 4 detik (4000 milidetik)
            })
    
            setTimeout(() => {
              window.location.reload();
            }, 4000); // Refres
        }

        dispatch(reset())
    }, [isError, isSuccess, reset, dispatch])

  return (
    <>
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Mahasiswa</h2>
         {isLoading && <Spinner />}
    
         <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nim" className="block text-gray-700">nim</label>
            
            <input
              type="number"
              id="nim"
              name="nim"
              value={nim}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="alamat" className="block text-gray-700">alamat</label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={alamat}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="prody" className="block text-gray-700">prody</label>
            <input
              type="text"
              id="prody"
              name="prody"
              value={prody}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jurusan" className="block text-gray-700">jurusan</label>
            <input
              type="text"
              id="jurusan"
              name="jurusan"
              value={jurusan}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add+
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default AddMahasiswa