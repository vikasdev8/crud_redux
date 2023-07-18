import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";

interface FormType {
  email: string,
  password: string,
  name: string
}
const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormType>();
  const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);
  return (
    <div className=''>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit" className="btn btn-primary">Submit</button>

      </form>
    </div>
  )
}

export default Register