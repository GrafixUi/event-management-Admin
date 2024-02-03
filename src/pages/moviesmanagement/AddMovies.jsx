import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useAxiosAuth from '../../utils/useAxiosAuth'
import { useStore } from '../../utils/store'
import { useNavigate } from 'react-router-dom'

export default function Createcampaign() {
    const axiosAuth = useAxiosAuth()
    const [imageUrl, setImageUrl] = useState(null)
    const userData = useStore((state) => state.userData)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        movietitle: '',
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
        seatsio_publickey: '',
        seatsio_eventkey: '',
        redcircle_price: '',
        pinkcircle_price: '',
        orangecircle_price: ''
    })

    async function handleImageUpload(e) {
        console.log(e.target.files[0])
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const formData = new FormData()
        await formData.append('files', e.target.files[0])
        console.log("okay",formData)   
        try {
            const res = await axiosAuth.post('/upload', formData, config)
            if(res.status === 200){
                setImageUrl(res.data[0].url)
            }
            else{
                console.log("Tried uploading, Error in uploading image")
            }
        } catch (err) {
            console.log(err)
        }
    }


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
        if(imageUrl === null){
            alert("Please upload an image")
            return
        }

        try {
            const response = await axiosAuth.post('/movies', {
                data: {
                    movietitle: formData.movietitle,
                    moviedesc: formData.moviedesc,
                    about: formData.about,
                    movieimg: imageUrl,
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
                    userid: Number(userData.id),
                    seatsio_eventkey: formData.seatsio_eventkey,
                    seatsio_publickey: formData.seatsio_publickey,
                    redcircle_price: formData.redcircle_price,
                    pinkcircle_price: formData.pinkcircle_price,
                    orangecircle_price: formData.orangecircle_price
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
                                        type="text"
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        name="movietitle"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
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
                                    required
                                />
                            </div>
                        </div>
                        {/* <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Movie type</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="movietype"
                                    required
                                />
                            </div>
                        </div> */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Genre</label>
                            <div className="relative">
                                {/* <input
                                    type="text"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="genre"
                                    required
                                /> */}

                                <select
                                    onChange={handleChange}
                                    name="genre"
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                >
                                    <option value="Action">Action</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Crime">Crime</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Fantasy">Fantasy</option>
                                    <option value="Historical">Historical</option>
                                    <option value="Historical fiction">Historical fiction</option>
                                    <option value="Horror">Horror</option>
                                    <option value="Magical realism">Magical realism</option>
                                    <option value="Mystery">Mystery</option>
                                    <option value="Paranoid">Paranoid</option>
                                    <option value="Philosophical">Philosophical</option>
                                    <option value="Political">Political</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Saga">Saga</option>
                                    <option value="Satire">Satire</option>
                                    <option value="Science fiction">Science fiction</option>
                                    <option value="Social">Social</option>
                                    <option value="Speculative">Speculative</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="Urban">Urban</option>
                                    <option value="Western">Western</option>
                                </select>
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
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="address"
                                    required
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
                                    required
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
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="day"
                                    placeholder="Enter the date of the movie"
                                    required
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
                                    required
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
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Seats.io Public Key</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="seatsio_publickey"
                                    placeholder="Enter the Seats IO Public API Key"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Seats.io Event Key</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="seatsio_eventkey"
                                    placeholder="Enter the Seats IO Event API Key"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Price of Red Circle</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="redcircle_price"
                                    placeholder="Enter the Price of red Circle Seats"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Price of Pink Circle</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="pinkcircle_price"
                                    placeholder="Enter the Price of pink Circle Seats"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Price of Orange Circle</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="orangecircle_price"
                                    placeholder="Enter the Price of orange Circle Seats"
                                    required
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
