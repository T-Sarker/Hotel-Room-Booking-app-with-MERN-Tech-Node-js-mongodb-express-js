import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.css'


const LoginForm = () => {
    const navigate = useNavigate()

    const [logindata, setLogindata] = useState({
        email: undefined,
        password: undefined
    })

    const { dispatch, error } = useContext(AuthContext)

    const handelChange = (e) => {
        setLogindata((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handelLogin = async (e) => {

        e.preventDefault();

        dispatch({ type: 'LOGIN_START' })

        try {
            console.log(logindata)
            const res = await axios.post('/auth/login', logindata)

            if (res) {

                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
                navigate('/')
            }
        } catch (err) {
            console.log(err);
            dispatch({ type: 'LOGIN_FAILED', payload: err.response.data })
        }
    }


    return (
        <>
            <div className="LoginWraper my-4">
                <div className="container h-">
                    <div className="loginForm w-25">
                        <h4 className='my-4'>Login</h4>
                        {error && <span className='text-danger'>{error.msg}</span>}
                        <form>
                            <div className="mb-3">
                                <label htmlFor="email1" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email" onChange={handelChange} />
                            </div>


                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" onChange={handelChange} />
                            </div>

                            <button type="submit" onClick={handelLogin} className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginForm