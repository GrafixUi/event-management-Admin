import { useEffect, useMemo, useRef, useState } from 'react';
import { MdFilterListAlt } from "react-icons/md";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'firstName',
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'middleName',
        header: 'Middle Name',
        size: 150,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email Address',
        size: 300,
      },

    ],
    [],
  );


  const rowVirtualizerInstanceRef = useRef(null);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setData((10_000));
      setIsLoading(false);
    }
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
        <h1 className=' text-[#242565] font-bold text-xl'>Payout Requests</h1>
        <div className=' flex gap-1 items-center mr-5 bg-white rounded border-gray-300 border-2 py-2 px-6 cursor-pointer'>
          {/* <MdFilterListAlt /> */}
          <h2 className=' font-medium'>Filter</h2>
        </div>
      </div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default Example;
