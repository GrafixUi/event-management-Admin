import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { FiEye } from 'react-icons/fi'
import axios from 'axios'
import { toast } from 'react-toastify'
import  {useStore}  from '../../utils/store'

export default function Login() {
    const navigate = useNavigate()
    const setIsAuthenticated = useStore((state) => state.setIsAuthenticated)
    const setJWT = useStore((state) => state.setJwt)
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name, value)
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.identifier || !formData.password) {
            toast.error('identifier and password are required.')
            return
        }
        const { identifier, password } = formData
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKENDURL}/auth/local`, {
                identifier,
                password
            })

            if (response.status === 200) {
                setJWT(response.data.jwt)
                setIsAuthenticated(true)
                navigate('/events')
            } else {
                console.error('login failed')
            }
        } catch (error) {
            console.error('Error during login:', error)
        }
    }

    return (
        <div className=" login-main">
            <div className="authentication-wrapper authentication-basic ">
                <div className="authentication-inner py-4">
                    <div className="card">
                        <div className="card-body card-custom">
                            <div className="flex flex-col text-center justify-center align-items-center gap-2">
                                <img src={logo} alt="" className=" w-56 p-4" />
                            </div>
                            <p className="mb-4 text-center text-sm text-white">Organiser</p>
                            <form id="formAuthentication" className="mb-3 text-sm" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-white">
                                        Username or Email
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control placeholder:text-sm placeholder:opacity-25"
                                        id="identifier"
                                        name="identifier"
                                        value={formData.identifier}
                                        onChange={handleChange}
                                        placeholder="Enter your username or email"
                                        autoFocus
                                    />
                                </div>
                                <div className="mb-3 form-password-toggle">
                                    <div className="d-flex justify-content-between ">
                                        <label className="form-label text-white" htmlFor="password">
                                            Password
                                        </label>
                                    </div>
                                    <div className="input-group input-group-merge">
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control placeholder:text-sm placeholder:opacity-25"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your Password"
                                            aria-describedby="password"
                                        />
                                        <span className="input-group-text cursor-pointer">
                                            <FiEye />
                                        </span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <Link to="">
                                        <small>Forgot Password?</small>
                                    </Link>
                                </div>
                                <div className="mb-3 flex justify-center">
                                    <button
                                        className="bg-green-600 rounded-lg p-2 text-white text-center w-52"
                                        type="submit"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>

                            <p className="text-center text-sm">
                                <span className=" text-white">New on our platform?</span>
                                <Link to="/register">
                                    <span className="cursor-pointer"> Create an account</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
