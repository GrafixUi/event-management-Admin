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
    const [imageUrl, setImageUrl] = useState(null)

    const [formData, setFormData] = useState({
        eventtitle: '',
        organisername: '',
        description: '',
        domaintype: 'Musical',
        category: '',
        address: '',
        locationname: '',
        mapurl: '',
        day: '',
        month: '',
        year: ''
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
        const { name, value } = e.target

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault()
        if(imageUrl === null){
            alert ("Please upload an image")
            return
        }

        try {
            const response = await axiosAuth.post('/events', {
                data: {
                    eventtitle: formData.eventtitle,
                    eventimg: imageUrl,
                    organisername: formData.organisername,
                    description: formData.description,
                    domaintype: formData.domaintype,
                    category: formData.category,
                    address: formData.address,
                    locationname: formData.locationname,
                    mapurl: formData.mapurl,
                    day: formData.day,
                    month: formData.month,
                    year: formData.year,
                    type: 'event',
                    userid: Number(userData.id)
                }
            })

            if (response.data) {
                toast.success('Event created successfully!', { position: toast.POSITION.TOP_RIGHT })
                // navigate(
                //     `/addtickets?eventid=${response.data.data.id}&eventname=${response.data.data.attributes.eventtitle}`
                // )
                navigate(`/events`)
            } else {
                console.error('Failed to upload image')
                toast.error('Failed to create campaign. Please try again.', { position: toast.POSITION.TOP_RIGHT })
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            toast.error('Error creating campaign. Please try again later.', { position: toast.POSITION.TOP_RIGHT })
        }
    }

    return (
        <div>
            <div className="container mx-auto mt-4">
                <h1 className="text-center text-2xl font-semibold mb-4">Create New Event</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 w-full space-x-3">
                    <div>
                        <div className="mb-4">
                            <div className="">
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        name="eventtitle"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Upload AD Image</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="eventimg"
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
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Domain</label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="domaintype"
                                    onChange={handleChange}
                                >
                                    <option value="Musical">Musical</option>
                                    <option value="Dance">Dance</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Meet Ups">Meet Ups</option>
                                    <option value="Others">Others</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="category"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Location Name</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="locationname"
                                    required
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
                                    name="mapurl"
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
                                name="description"
                                rows={4}
                                required
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
                                    placeholder="Enter the date of the event"
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
                                    placeholder="Enter the first three letters of the month of the event"
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
                                    placeholder="Enter the year of the event"
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
                            Create Events
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
