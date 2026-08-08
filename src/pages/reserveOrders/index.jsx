import { useGetMenuQuery } from "@/features/api/menuApis";
import { DataGrid, GridActionsCellItem, GridToolbarContainer } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import MealPeriodSelect from "./MealPeriodsSelect";
import { createPortal } from "react-dom";
import ReserveOrdersModal from "./modals/ReserveOrdersModal";
import { Box, Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import DashboardLayout from "@/layout/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/layout/Navbars/DashboardNavbar";

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
    const { mealPeriodId, setMealPeriodId } = props;

    return (
        <GridToolbarContainer>
            <MealPeriodSelect period={mealPeriodId} setPeriod={setMealPeriodId} />
        </GridToolbarContainer>
    )
}

export default function Menu() {
    const [mealPeriodId, setMealPeriodId] = useState(null);
    const [personnelId, setPersonnelId] = useState(null);
    const [weekDiff, setWeekDiff] = useState(0)
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- Queries -------------------------------- */
    const {
        data: menus = [],
        isFetching: menusIsFetching,
        isError: menusIsError,
        currentData: menusCurrentData
    } = useGetMenuQuery({ mealPeriodId, weekDiff },
        {
            skip: mealPeriodId === null
        });

    useEffect(() => {
        if (!menusIsFetching && !menusIsError) {
            setRows(menus)
        }

    }, [menusIsFetching, menusCurrentData])
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
            editable: false
        },
        {
            field: 'meals',
            headerName: 'غذا',
            width: 200,
            editable: false,
            valueGetter: (meals) => {
                return meals.map((meal) => `${meal.name} - ${getMealTypeName(meal.type)}`).join("\n");
            }
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'عملیات',
            width: 100,
            cellClassName: 'actions',
            getActions: (rowData) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(rowData)}
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
                        toolbar: { mealPeriodId, setMealPeriodId },
                    }}
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
                <ReserveOrdersModal date={modalData} mealPeriodId={mealPeriodId} open={modalOpen} onClose={() => setModalOpen(false)} />,
                document.body
            )}
        </DashboardLayout>
    )
}