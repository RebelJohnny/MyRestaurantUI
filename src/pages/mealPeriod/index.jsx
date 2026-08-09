import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import MealPeriodModal from './modals/MealPeriodModal';
import DeleteMealPeriodDialog from './modals/DeleteMealPeriodDialog';
import { useGetMealPeriodsQuery } from '@/features/api/mealPeriodApis';
import { toTimeString } from '@/utils/timeFunctions';
import { Add, Delete, Edit } from '@mui/icons-material';
import { Alert, Card, Snackbar } from '@mui/material';

const faLocale = {
    noRowsLabel: 'وعده‌ای یافت نشد', footerTotalRows: 'تعداد کل:',
    MuiTablePagination: { labelRowsPerPage: 'ردیف در صفحه:' },
}

function EditToolbar(props) {
    const { setModalOpen } = props;

    return (
        <GridToolbarContainer sx={{ p: 1.5, justifyContent: 'flex-end', borderBottom: '1px solid #F1F5F9' }}>
            <Button variant="contained" startIcon={<Add />} onClick={() => setModalOpen(true)} sx={{ borderRadius: '10px', px: 3 }}>افزودن وعده غذایی</Button>
        </GridToolbarContainer>
    );
}

export default function MealPeriod({ dark }) {
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- Queries -------------------------------- */
    const {
        data: mealPeriodsData = [],
        isFetching: mealPeriodsIsFetching,
        isError: mealPeriodIsError,
        currentData: mealPeriodCurrentData
    } = useGetMealPeriodsQuery();

    useEffect(() => {
        if (!mealPeriodsIsFetching && !mealPeriodIsError) {
            setRows(mealPeriodsData);
        }
    }, [mealPeriodsIsFetching, mealPeriodCurrentData])

    /* -------------------------------------------------------------------------- */
    const [modalData, setModalData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [rows, setRows] = useState([]);

    const handleEditClick = (id) => () => {
        setModalData(id);
        setModalOpen(true);
    };

    const handleDeleteClick = (id) => () => {
        setModalData(id);
        setDialogOpen(true);
    };
    const columns = [
        { field: 'name', headerName: 'نام', flex: 1, minWidth: 180, resizable: false },
        {
            field: 'time',
            headerName: 'ساعت',
            width: 80,
            editable: false,
            valueGetter: (params) => {
                return toTimeString(params)
            }
        },
        {
            field: 'actions', type: 'actions', headerName: 'عملیات', width: 100, resizable: false,
            getActions: ({ id }) => {
                const row = rows.find((r) => r.id === id)
                return [
                    <GridActionsCellItem key="edit" icon={<Edit color="primary" />} label="ویرایش" onClick={handleEditClick(id)} />,
                    <GridActionsCellItem key="delete" icon={<Delete color="error" />} label="حذف" onClick={handleDeleteClick(id)} />,
                ]
            },
        },
    ]

    const [snack, setSnack] = useState({ open: false, msg: '', sev: 'success' })

    const s = (msg, sev = 'success') => setSnack({ open: true, msg, sev })

    return (
        <Box>
            <Card sx={{ overflow: 'hidden' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={mealPeriodsIsFetching}
                    disableColumnResize
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 25, 50]}
                    initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                    slots={{ toolbar: EditToolbar }}
                    slotProps={{
                        toolbar: { setModalOpen },
                    }}
                    localeText={faLocale}
                    sx={{
                        border: 'none', minHeight: 500,
                        '& .MuiDataGrid-columnHeaders': { bgcolor: dark ? '#1a1f3c' : '#f8fafc', borderRadius: '12px 12px 0 0' },
                        '& .MuiDataGrid-row:hover': { bgcolor: dark ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)' },
                    }} />
            </Card>
            {createPortal(
                <MealPeriodModal id={modalData} open={modalOpen} onClose={() => setModalOpen(false)} />,
                document.body
            )}
            {createPortal(
                <DeleteMealPeriodDialog id={modalData} open={dialogOpen} onClose={() => setDialogOpen(false)} />,
                document.body
            )}
            <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((x) => ({ ...x, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert severity={snack.sev} variant="filled" sx={{ borderRadius: 2 }}>{snack.msg}</Alert>
            </Snackbar>
        </Box>
    );
}
