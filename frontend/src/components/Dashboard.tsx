import React, { useEffect } from 'react'
import { Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { useGetImagesQuery, useUploadImageMutation, useDeleteMutation } from '../store'
import { Image } from '@chakra-ui/react'
import {BsImages} from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
const Dashboard = () => {
    const { isError, isLoading, isSuccess, data, error,isUninitialized } = useGetImagesQuery<any>({ skip: 0, limit: 50 });
    const [uploadImage, { isError:IUE, isLoading:IUL, isSuccess:IUS, data:UD, errorUE}] = useUploadImageMutation<any>();
    const [deleteImage, { isError:IDE, isLoading:IDL, isSuccess:IDS, data:DD, errorDE}] = useDeleteMutation<any>();
    const redirect = useNavigate();
    const onSubmit= (e:any) =>{
        const data = e.target.files;
        if (Object.keys(data).length === 0) {
            console.log('no file choose');
        }
        const formData = new FormData();
        Object.values(data).forEach((file:any, index)=>{
            formData.append(String(index), file)
        })
        uploadImage(formData)

      };

      const deleteIMG = (id:string) =>{
            deleteImage(id)
      }

    useEffect(() => {
        if ( isError && error ) {
            window.alert(error.data.error)
                    redirect('/')
        }
    }, [isError])
    return (
        <div>
            {
                isLoading?
                    <div className='vh-100 vw-100 d-flex justify-content-center align-items-center'>
                        <CircularProgress isIndeterminate size={100} color='green.300' />
                    </div>
                    :
                    <div>
                        <nav className='py-2 px-4 d-flex justify-content-end border border-bottom border-2 border-light'>
                            <h1 className="position-absolute text-center start-0">Dashboard</h1>
                            <label htmlFor="upload-photo" className='btn btn-primary'>UPLOAD</label>
                            <input onChange={(e)=> onSubmit(e)} multiple type="file" name="photo" id="upload-photo" />
                        </nav>
                        <div className='d-flex justify-content-center px-3 pt-5'>
                        { 
                            isSuccess && 
                                (
                                    data ?
                                    ( data.data.length > 0 ?
                                        <div className='row gx-2 flex-wrap mx-auto'>
                                            {data.data?.map((file: any) => {
                                              return  <Box boxSize='sm' key={file.name}  className='position-relative box rounded-3 mx-2 my-2'>
                                                    <h6 className='text-dark text-center py-2 d-flex align-items-baseline'><BsImages className='me-2 ms-2'/>{file.tags[0]}</h6>
                                                    <Image src={`${file.url}`} width={150} height={150} alt='Image' />
                                                    <button className='bg-dark box-btn text-white rounded-circle position-absolute 'onClick={()=>deleteIMG(file.fileId)}>X</button>
                                                </Box>
                                            })}
                                        </div>
                                    :
                                    <h1 className='text-black-50 fw-bolder '>{data.msg}</h1>
                                    )
                                    :
                                    <h1 className='text-light fw-bolder '>SomeThing Wrong</h1>
                                )
                        }
                        </div>
                    </div>
            }
        </div>
    )
}

export default Dashboard