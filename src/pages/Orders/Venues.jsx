import { useEffect, useMemo, useRef, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MdFilterListAlt, MdOutlineSearch } from "react-icons/md";

const Venues = () => {
    const columns = useMemo(
        () => [
            // {
            //   accessorKey: 'image',
            //   header: 'Image',
            //   size: 150,
            //   Cell: ({ image }) => (
            //     image ? (
            //       <img
            //         src={`data:image/png;base64,${btoa(String.fromCharCode.apply(null, image))}`}
            //         alt="Campaign"
            //         style={{ width: '100%', height: 'auto' }}
            //       />
            //     ) : (
            //       <span>Error loading image</span>
            //     )
            //   ),
            // },
            {
                accessorKey: 'name',
                header: 'Name',
                size: 100,
            },
            {
                accessorKey: 'Venues Count',
                header: 'Venues Count',
                size: 100,
            },
            {
                accessorKey: 'Status',
                header: 'Status',
                size: 100,
            },
            {
                accessorKey: 'Setting',
                header: 'Setting',
                size: 100,
            },
        ],
        [],
    );

    const rowVirtualizerInstanceRef = useRef(null);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sorting, setSorting] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/campaign');
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                } else {
                    console.error('Failed to fetch data from the server');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

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
    });
    return (
        <div className=''>
            <div className=' flex items-center justify-between'>
                <h1 className=' text-[#242565] font-bold text-xl'>Venues</h1>
                {/* <div className=' flex gap-1 items-center mr-5 bg-white rounded border-gray-300 border-2 py-2 px-6 cursor-pointer'>
                    <MdFilterListAlt />
                    <h2 className=' font-medium'>Filter</h2>
                </div> */}
            </div>
            <div className=' flex gap-3 justify-end items-center mr-32 mt-5 mb-28'>
                {/* <div className=' bg-white flex gap-3 py-2 px-8 rounded'>
                    <div className=' flex items-center gap-2'>
                        <h3 className=' font-medium'>Search</h3>
                        <MdOutlineSearch size={20} className=' cursor-pointer' />
                    </div>
                    <div className=' flex gap-4 items-center'>
                        <h3 className=' font-medium'>Sort by</h3>
                        <input type="text" name="" id="" className=' p-2 bg-[#f4f4f4] rounded text-white border-0' placeholder='creation date(desc)' />
                    </div>
                    <p className=' bg-[#0A075FE0] w-4 py-2 pl-4 pr-8 text-xl rounded-xl text-white cursor-pointer'>+</p>
                </div> */}
            </div>
            <h2 className=' text-[#6F767E] mb-8 text-2xl font-semibold'>Total Venues</h2>
            <MaterialReactTable table={table} />
        </div>
        
    )
}

export default Venues
