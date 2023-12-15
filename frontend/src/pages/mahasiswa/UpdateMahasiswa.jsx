import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailMahasiswa, updateMahasiswa, reset } from '../../features/mahasiswa/detailMhsSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/Spinner'
import { toast } from 'react-toastify'
const UpdateMahasiswa = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {id} = useParams()
    const mahasiswaDetail = useSelector((state) => state.mhs.mhs);
    const {isLoading, isError, isSuccess} = useSelector((state)=>state.mhs)
    const [data, setData] = useState({
        name:'',
        nim:'',
        alamat:'',
        prody:'',
        jurusan:''
    })

    useEffect(()=>{
       dispatch(detailMahasiswa(id))
       return () => {
        dispatch(reset());
      };
    }, [dispatch, id])


    useEffect(() => {
        setData({
          name: mahasiswaDetail.name || '',
          nim: mahasiswaDetail.nim || '',
          alamat: mahasiswaDetail.alamat || '',
          prody: mahasiswaDetail.prody || '',
          jurusan: mahasiswaDetail.jurusan || '',
        });
      }, [mahasiswaDetail]);

    const handleChange = (e) => {
        setData((prev)=>({
           ...prev,
           [e.target.name]: e.target.value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateMahasiswa({ id, data: data }));
    };


  useEffect(()=>{
        if(isError){
        toast.error("error add mahasiswa")
        }

        if(isSuccess){
            navigate("/mahasiswa")
            toast.success("mahasiswa successfully updated", {
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
              value={data.name}
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
              value={data.nim}
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
              value={data.alamat}
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
              value={data.prody}
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
              value={data.jurusan}
              onChange={handleChange}
              className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            update
          </button>
        </form>
      </div>
    </div>
   </>
  )
}

export default UpdateMahasiswa