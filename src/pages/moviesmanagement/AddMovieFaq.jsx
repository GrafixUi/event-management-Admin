import React, { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useAxiosAuth from '../../utils/useAxiosAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MdFilterListAlt } from "react-icons/md";
import { MenuItem } from '@mui/material';
export default function Createcampaign() {
    const axiosAuth = useAxiosAuth()
    const queryParams = new URLSearchParams(window.location.search)
    const navigate = useNavigate()
    const movieid = queryParams.get('movieid')
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sorting, setSorting] = useState([]);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
      
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosAuth.get(`/faqs?populate=*&filters[movieid][$eq]=${movieid}`)

                if (response.data) {
                    console.log(response)
                    setData(response.data.data)
                } else {
                    console.error('Failed to fetch data from the server')
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])


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
            const response = await axiosAuth.post('/faqs', {
                data: {
                    question: formData.question,
                    answer: formData.answer,
                    
                    movieid: Number(movieid),
                }
            })

            if (response.data) {
                console.log(response)
                toast.success('Faq data added successfully!', { position: toast.POSITION.TOP_RIGHT })
                navigate(`/movies`)
            } else {
                console.error('Failed to add faq')
                toast.error('Failed to add faq. Please try again.', { position: toast.POSITION.TOP_RIGHT })
            }
        } catch (error) {
            console.error('Error faq:', error)
            toast.error('Error faq. Please try again later.', { position: toast.POSITION.TOP_RIGHT })
        }
    }
    const columns = useMemo(
        () => [
          {
            accessorKey: 'attributes.question',
            header: 'Question',
            size: 150,
            
          },
          {
            accessorKey: 'attributes.answer',
            header: 'Answer',
            size: 150,
          },
        
        ],
        [],
      );
    
      const rowVirtualizerInstanceRef = useRef(null);
      useEffect(() => {
        try {
          rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
          console.error(error);
        }
      }, [sorting]);
    
      const table = useMaterialReactTable({
        columns,
        data,
        enableBottomToolbar: false,
        enableGlobalFilterModes: true,
        enablePagination: false,
        enableRowNumbers: true,
        enableRowVirtualization: true,
        muiTableContainerProps: { sx: { maxHeight: '600px' } },
        onSortingChange: setSorting,
        state: { isLoading, sorting },
        rowVirtualizerInstanceRef,
        rowVirtualizerOptions: { overscan: 5 },
        enableRowActions: true,
        renderRowActionMenuItems: ({ row }) => [
            <MenuItem key="delete" onClick={() => {
                axiosAuth.delete(`/faqs/${row.original.id}`)
                toast.success('faq data deleted successfully!', { position: toast.POSITION.TOP_RIGHT })
                navigate(`/movies`)
            }}>
            Delete
          </MenuItem>,
        ]
      });
    

    return (
        <div>
            <div className="container mx-auto max-w-md mt-4">
                <h1 className="text-center text-2xl font-semibold mb-4">Add Faq for this movie</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="">
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700">Question</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                    name="question"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Answer</label>
                        <div className="relative">
                            <input
                                type="text"
                                onChange={handleChange}
                                className=" w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                name="answer"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-start gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm "
                        >
                            Add FAQ
                        </button>
                    </div>
                </form>
            </div>
            <div>
      <div className=' flex items-center justify-between mb-24'>
        <h1 className=' text-[#242565] font-bold text-xl'>FAQ's</h1>
        <div className=' flex gap-1 items-center mr-5 bg-white rounded border-gray-300 border-2 py-2 px-6 cursor-pointer'>
          <MdFilterListAlt />
          <h2 className=' font-medium'>Filter</h2>
        </div>
      </div>
      <MaterialReactTable table={table} />
    </div>
        </div>
    )
}
