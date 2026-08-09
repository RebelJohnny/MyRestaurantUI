import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import MealModal from './modals/MealModal';
import DeleteMealDialog from './modals/DeleteMealDialog';
import { useGetMealsQuery } from '@/features/api/mealApis';
import { Add, Delete, Edit } from '@mui/icons-material';
import { Alert, Card, Snackbar } from '@mui/material';
const faLocale = {
    noRowsLabel: 'غذایی یافت نشد', footerTotalRows: 'تعداد کل:',
    MuiTablePagination: { labelRowsPerPage: 'ردیف در صفحه:' },
}
const mealtypes = [
    { name: "غذا", value: 0 },
    { name: "دسر", value: 1 }
]
function EditToolbar(props) {
    const { setModalOpen } = props;

    return (
        <GridToolbarContainer sx={{ p: 1.5, justifyContent: 'flex-end', borderBottom: '1px solid #F1F5F9' }}>
            <Button variant="contained" startIcon={<Add />} onClick={() => setModalOpen(true)} sx={{ borderRadius: '10px', px: 3 }}>افزودن غذا</Button>
        </GridToolbarContainer>
    );
}

export default function Meal({dark}) {
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- Queries -------------------------------- */
    const {
        data: mealsData = [],
        isFetching: mealsIsFetching,
        isError: mealsIsError,
        currentData: mealsCurrentData
    } = useGetMealsQuery();

    useEffect(() => {
        if (!mealsIsFetching && !mealsIsError) {
            setRows(mealsData);
        }
    }, [mealsIsFetching, mealsCurrentData])

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
            field: 'type', headerName: 'نوع', flex: 1, minWidth: 80, resizable: false,
            valueGetter: (params) => {
                return mealtypes.find(x => x.value == params).name
            }
        },
        {
            field: 'actions', type: 'actions', headerName: 'عملیات', width: 120, resizable: false,
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem key="edit" icon={<Edit color="success" />} label="ویرایش" onClick={handleEditClick(id)} />,
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
                    loading={mealsIsFetching}
                    disableColumnResize
                    disableRowSelectionOnClick
                    getRowId={(r) => r.id}
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
                <MealModal id={modalData} open={modalOpen} onClose={() => setModalOpen(false)} />,
                document.body
            )}
            {createPortal(
                <DeleteMealDialog id={modalData} open={dialogOpen} onClose={() => setDialogOpen(false)} />,
                document.body
            )}
            <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((x) => ({ ...x, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert severity={snack.sev} variant="filled" sx={{ borderRadius: 2 }}>{snack.msg}</Alert>
            </Snackbar>
        </Box>
    )
}
