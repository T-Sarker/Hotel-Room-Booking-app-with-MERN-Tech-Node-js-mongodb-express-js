import React from 'react'
import './register.css'

const RegisterForm = () => {
    return (

        <>
            <div className="RegisterWraper my-4">
                <div className="container h-">
                    <div className="registerForm w-25">
                        <h4 className='my-4'>Register</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">User Name</label>
                                <input type="text" className="form-control" id="username" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email1" />
                            </div>


                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input type="text" className="form-control" id="city" />
                                </div>
                                <div className="col">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="tel" className="form-control" id="phone" />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control" id="address" />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default RegisterForm