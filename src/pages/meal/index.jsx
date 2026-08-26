import { useMemo, useRef, useState } from 'react';
import {
  getMRT_RowSelectionHandler,
  MaterialReactTable,
} from 'material-react-table';
import { MRT_Localization_FA } from 'material-react-table/locales/fa';
import { Box, Card, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Add, Delete, Edit } from '@mui/icons-material';
import { createPortal } from 'react-dom';
import { useGetMealListQuery } from '@/features/api/mealApis';
import MealModal from './modals/MealModal';
import DeleteMealDialog from './modals/DeleteMealDialog';
import { stringFilterModes } from '@/utils/MRT/columnFilterModes';


export default function Meal() {
  const mealtypes = [
    { name: "غذا", value: 1 },
    { name: "دسر", value: 2 }
  ]

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: 'name',
        header: 'نام',
        filterFn: 'contains',
        minSize: 80,
        size: 100,
        grow: 1,
        columnFilterModeOptions: stringFilterModes
      },
      {
        accessorKey: 'type',
        header: 'نوع',
        minSize: 80,
        size: 100,
        grow: 1,
        enableColumnFilterModes: false,
        filterFn: 'equals',
        filterVariant: 'select',
        filterSelectOptions: mealtypes.map(option => ({
          label: option.name,
          value: option.value,
        })),
        muiFilterAutocompleteProps: {
          sx: {
            textAlign: "right"
          }
        },
        Cell: ({ cell }) => mealtypes.find(x => x.value == cell.getValue()).name
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

  const {
    data: mealData = { data: [], pagination: { totalCount: 0 } },
    isFetching,
    isLoading,
    isError,
    refetch
  } = useGetMealListQuery({ pagination, sorting, columnFilters, columnFilterFns });

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
  const lastClickRef = useRef({
    timeStamp: -1000,
    rowId: 0
  })
  return (
    <>
      <Box>
        <Card sx={{ overflow: 'hidden' }}>
          <MaterialReactTable
            enableGlobalFilter={false}
            columns={columns}
            data={mealData.data}
            initialState={{ showColumnFilters: true, density: 'comfortable' }}
            muiTableContainerProps={{
              sx: {
                height: "calc(100vh - 16rem)",
                overflowY: 'auto',
              },
            }}
            muiTableHeadCellProps={{
              sx: {
                // direction: 'rtl',
                textAlign: 'unset'
              }
            }}
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
                <Box sx={{ display: 'flex', gap: { sm: '2.5rem', xs: '0.5rem' } }}>
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
            rowCount={mealData.pagination.totalCount ?? pagination.pageSize}
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

            layoutMode='grid'
            localization={MRT_Localization_FA}
            enableColumnFilterModes={true}
            onColumnFilterFnsChange={setColumnFilterFns}
            getRowId={(row) => row.id}
            enableRowSelection={true}
            enableMultiRowSelection={false}
            muiTableBodyRowProps={({ row, staticRowIndex, table }) => ({
              onClick: (event) => {
                const DOUBLE_CLICK_TIME = 300;
                const previousClick = lastClickRef.current;
                if (previousClick.rowId === row.id && event.timeStamp - previousClick.timeStamp < DOUBLE_CLICK_TIME) {
                  handleEditClick(row.id)
                  if (!row.getIsSelected()) {
                    getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event)
                  }
                }
                else {
                  getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event) //import this helper function from material-react-table
                }
                lastClickRef.current = {
                  rowId: row.id,
                  timeStamp: event.timeStamp
                }
              },
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
            positionToolbarAlertBanner='none'
            enableRowNumbers={true}
          />
        </Card>
      </Box>
      {modalOpen && createPortal(
        <MealModal id={modalData} open={modalOpen} onClose={handleEditModalClose} />,
        document.body
      )}
      {dialogOpen && createPortal(
        <DeleteMealDialog id={modalData} open={dialogOpen} onClose={handleDeleteDialogClose} />,
        document.body
      )}
    </>
  );
};
