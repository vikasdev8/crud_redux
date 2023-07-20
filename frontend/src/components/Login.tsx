import React, {useEffect} from 'react'
import {useLoginMutation} from '../store';
import { useForm, SubmitHandler } from "react-hook-form";
import {useNavigate} from 'react-router-dom';
interface FormType {
  password: string,
  user: string
}

const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormType>();
  const [Login , {isError,isLoading,isSuccess,data,error}] = useLoginMutation<any>()
  const Redirect = useNavigate();
  const onSubmit: SubmitHandler<FormType> = (data) =>{
    Login(data).unwrap().then((res)=>{
      Redirect('/dashboard')
    })
  };

  useEffect(()=>{
      if (isSuccess) {
        Redirect('/dashboard')
      }
      if (isError) {
        console.log('check[23]',error);
      }
  },[isSuccess, isError, isLoading])

  return (
    <div  className='vh-100 vw-100 d-flex justify-content-center align-items-center login-main'>
      <form onSubmit={handleSubmit(onSubmit)} className='login  px-4 py-3'>
            { isError && <span className='text-danger'>{error?.data.msg}</span> }
          <div className="mb-3">
            <label className="form-label">User</label>
            <input type="text" placeholder='user name / email address' {...register('user',{ required: true })} className="form-control" />
            {errors.user && <span className='text-danger'>This field is required</span>}
          </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" {...register('password',{ required: true })} className="form-control" />
          {errors.password && <span className='text-danger'>This field is required</span>}
        </div>

        <button disabled={isLoading ? true : false} type="submit" className="btn btn-primary">Submit</button>
        <button disabled={isLoading ? true : false} type='button' onClick={()=>Redirect('/Register')} className='btn btn-primary ms-2'>Sing Up</button>
      </form>
    </div>
  )
}

export default Login