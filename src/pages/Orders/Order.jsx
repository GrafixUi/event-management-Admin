// import { useEffect, useMemo, useRef, useState } from 'react';
// import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
// import { MdFilterListAlt, MdOutlineZoomIn  } from "react-icons/md";

// const Campaignlist = () => {
//   const columns = useMemo(
//     () => [
//       // {
//       //   accessorKey: 'image',
//       //   header: 'Image',
//       //   size: 150,
//       //   Cell: ({ image }) => (
//       //     image ? (
//       //       <img
//       //         src={`data:image/png;base64,${btoa(String.fromCharCode.apply(null, image))}`}
//       //         alt="Campaign"
//       //         style={{ width: '100%', height: 'auto' }}
//       //       />
//       //     ) : (
//       //       <span>Error loading image</span>
//       //     )
//       //   ),
//       // },
//       {
//         accessorKey: 'Events name',
//         header: 'Events Name',
//         size: 150,
//       },
//       {
//         accessorKey: 'Organizer',
//         header: 'Organizer',
//         size: 150,
//       },
//       {
//         accessorKey: 'Stages',
//         header: 'Stages',
//         size: 150,
//       },
//       {
//         accessorKey: 'Order Date',
//         header: 'Order Date',
//         size: 150,
//       },
//       {
//         accessorKey: 'Status',
//         header: 'Status',
//         size: 150,
//       },
//       {
//         accessorKey: 'Setting',
//         header: 'Setting',
//         size: 150,
//       },
//     ],
//     [],
//   );

//   const rowVirtualizerInstanceRef = useRef(null);

//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [sorting, setSorting] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/campaign');
//         if (response.ok) {
//           const result = await response.json();
//           setData(result);
//         } else {
//           console.error('Failed to fetch data from the server');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     try {
//       rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
//     } catch (error) {
//       console.error(error);
//     }
//   }, [sorting]);

//   const table = useMaterialReactTable({
//     columns,
//     data,
//     enableBottomToolbar: false,
//     enableGlobalFilterModes: true,
//     enablePagination: false,
//     enableRowNumbers: true,
//     enableRowVirtualization: true,
//     muiTableContainerProps: { sx: { maxHeight: '600px' } },
//     onSortingChange: setSorting,
//     state: { isLoading, sorting },
//     rowVirtualizerInstanceRef,
//     rowVirtualizerOptions: { overscan: 5 },
//   });

//   return (
//     <div className=''>
//       <div className=' flex items-center justify-between'>
//         <h1 className=' text-[#242565] font-bold text-xl'>Venues</h1>
//         <div className=' flex gap-1 items-center mr-5 bg-white rounded border-gray-300 border-2 py-2 px-6 cursor-pointer'>
//           <MdFilterListAlt />
//           <h2 className=' font-medium'>Filter</h2>
//         </div>
//       </div>
//       <div className="bg-white rounded-md flex max-w-[971px] flex-col justify-center items-stretch pl-14 pr-12 py-6 max-md:px-5">
//         <div className="bg-white flex flex-col pt-7 pb-12 px-6 max-md:max-w-full max-md:pl-5">
//           <div className="self-center flex w-full max-w-[764px] items-center justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
//             <div className="text-neutral-400 text-xs grow whitespace-nowrap my-auto">
//               event date(s) found
//             </div>
//             <div className="flex items-center gap-3.5 self-start">
//               <div className="text-gray-500 text-base font-semibold grow whitespace-nowrap my-auto">
//                 Sort by
//               </div>
//               <input className="text-white text-xs items-stretch bg-stone-300 self-stretch grow justify-center py-3.5 rounded-md" type='text' placeholder='Creation date (desc)' />
//             </div>
//             <MdOutlineZoomIn size={30} />
//           </div>
//           <div className="bg-zinc-400 self-stretch shrink-0 h-[3px] mt-6 max-md:max-w-full" />
//           <div className="flex justify-between gap-5 ml-6 mt-10 self-start items-start max-md:max-w-full max-md:flex-wrap">
//             <div className="items-stretch bg-white bg-opacity-30 flex grow basis-[0%] flex-col py-1.5">
//               <div className="text-gray-500 text-xs font-semibold">Reference</div>
//               <input className="text-white text-xs items-stretch bg-stone-300 self-stretch grow justify-center py-3.5 rounded-md" type='text' />
//             </div>
//             <div className="justify-center items-stretch bg-white bg-opacity-30 flex grow basis-[0%] flex-col py-1">
//               <div className="text-gray-500 text-xs font-semibold">
//                 Events
//               </div>
//               <input className="text-white text-xs items-stretch bg-stone-300 self-stretch grow justify-center py-3.5 rounded-md" type='text' />
//             </div>
//             <div className="justify-center items-stretch bg-white bg-opacity-30 flex grow basis-[0%] flex-col py-0.5">
//               <div className="text-gray-500 text-xs font-semibold">Organizer</div>
//               <input className="text-white text-xs items-stretch bg-stone-300 self-stretch grow justify-center py-3.5 rounded-md" type='text' />
//             </div>
//           </div>
//           <div className="flex w-[126px] max-w-full items-stretch justify-between gap-5 ml-6 mt-5 self-start max-md:ml-2.5">
//             <div className="justify-center items-stretch bg-white bg-opacity-30 flex grow basis-[0%] flex-col py-0.5">
//               <div className="text-gray-500 text-xs font-semibold">From Date</div>
//               <input className="text-white text-xs items-stretch bg-stone-300 self-stretch grow justify-center py-3.5 rounded-md" type='text' />
//             </div>
//             <div className="justify-center items-stretch bg-white bg-opacity-30 flex grow basis-[0%] flex-col py-0.5">
//               <div className="text-gray-500 text-xs font-semibold">Until Date</div>
//               <input className="text-white text-xs items-stretch bg-stone-300 self-stretch grow justify-center py-3.5 rounded-md" type='text' />
//             </div>
//           </div>
//         </div>
//       </div>
//       <h2 className=' text-[#6F767E] mb-8 text-2xl font-semibold'>Total Venues</h2>
//       <MaterialReactTable table={table} />
//     </div>

//   )
// };

// export default Campaignlist;


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
                accessorKey: 'attributes.ticketprice',
                header: 'Charged',
                size: 150
            },
            
            {
                accessorKey: 'attributes.totalprice',
                header: 'After tax',
                size: 150
            },
            {
                accessorKey: 'attributes.ticketquantity',
                header: 'Ticket Quantity',
                size: 150
            },{
              accessorKey: 'attributes.eventname',
              header: 'Event',
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
                const response = await axiosAuth.get(`/orders?populate=*&filters[organiserid][$eq]=${userData.id}`)

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
        // renderRowActionMenuItems: ({ row }) => [
        //     <MenuItem key="edit" onClick={() => navigate('/addmtickets?movieid=' + row.original.id)}>
        //         Add Ticketdetails
        //     </MenuItem>,

        //     <MenuItem key="edit" onClick={() => navigate('/updatemovie?movieid=' + row.original.id)}>
        //         Edit
        //     </MenuItem>,

        //     <MenuItem key="delete" onClick={() => {
        //         axiosAuth.delete(`/movies/${row.original.id}`)
        //         navigate('/dashboard')
        //     }}>
        //         Delete
        //     </MenuItem>
        // ]
    })

    return (
        <div>
            <div className=" flex items-center justify-between mb-24">
                <h1 className=" text-[#242565] font-bold text-xl">Order List</h1>
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

