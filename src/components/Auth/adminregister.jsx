import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { FiEye } from 'react-icons/fi'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function AdminRegister() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
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
        if (!formData.username || !formData.password || !formData.email) {
            alert('All fields are required')
        }
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKENDURL}/auth/local/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (response.ok) {
                try{
                    const updateId = await axios.put(`${process.env.REACT_APP_BACKENDURL}/users/${data.user.id}`, {
                        role: 2
                    })
                    console.log(updateId)
                    if(updateId.status === 200){
                        toast.success('Registration successful')
                        navigate('/')
                    }
                    else{
                        toast.error('Registration failed, Try Again')
                    }
                }
                catch(err){
                    toast.error(err.message)
                }    
            } else {
                toast.error(data.error.message)
            }
        } catch (error) {
            console.error('Error during registration:', error)
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
                            <p className="mb-4 p-3 text-center text-sm text-white">Admin register</p>
                            <form id="formAuthentication" className="mb-3 text-sm" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label text-white">
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

                                <div className="mb-3">
                                    <label htmlFor="" className="form-label text-white">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control placeholder:text-sm placeholder:opacity-25"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        autoFocus
                                    />
                                </div>

                                <div className="mb-3 form-password-toggle">
                                    <div className="d-flex justify-content-between ">
                                        <label className="form-label text-white" htmlFor="password">
                                            Create Password
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
                                <div className="mb-3 flex justify-center">
                                    <button
                                        className="bg-green-600 rounded-lg p-2 text-white text-center w-52"
                                        type="submit"
                                    >
                                        Register
                                    </button>
                                </div>
                            </form>

                            <p className="text-center text-sm">
                                <span className=" text-white">Have an account?</span>
                                <Link to="/">
                                    <span className="cursor-pointer"> Login here</span>
                                </Link>
                            </p>
                            <p className="text-center text-sm">
                                <Link to="/register">
                                    <span className="cursor-pointer"> Click here </span>
                                </Link>
                                <span className=" text-white">for Organiser register</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
