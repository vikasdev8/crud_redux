import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
interface FormType {
  password: string,
  user: string
}
const Login = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormType>();
  const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);
  return (
    <div className=''>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit" className="btn btn-primary">Submit</button>

      </form>
    </div>
  )
}

export default Login