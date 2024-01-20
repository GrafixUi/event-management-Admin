import useAxiosAuth from '../../utils/useAxiosAuth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function UpdateMovie() {
    const searchParams = new URLSearchParams(window.location.search)
    const movieid = searchParams.get('movieid')
    const axiosAuth = useAxiosAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        movietitle: '',
        movieimg: null,
        organisername: '',
        moviedesc: '',
        movietype: '',
        genre: '',
        address: '',
        theatre: '',
        maplink: '',
        day: '',
        month: '',
        year: ''
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'movieimg' ? files[0] : value
        }))
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosAuth.get(`/movies/${movieid}`)
                if (response.data) {
                    setFormData(response.data.data.attributes)
                } else {
                    console.error('user data fetch failed')
                }
            } catch (error) {
                console.error('Error during login:', error)
            }
        }
        fetchData()
    }, [])

    console.log(formData)

    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault()

        try {
            const response = await axiosAuth.put(`/movies/${movieid}`, {
                data: {
                    movietitle: formData.movietitle,
                    movieimg: formData.movieimg,
                    organisername: formData.organisername,
                    moviedesc: formData.moviedesc,
                    movietype: formData.movietype,
                    genre: formData.genre,
                    address: formData.address,
                    theatre: formData.theatre,
                    maplink: formData.maplink,
                    day: formData.day,
                    month: formData.month,
                    year: formData.year
                }
            })

            if (response.data) {
                toast.success('Movie updated successfully!', { position: toast.POSITION.TOP_RIGHT })
                // navigate(
                //     `/addtickets?eventid=${response.data.data.id}&eventname=${response.data.data.attributes.eventtitle}`
                // )
                navigate(`/movies`)
            } else {
                console.error('Failed to upload image')
                toast.error('Failed to create Movie. Please try again.', { position: toast.POSITION.TOP_RIGHT })
            }
        } catch (error) {
            console.error('Error uploading image:', error)
            toast.error('Error creating Movie. Please try again later.', { position: toast.POSITION.TOP_RIGHT })
        }
    }

    return (
        <div className="flex flex-row">
            <div className="container mx-auto mt-4">
                <h1 className="text-center text-2xl font-semibold mb-4">Update Movie</h1>
                <form onSubmit={handleSubmit} className='grid grid-cols-2 space-x-3'>
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
                                    value={formData.movietitle}
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
                                value={formData.movieimg}
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
                            <input
                                type="text"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="domaintype"
                                value={formData.domaintype}
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
                                name="Genre"
                                value={formData.Genre}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Theatre Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="theatre"
                                value={formData.theatre}
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
                    </div>

                    <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            type="text"
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            name="moviedesc"
                            rows={4}
                            value={formData.moviedesc}
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
                                placeholder="Enter the first three letters of the month of the movie"
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
                                placeholder="Enter the year of the movie"
                                value={formData.year}
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
                                    value={formData.seatsio_publickey}
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
                                    value={formData.seatsio_eventkey}
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
                                    value={formData.redcircle_price}
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
                                    value={formData.pinkcircle_price}
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
                                    value={formData.orangecircle_price}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-start gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm "
                        >
                            Update Movie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
