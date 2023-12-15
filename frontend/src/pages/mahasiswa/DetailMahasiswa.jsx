import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllDetail, detailError, detailStatus, detailMahasiswa } from '../../features/mahasiswa/detailMhsSlice'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DetailContent from '../../components/DetailContent'

const DetailMahasiswa = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const mhs = useSelector(selectAllDetail)
    const mhsStatus = useSelector(detailStatus)
    const error = useSelector(detailError)

    useEffect(()=>{
        dispatch(detailMahasiswa(id))
    },[dispatch])

    let content;
    if(mhsStatus === 'loading'){
        content = <p>"loading..."</p>
    }else if(mhsStatus === 'succeeded'){
        content = <DetailContent key={mhs.id} mhs={mhs}/>
    }else if(mhsStatus === 'failed'){
        content = <div className='text-center'><p>"error" {error}</p></div>
    }

  return (
   <>
   {content}
   </>
  )
}

export default DetailMahasiswa