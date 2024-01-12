import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useAxiosAuth from '../../utils/useAxiosAuth'
import { useStore } from '../../utils/store'
import {useNavigate} from 'react-router-dom'

export default function Createcampaign() {
    const axiosAuth = useAxiosAuth()
    const userData = useStore((state) => state.userData)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        uploadimg: null,
        aboutbrand: '',
        longdescription: '',
        shortdescription: '',
        domain: '',
        startdate: '',
        enddate: '',
        category: '',
        venue: '',
        address: '',
        meetlink: '',
        maplink: ''
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'uploadimg' ? files[0] : value
        }))
    }

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault()

        const formDataToSend = new FormData()
        formDataToSend.append('eventtitle', formData.name)
        formDataToSend.append('eventimg', formData.uploadimg)
        formDataToSend.append('aboutorganizer', formData.aboutbrand)
        formDataToSend.append('category', formData.category)
        formDataToSend.append('domaintype', formData.domain)
        formDataToSend.append('locationtype', formData.venue)
        formDataToSend.append('address', formData.address)
        formDataToSend.append('mapurl', formData.maplink)
        formDataToSend.append('meeturl', formData.meetlink)
        formDataToSend.append('eventstarts', formData.startdate)
        formDataToSend.append('eventends', formData.enddate)
        formDataToSend.append('starttime', formData.starttime)
        formDataToSend.append('endtime', formData.endtime)
        formDataToSend.append('shortdesc', formData.shortdescription)
        formDataToSend.append('aboutevent', formData.longdescription)

        try {
            const response = await axiosAuth.post('/events', {
                data: {
                    eventtitle: formData.name,
                    eventimg: formData.uploadimg,
                    aboutorganizer: formData.aboutbrand,
                    category: formData.category,
                    domaintype: formData.domain,
                    locationtype: formData.venue,
                    address: formData.address,
                    mapurl: formData.maplink,
                    meeturl: formData.meetlink,
                    eventstarts: formData.startdate,
                    eventends: formData.enddate,
                    shortdesc: formData.shortdescription,
                    aboutevent: formData.longdescription,
                    userid: Number(userData.id)
                }
            })

            if (response.data) {
                toast.success('Campaign created successfully!', { position: toast.POSITION.TOP_RIGHT })
                navigate(`/addtickets?eventid=${response.data.data.id}&eventname=${response.data.data.attributes.eventtitle}`)
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
            <div className="container mx-auto max-w-md mt-4">
                <h1 className="text-center text-2xl font-semibold mb-4">Create New Event</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="">
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="name"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Upload AD Image</label>
                        <div className="relative">
                            <input
                                type="file"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="uploadimg"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">About Organiser</label>
                        <div className="relative">
                            <textarea
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="aboutbrand"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Domain</label>
                        <div className="relative">
                            <input
                                type="text"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="domain"
                            />
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
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Venue</label>
                        <div className="relative">
                            <select name="venue" onChange={handleChange}>
                                <option value="Offline">Offline</option>
                                <option value="Online">Online</option>
                            </select>
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
                                placeholder="if the event is offline, please enter the address"
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
                                placeholder="if the event is offline, please enter the map link"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Meet Link</label>
                        <div className="relative">
                            <input
                                type="url"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="meetlink"
                                placeholder="if the event is online, please enter the link"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="startdate"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="enddate"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Short Description</label>
                        <textarea
                            type="text"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            name="shortdescription"
                            rows={4}
                            placeholder="Enter details about your event"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">long Description</label>
                        <textarea
                            type="text"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            name="longdescription"
                            rows={4}
                            placeholder="Enter details such as agenda and speakers"
                        />
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
