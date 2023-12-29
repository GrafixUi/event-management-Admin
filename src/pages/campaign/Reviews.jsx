import { useEffect, useMemo, useRef, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MdFilterListAlt } from "react-icons/md";

const Campaignlist = () => {
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
        accessorKey: 'Candidate name',
        header: 'Candidate Name',
        size: 150,
      },
      {
        accessorKey: 'Rating',
        header: 'Rating',
        size: 150,
      },
      {
        accessorKey: 'Stages',
        header: 'Stages',
        size: 150,
      },
      {
        accessorKey: 'Applied Date',
        header: 'Applied Date',
        size: 150,
      },
      {
        accessorKey: 'Owner',
        header: 'Owner',
        size: 150,
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
    <div>
      <div className=' flex items-center justify-between mb-24'>
        <h1 className=' text-[#242565] font-bold text-xl'>Reviews</h1>
        <div className=' flex gap-1 items-center mr-5 bg-white rounded border-gray-300 border-2 py-2 px-6 cursor-pointer'>
          <MdFilterListAlt />
          <h2 className=' font-medium'>Filter</h2>
        </div>
      </div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Campaignlist;
