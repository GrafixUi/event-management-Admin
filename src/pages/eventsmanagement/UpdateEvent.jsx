import { set } from 'date-fns'
import useAxiosAuth from '../../utils/useAxiosAuth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function UpdateEvent() {
    const searchParams = new URLSearchParams(window.location.search)
    const eventid = searchParams.get('eventid')
    const axiosAuth = useAxiosAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        eventtitle: '',
        eventimg: null,
        organisername: '',
        description: '',
        domaintype: '',
        category: '',
        address: '',
        locationname: '',
        maplink: '',
        day: '',
        month: '',
        year: ''
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'eventimg' ? files[0] : value
        }))
    }
    const [imageUrl, setImageUrl] = useState(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosAuth.get(`/events/${eventid}`)
                if (response.data) {
                    setFormData(response.data.data.attributes)
                    setImageUrl(response.data.data.attributes.eventimg)
                } else {
                    console.error('user data fetch failed')
                }
            } catch (error) {
                console.error('Error during login:', error)
            }
        }
        fetchData()
    }, [])

   

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

    console.log(formData)

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault()
        if(imageUrl === null){
            toast.error('Please upload an image', { position: toast.POSITION.TOP_RIGHT })
            return
        }
        try {
            const response = await axiosAuth.put(`/events/${eventid}`, {
                data: {
                    eventtitle: formData.eventtitle,
                    eventimg: imageUrl,
                    organisername: formData.organisername,
                    description: formData.description,
                    domaintype: formData.domaintype,
                    category: formData.category,
                    address: formData.address,
                    locationname: formData.locationname,
                    maplink: formData.maplink,
                    day: formData.day,
                    month: formData.month,
                    year: formData.year
                }
            })

            if (response.data) {
                toast.success('Event updated successfully!', { position: toast.POSITION.TOP_RIGHT })
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
        <div className="flex flex-row">
            <div className="container mx-auto mt-4">
                <h1 className="text-center text-2xl font-semibold mb-4">Update Event</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 space-x-3">
                    <div>
                        <div className="mb-4">
                            <div className="">
                                <div className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        onChange={handleImageUpload}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                        name="eventtitle"
                                        value={formData.eventtitle}
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
                                    value={formData.organisername}
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Domain</label>
                            <div className="relative">
                            <select className='w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500' value={formData.domaintype}     name="domain"  onChange={handleChange}>
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
                                    value={formData.category}
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
                                    value={formData.locationname}
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
                                    value={formData.address}
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
                                    value={formData.maplink}
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
                                value={formData.description}
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
                                    value={formData.day}
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
                                    value={formData.month}
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
                                    value={formData.year}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-start gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm "
                        >
                            Update Events
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
