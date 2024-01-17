import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useAxiosAuth from '../../utils/useAxiosAuth'
import { useStore } from '../../utils/store'
import { useNavigate } from 'react-router-dom'

export default function Createcampaign() {
    const axiosAuth = useAxiosAuth()
    const userData = useStore((state) => state.userData)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        movietitle: '',
        movieimg: null,
        organisername: '',
        moviedesc: '',
        about: '',
        movietype: '',
        genre: '',
        address: '',
        theatre: '',
        maplink: '',
        day: '',
        month: '',
        year: '',
        
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'movieimg' ? files[0] : value
        }))
    }

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault()

        try {
            const response = await axiosAuth.post('/movies', {
                data: {
                    movietitle: formData.movietitle,
                    moviedesc: formData.moviedesc,
                    about: formData.about,
                    movieimg: formData.movieimg,
                    organisername: formData.organisername,
                    movietype: formData.movietype,
                    genre: formData.genre,
                    address: formData.address,
                    theatre: formData.theatre,
                    maplink: formData.maplink,
                    day: formData.day,
                    month: formData.month,
                    year: formData.year,
                    type: 'movie',
                    userid: Number(userData.id)
                }
            })

            if (response.data) {
                toast.success('movie created successfully!', { position: toast.POSITION.TOP_RIGHT })
                // navigate(
                //     `/addtickets?eventid=${response.data.data.id}&eventname=${response.data.data.attributes.eventtitle}`
                // )
                navigate(`/movies`)
            } else {
                console.error('Failed to upload image')
                toast.error('Failed to create movie. Please try again.', { position: toast.POSITION.TOP_RIGHT })
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            toast.error('Error creating campaign. Please try again later.', { position: toast.POSITION.TOP_RIGHT })
        }
    }

    return (
        <div>
            <div className="container mx-auto mt-4">
                <h1 className="text-center text-2xl font-semibold mb-4">Create New Movie</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 space-x-3">
                    <div>
                        <div className="mb-4">
                            <div className="">
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type= "text"
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        name="movietitle"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="movieimg"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Organiser Name</label>
                            <div className="relative">
                                <textarea
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="organisername"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Movie type</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="movietype"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Genre</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="genre"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Theatre</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="theatre"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="address"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Map Link</label>
                            <div className="relative">
                                <input
                                    type="url"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="maplink"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                type="text"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="Moviedesc"
                                rows={4}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="day"
                                    placeholder="Enter the date of the movie"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Month</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="month"
                                    placeholder="Enter the first three letters of the month of the movie"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Year</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="year"
                                    placeholder="Enter the year of the movie"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-start gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm "
                        >
                            Create Movie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
