import React from 'react'
import { Link } from 'react-router-dom'
import { deleteMahasiswa, reset} from '../features/mahasiswa/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const DetailContent = ({mhs}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoading, isSuccess, isError} = useSelector((state)=>state.posts)

  const handleDelete = (id) =>{
      dispatch(deleteMahasiswa(id))
      
  }


  useEffect(()=>{
      if(isError){
        toast.error("error")
      }
      if(isSuccess){
        navigate("/mahasiswa")
        toast.success("delete successfully", {
          autoClose: 3000 // Menampilkan selama 4 detik (4000 milidetik)
        })

        setTimeout(() => {
          window.location.reload();
        }, 4000); // Refres
      }

      dispatch(reset())
  },[dispatch, isError, isSuccess, reset])
  

  return (
    <>
       <div className="mt-10 mx-auto container">
         <h1>Name :</h1>
         <p>{mhs.name}</p>
         <br />
         <h1>NIM :</h1>
         <p>{mhs.nim}</p>
         <br />
         <h1>Alamat :</h1>
         <p>{mhs.alamat}</p>
         <br />
         <h1>Prody :</h1>
         <p>{mhs.prody}</p>
         <br />
         <h1>jurusan :</h1>
         <p>{mhs.jurusan}</p>
         <Link to={'/mahasiswa'} className='text-blue-500 mt-4 inline-block'>Back to mahasiswa</Link>
         <br />
         <div className="flex gap-2 mt-3">
            <button onClick={()=>handleDelete(mhs.id)} className='px-4 py-2 bg-red-600 mr-2 text-white rounded-md' >Delete</button>
            <Link to={`/mahasiswa/update/${mhs.id}`}  className='px-4 py-2 bg-orange-600 mr-2 text-white rounded-md'>Update</Link>
         </div>
       </div>
    </>
  )
}

export default DetailContent