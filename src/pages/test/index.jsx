import { useMemo, useState } from 'react';
import {
  getMRT_RowSelectionHandler,
  MaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_FA } from 'material-react-table/locales/fa';
import { Box, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useGetPersonnelsQuery } from '@/features/api/personnelApis';
import { Add, Delete, Edit } from '@mui/icons-material';
import { createPortal } from 'react-dom';
import PersonnelModal from './modals/PersonnelModal';
import DeletePersonnelDialog from './modals/DeletePersonnelDialog';


export default function Test() {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'code',
        header: 'کد',
        filterFn: 'contains',
        minSize: 180,
        size: 300,
        grow: true
      },
      {
        accessorKey: 'name',
        header: 'نام',
        filterFn: 'contains',
        minSize: 180,
        size: 300,
        grow: true
      }
    ],
    [],
    //end
  );
  const [columnFilterFns, setColumnFilterFns] = useState(() =>
    Object.fromEntries(
      columns.map((column) => [
        column.accessorKey,
        column.filterFn,
      ]),
    ),
  )
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // console.log("columnFilters", columnFilters)
  // console.log("globalFilter", globalFilter)
  // console.log("sorting", sorting)
  // console.log("pagination", pagination)
  // console.log("columnFilterFns", columnFilterFns)

  const {
    data: personnelData = { data: [], pagination: { totalCount: 0 } },
    isFetching,
    isLoading,
    isError,
    refetch
  } = useGetPersonnelsQuery({pagination, sorting, columnFilters, columnFilterFns});

  const [modalData, setModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateClick = () => {
    setModalOpen(true);
  }
  const handleEditClick = (id) => {
    setModalData(id);
    setModalOpen(true);
  }
  const handleDeleteClick = (id) => {
    setModalData(id);
    setDialogOpen(true)
  }
  const handleEditModalClose = () => {
    setModalData(null);
    setModalOpen(false);
  }
  const handleDeleteDialogClose = () => {
    setModalData(null);
    setDialogOpen(false);
  }
console.log(personnelData)
  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={personnelData.data}
        initialState={{ showColumnFilters: true, density: 'compact' }}
        muiTableBodyCellProps={{
          sx: {
            direction: 'rtl',
            textAlign: 'unset',
          },
        }}
        manualFiltering={true} //turn off built-in client-side filtering
        manualPagination={true} //turn off built-in client-side pagination
        manualSorting={true} //turn off built-in client-side sorting
        muiToolbarAlertBannerProps={isError
          ? {
            color: 'error',
            children: 'Error loading data',
          }
          : undefined}
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        renderTopToolbarCustomActions={({ table }) => {
          var rowSelection = table.getState().rowSelection
          const selectedIds = Object.keys(rowSelection).filter(id => rowSelection[id]);
          return (
            <Box sx={{ display: 'flex', gap: '2.5rem' }}>
              <Tooltip arrow title="ایجاد">
                <IconButton onClick={handleCreateClick}>
                  <Add />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="ویرایش">
                <IconButton disabled={selectedIds.length === 0} onClick={() => handleEditClick(selectedIds[0])}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="حذف">
                <IconButton disabled={selectedIds.length === 0} onClick={() => handleDeleteClick(selectedIds[0])}>
                  <Delete />
                </IconButton>
              </Tooltip>
              <Tooltip arrow title="بارگیری مجدد">
                <IconButton onClick={() => refetch()}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )
        }}
        rowCount={personnelData.pagination.totalCount ?? pagination.pageSize}
        state={
          {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isFetching,
            sorting,
            columnFilterFns
          }
        }
        enableColumnResizing={true}
        layoutMode='grid'
        localization={MRT_Localization_FA}
        enableColumnFilterModes={true}
        onColumnFilterFnsChange={setColumnFilterFns}
        getRowId={(row) => row.id}
        enableRowSelection={true}
        enableMultiRowSelection={false}
        muiTableBodyRowProps={({ row, staticRowIndex, table }) => ({
          onClick: (event) =>
            getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event), //import this helper function from material-react-table
          sx: { cursor: 'pointer' },
        })}
        enableStickyHeader={true}
        enableStickyFooter={true}
        displayColumnDefOptions={{
          'mrt-row-select': {
            size: 50, //adjust the size of the row select column
            grow: false, //new in v2.8 (default is false for this column)
            minSize: 50,
            maxSize: 50,
            header: ''
          },
          'mrt-row-numbers': {
            size: 50,
            minSize: 50,
            maxSize: 50,
            grow: false, //new in v2.8 (allow this column to grow to fill in remaining space)
            muiTableHeadCellProps: {
              align: 'center'
            },
            muiTableBodyCellProps: {
              align: 'center'
            }
          },
        }}
        columnResizeDirection='rtl'
        enableRowNumbers={true}
      />
      {createPortal(
        <PersonnelModal id={modalData} open={modalOpen} onClose={handleEditModalClose} />,
        document.body
      )}
      {createPortal(
        <DeletePersonnelDialog id={modalData} open={dialogOpen} onClose={handleDeleteDialogClose} />,
        document.body
      )}
    </>
  );
};
