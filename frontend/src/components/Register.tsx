import React, { useEffect } from 'react'
import {useRegisterMutation} from '../store'
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

interface FormType {
  email: string,
  password: string,
  name: string
}
const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormType>();
  const [Register , {isError,isLoading,isSuccess,data,error}] = useRegisterMutation<any>()
  const Redirect = useNavigate();

  const onSubmit: SubmitHandler<FormType> = (data) => {
    Register(data)
  };
  useEffect(()=>{
    if (isSuccess) {
      Redirect('/')
    }
},[isSuccess, isError, isLoading])
  return (
    <div className='vh-100 vw-100 d-flex justify-content-center align-items-center register-main'>
      <form onSubmit={handleSubmit(onSubmit)} className='register  px-4 py-3'>
        {isError && <span className='text-danger'>{error?.data.msg}</span>}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" {...register('name',{ required: true })} className="form-control" />
            {errors.name && <span className='text-danger'>This field is required</span>}
          </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" {...register('email',{ required: true }) } className="form-control" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          {errors.email && <span className='text-danger'>This field is required</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" {...register('password',{ required: true })} className="form-control" />
          {errors.password && <span className='text-danger'>This field is required</span>}
        </div>

        <button disabled={isLoading ? true : false} type="submit" className="btn btn-primary">Submit</button>
        <button disabled={isLoading ? true : false} type='button' onClick={()=>Redirect('/')} className='btn btn-primary ms-2'>Log In</button>
      </form>
    </div>
  )
}

export default Register