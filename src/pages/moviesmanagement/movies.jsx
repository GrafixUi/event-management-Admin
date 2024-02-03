import { useEffect, useMemo, useRef, useState } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MdFilterListAlt } from 'react-icons/md'
import useAxiosAuth from '../../utils/useAxiosAuth'
import { useStore } from '../../utils/store'
import { useNavigate } from 'react-router-dom'
import { MenuItem } from '@mui/material'

const Campaignlist = () => {
    const navigate = useNavigate()
    const columns = useMemo(
        () => [
            {
                accessorKey: 'attributes.movieimg',
                header: 'Image',
                size: 150,
                Cell: ( attributes ) =>
                    attributes ? (
                        <img
                            src={attributes.renderedCellValue}
                            alt="Campaign"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    ) : (
                        <span>Error loading image</span>
                    )
            },
            {
                accessorKey: 'attributes.movietitle',
                header: 'Movie Name',
                size: 150
            },
            
            {
                accessorKey: 'attributes.genre',
                header: 'Genre',
                size: 150
            },
            {
                accessorKey: 'attributes.moviedesc',
                header: 'Description',
                size: 150
            },
           
            {
                accessorKey: 'attributes.month',
                header: 'Release Month',
                size: 150
            }
        ],
        []
    )

    const rowVirtualizerInstanceRef = useRef(null)

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [sorting, setSorting] = useState([])
    const axiosAuth = useAxiosAuth()
    const userData = useStore((state) => state.userData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosAuth.get(`/movies?populate=*&filters[userid][$eq]=${userData.id}`)

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

    useEffect(() => {
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0)
        } catch (error) {
            console.error(error)
        }
    }, [sorting])

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
        // muiTableBodyRowProps:({row}) => ({
        //   onClick: () => {
        //     navigate('/updateevent?eventid='+row.original.id)
        //   }
        // })
        renderRowActionMenuItems: ({ row }) => [
            <MenuItem key="edit" onClick={() => navigate('/addmtickets?movieid=' + row.original.id)}>
                Add Ticketdetails
            </MenuItem>,
            <MenuItem key="edit" onClick={() => navigate('/addmoviefaq?movieid=' + row.original.id)}>
            Add movie Faq
        </MenuItem>,

<MenuItem key="edit" onClick={() => navigate('/addmoviecoupon?movieid=' + row.original.id)}>
Add Coupon
</MenuItem>,

            <MenuItem key="edit" onClick={() => navigate('/updatemovie?movieid=' + row.original.id)}>
                Edit
            </MenuItem>,

            <MenuItem key="delete" onClick={() => {
                axiosAuth.delete(`/movies/${row.original.id}`)
                navigate('/dashboard')
            }}>
                Delete
            </MenuItem>
        ]
    })

    return (
        <div>
            <div className=" flex items-center justify-between mb-24">
                <h1 className=" text-[#242565] font-bold text-xl">Movie List</h1>
                <div className=" flex gap-1 items-center mr-5 bg-white rounded border-gray-300 border-2 py-2 px-6 cursor-pointer">
                    <MdFilterListAlt />
                    <h2 className=" font-medium">Filter</h2>
                </div>
            </div>
            <MaterialReactTable table={table} />
        </div>
    )
}

export default Campaignlist
