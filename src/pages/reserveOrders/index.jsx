import { useGetMenuQuery } from "@/features/api/menuApis";
import { DataGrid, GridActionsCellItem, GridToolbarContainer } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import MealPeriodSelect from "./MealPeriodsSelect";
import { createPortal } from "react-dom";
import ReserveModal from "./modals/ReserveModal";
import { Box, Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardLayout from "@/layout/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/layout/Navbars/DashboardNavbar";
import PersonnelSelect from "./PersonnelSelect";
import { useGetPersonnelReservesQuery } from "@/features/api/personnelApis";

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

export default function ReservedOrders() {
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
    } = useGetPersonnelReservesQuery({ id: personnelId, params: {mealPeriodId, weekDiff, culture: "fa-IR"}},
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
            width: 100,
            editable: false,
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
            getActions: ({row}) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(row)}
                        color="inherit"
                    />,
                ]
            }
        }
    ]

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    slots={{ toolbar: Toolbar }}
                    slotProps={{
                        toolbar: { mealPeriodId, setMealPeriodId, personnelId, setPersonnelId },
                    }}
                    getRowId={(row) => row.date}
                    getRowHeight={() => "auto"}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
                }}
            >
                <ButtonGroup size="small" aria-label="Small button group">
                    <Button key="prev" onClick={() => setWeekDiff(weekDiff - 1)}>هفته قبل</Button>
                    <Button key="curr" onClick={() => setWeekDiff(0)}>هفته فعلی</Button>
                    <Button key="next" onClick={() => setWeekDiff(weekDiff + 1)}>هفته بعد</Button>
                </ButtonGroup>
            </Box>
            {createPortal(
                <ReserveModal rowData={modalData} mealPeriodId={mealPeriodId} personnelId={personnelId} open={modalOpen} onClose={() => setModalOpen(false)} />,
                document.body
            )}
        </DashboardLayout>
    )
}