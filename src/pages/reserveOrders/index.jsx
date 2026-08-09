import { DataGrid, GridActionsCellItem, GridToolbarContainer } from "@mui/x-data-grid";
import MealPeriodSelect from "./MealPeriodsSelect";
import { createPortal } from "react-dom";
import ReserveModal from "./modals/ReserveModal";
import { Alert, Box, Button, ButtonGroup, Card, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import PersonnelSelect from "./PersonnelSelect";
import { useGetPersonnelReservesQuery } from "@/features/api/personnelApis";
import { Edit } from "@mui/icons-material";

const faLocale = {
    noRowsLabel: 'وعده‌ای یافت نشد', footerTotalRows: 'تعداد کل:',
    MuiTablePagination: { labelRowsPerPage: 'ردیف در صفحه:' },
}
const mealTypes = [
    { name: "غذا", value: 0 },
    { name: "دسر", value: 1 }
]
const getMealTypeName = (value) => {
    return mealTypes.find((x) => x.value === value)?.name ?? "نامعلوم";
};
const daysOfWeek = [
    { name: "یک‌شنبه", value: 0 },
    { name: "دوشنبه", value: 1 },
    { name: "سه‌شنبه", value: 2 },
    { name: "چهارشنبه", value: 3 },
    { name: "پنج‌شنبه", value: 4 },
    { name: "جمعه", value: 5 },
    { name: "شنبه", value: 6 },
]

function Toolbar(props) {
    const { mealPeriodId, setMealPeriodId, personnelId, setPersonnelId } = props;

    return (
        <GridToolbarContainer>
            <MealPeriodSelect period={mealPeriodId} setPeriod={setMealPeriodId} />
            <PersonnelSelect personnel={personnelId} setPersonnel={setPersonnelId} />
        </GridToolbarContainer>
    )
}

export default function ReservedOrders({ dark }) {
    const [mealPeriodId, setMealPeriodId] = useState('');
    const [personnelId, setPersonnelId] = useState('');
    const [weekDiff, setWeekDiff] = useState(0)
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- Queries -------------------------------- */
    const {
        data: reservedOrders = [],
        isFetching: reservedOrdersIsFetching,
        isError: reservedOrdersIsError,
        currentData: reservedOrdersCurrentData
    } = useGetPersonnelReservesQuery({ id: personnelId, params: { mealPeriodId, weekDiff, culture: "fa-IR" } },
        {
            skip: mealPeriodId === '' || personnelId === ''
        });

    useEffect(() => {
        if (!reservedOrdersIsFetching && !reservedOrdersIsError) {
            setRows(reservedOrders)
        }

    }, [reservedOrdersIsFetching, reservedOrdersCurrentData])
    /* -------------------------------------------------------------------------- */
    const [modalData, setModalData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);

    const handleEditClick = (rowData) => () => {
        setModalData(rowData);
        setModalOpen(true);
    }

    const columns = [
        {
            field: 'dayOfWeek',
            headerName: 'روز',
            flex: 1,
            minWidth: 180,
            valueGetter: (params) => {
                return daysOfWeek.find(x => x.value == params).name
            }
        },
        {
            field: 'date',
            headerName: 'تاریخ',
            width: 100,
            editable: false,
            valueGetter: (date) => {
                return new Date(date).toLocaleDateString("fa-IR")
            }
        },
        {
            field: 'meals',
            headerName: 'غذا',
            width: 200,
            editable: false,
            valueGetter: (meals) => {
                return meals.map((meal) => `${meal.name} - ${getMealTypeName(meal.type)}`).join("\n");
            },
            renderCell: (params) => (
                <div style={{ whiteSpace: "pre-line" }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'عملیات',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        icon={<Edit color="primary" />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(row)}
                        color="inherit"
                    />,
                ]
            }
        }
    ]
    const [snack, setSnack] = useState({ open: false, msg: '', sev: 'success' })
    const s = (msg, sev = 'success') => setSnack({ open: true, msg, sev })

    return (
        <Box>
            <Card sx={{ overflow: 'hidden' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={reservedOrdersIsFetching}
                    disableColumnResize
                    disableRowSelectionOnClick
                    getRowId={(r) => r.date}
                    pageSizeOptions={[5, 10, 25, 50]}
                    initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                    slots={{ toolbar: Toolbar }}
                    slotProps={{
                        toolbar: { mealPeriodId, setMealPeriodId, personnelId, setPersonnelId },
                    }}
                    localeText={faLocale}
                    sx={{
                        border: 'none', minHeight: 500,
                        '& .MuiDataGrid-columnHeaders': { bgcolor: dark ? '#1a1f3c' : '#f8fafc', borderRadius: '12px 12px 0 0' },
                        '& .MuiDataGrid-row:hover': { bgcolor: dark ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)' },
                    }} />
            </Card>
            <div
                style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ButtonGroup size="small" aria-label="Small button group">
                    <Button key="prev" onClick={() => setWeekDiff(weekDiff - 1)}>هفته قبل</Button>
                    <Button key="curr" onClick={() => setWeekDiff(0)}>هفته فعلی</Button>
                    <Button key="next" onClick={() => setWeekDiff(weekDiff + 1)}>هفته بعد</Button>
                </ButtonGroup>
            </div>
            {createPortal(
                <ReserveModal rowData={modalData} mealPeriodId={mealPeriodId} personnelId={personnelId} open={modalOpen} onClose={() => setModalOpen(false)} />,
                document.body
            )}
            <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack((x) => ({ ...x, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert severity={snack.sev} variant="filled" sx={{ borderRadius: 2 }}>{snack.msg}</Alert>
            </Snackbar>
        </Box>
    )
}