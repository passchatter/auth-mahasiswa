import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllMahasiswa, selectAllStatus, selectAllError, fetchMahasiswa } from '../../features/mahasiswa/mahasiswaSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


const MahasiswaList = () => {
  const dispatch = useDispatch()
  const mahasiswa = useSelector(selectAllMahasiswa)
  const mahasiswaStatus = useSelector(selectAllStatus)
  const error = useSelector(selectAllError)
   
  useEffect(()=>{
    if(mahasiswaStatus === 'idle'){
        dispatch(fetchMahasiswa())
    }
  },[dispatch, mahasiswaStatus])

  let content
  if(mahasiswaStatus === 'loading'){
     content = <div className="text-center"><p>"loading..."</p></div>
  }else if(mahasiswaStatus === 'succeeded'){
    content =  <div className="container mt-10">
    <h1 className='mt-10 mb-8 text-black text-xl font-semibold'>Mahasiswa List</h1>
    <Link to='/mahasiswa/add/' className='px-6 py-3 bg-green-600 mr-2 text-white rounded-md'>Add+</Link>
    <table class="min-w-full divide-y divide-gray-400 mt-9">
    <thead>
        <tr>
            <th class="px-6 py-4 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                Name
            </th>
            <th class="px-6 py-4 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                NIM
            </th>
        </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
       {mahasiswa.map((mhs, index)=>{
        return (
            <tr key={index} className='border-b p-2 border-slate-200'>
                <td className='px-6 py-4'><Link to={`detail/${mhs.id}`}>{mhs.name}</Link></td>
                <td className='px-6 py-4'>{mhs.nim}</td>
           </tr>
        )
       })}
    </tbody>
</table>

    </div>
  } else if(mahasiswaStatus === 'failed'){
    content = <div className='text-center'><p>error : {error}</p></div>
  }


  return (
    <>
       {content}
    </>
  )
}

export default MahasiswaList