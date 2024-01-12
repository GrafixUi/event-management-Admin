import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useAxiosAuth from '../../utils/useAxiosAuth'
import { useNavigate } from 'react-router-dom'

export default function Createcampaign() {
    const axiosAuth = useAxiosAuth()
    const queryParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const eventid = queryParams.get('eventid')
    const eventname = queryParams.get('eventname')
    const [formData, setFormData] = useState({
        name: '',
        availablequan: '',
        type: '',
        price: '',
        salesstart: '',
        salesend: '',
        saleschannel: '',
        description: ''
    })

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

        try {
            const response = await axiosAuth.post('/ticketdetails', {
                data: {
                    name: formData.name,
                    availablequan: formData.availablequan,
                    type: formData.type,
                    price: formData.price,
                    salesstart: formData.salesstart,
                    salesend: formData.salesend,
                    saleschannel: formData.saleschannel,
                    description: formData.description,
                    eventid: Number(eventid),
                    eventtitle: eventname
                }
            })

            if (response.data) {
                console.log(response)
                toast.success('Ticket data added successfully!', { position: toast.POSITION.TOP_RIGHT })
                navigate(`/dashboard`)
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
                <h1 className="text-center text-2xl font-semibold mb-4">Add Ticket details for this event</h1>
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
                        <label className="block text-sm font-medium text-gray-700">Number of Total Tickets</label>
                        <div className="relative">
                            <input
                            type='number'
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="availablequan"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Ticket Type</label>
                        <div className="relative">
                            <input
                                type="text"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="type"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Ticket Price</label>
                        <div className="relative">
                            <input
                                type="number"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="price"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Sales Channel</label>
                        <div className="relative">
                            <input
                                type="text"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="saleschannel"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <div className="relative">
                            <textarea
                                type=""
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="description"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Sales Start Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="salesstart"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Sales End Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="salesend"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-start gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm "
                        >
                            Add Ticket data
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
