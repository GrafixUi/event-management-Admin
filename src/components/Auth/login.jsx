import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { FiEye } from 'react-icons/fi'
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (!formData.username || !formData.password) {
            console.error('Username and password are required.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData)

            if (response.status === 200) {
               console.log("logged In");
               navigate('/dashboard');
            } else {
                console.error('login failed')
            }
        } catch (error) {
            console.error('Error during login:', error)
        }
    };

    return (
        <div className=" login-main">
            <div className="authentication-wrapper authentication-basic ">
                <div className="authentication-inner py-4">
                    <div className="card">
                        <div className="card-body card-custom">
                            <div className="flex flex-col text-center justify-center align-items-center gap-2">
                                <img src={logo} alt="" className=" w-56 p-4" />
                               
                            </div>
                            <p className="mb-4 text-center text-sm text-white">
                                Admin Panel
                            </p>
                            <form id="formAuthentication" className="mb-3 text-sm" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label text-white">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control placeholder:text-sm placeholder:opacity-25"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter your username"
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
                                <span className=' text-white'>New on our platform?</span>
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
