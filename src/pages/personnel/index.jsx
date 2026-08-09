import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import { useGetPersonnelsQuery } from '@/features/api/personnelApis';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PersonnelModal from './modals/PersonnelModal';
import DeletePersonnelDialog from './modals/deletePersonnelDialog';
import { Add, Delete, Edit } from '@mui/icons-material';
import { Alert, Card, Snackbar } from '@mui/material';

const faLocale = {
    noRowsLabel: 'غذایی یافت نشد', footerTotalRows: 'تعداد کل:',
    MuiTablePagination: { labelRowsPerPage: 'ردیف در صفحه:' },
}
function EditToolbar(props) {
    const { setModalOpen } = props;
    return (
        <GridToolbarContainer sx={{ p: 1.5, justifyContent: 'flex-end', borderBottom: '1px solid #F1F5F9' }}>
            <Button variant="contained" startIcon={<Add />} onClick={() => setModalOpen(true)} sx={{ borderRadius: '10px', px: 3 }}>افزودن پرسنل</Button>
        </GridToolbarContainer>
    );
}

export default function Personnel({ dark }) {
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- Queries -------------------------------- */
    const {
        data: personnelsData = [],
        isFetching: personnelsIsFetching,
        isError: personnelIsError,
        currentData: personnelCurrentData
    } = useGetPersonnelsQuery();

    useEffect(() => {
        if (!personnelsIsFetching && !personnelIsError) {
            setRows(personnelsData);
        }
    }, [personnelsIsFetching, personnelCurrentData])

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
        {
            field: 'name',
            headerName: 'نام',
            flex: 1,
            minWidth: 180,
            editable: false
        },
        {
            field: 'code',
            headerName: 'کد',
            flex: 1,
            minWidth: 80,
            editable: false,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'عملیات',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem key="edit" icon={<Edit color="success" />} label="ویرایش" onClick={handleEditClick(id)} />,
                    <GridActionsCellItem key="delete" icon={<Delete color="error" />} label="حذف" onClick={handleDeleteClick(id)} />,
                ]
            },
        },
    ];
    const [snack, setSnack] = useState({ open: false, msg: '', sev: 'success' })

    const s = (msg, sev = 'success') => setSnack({ open: true, msg, sev })

    return (
        <Box>
            <Card sx={{ overflow: 'hidden' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={personnelsIsFetching}
                    disableColumnResize
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 25, 50]}
                    initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                    slots={{ toolbar: EditToolbar }}
                    slotProps={{
                        toolbar: { setModalOpen },
                    }}
                    localeText={faLocale}
                    getRowHeight={() => "auto"}
                    sx={{
                        border: 'none', minHeight: 500,
                        '& .MuiDataGrid-columnHeaders': { bgcolor: dark ? '#1a1f3c' : '#f8fafc', borderRadius: '12px 12px 0 0' },
                        '& .MuiDataGrid-row:hover': { bgcolor: dark ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)' },
                    }} />
            </Card>
             {createPortal(
                 <PersonnelModal id={modalData} open={modalOpen} onClose={() => setModalOpen(false)} />,
                 document.body
             )}
             {createPortal(
                 <DeletePersonnelDialog id={modalData} open={dialogOpen} onClose={() => setDialogOpen(false)} />,
                 document.body
             )}
            <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((x) => ({ ...x, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert severity={snack.sev} variant="filled" sx={{ borderRadius: 2 }}>{snack.msg}</Alert>
            </Snackbar>
        </Box>
    );
}
