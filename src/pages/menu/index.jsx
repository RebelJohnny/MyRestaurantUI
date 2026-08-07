import { useGetMenuQuery } from "@/features/api/menuApis";
import { GridActionsCellItem, GridToolbarContainer } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';

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
    const { mealPeriod, setMealPeriod } = props;

    return (
        <GridToolbarContainer>
            {/* //select */}
        </GridToolbarContainer>
    )
}

export default function Menu() {
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- Queries -------------------------------- */
    const {
        data: menus = [],
        isFetching: menusIsFetching,
        isError: menusIsError,
        currentData: menusCurrentData
    } = useGetMenuQuery();

    useEffect(() => {
        if (!menusIsFetching && !menusIsError) {
            setRows(menus)
        }

    }, [menusIsFetching, menusCurrentData])
    /* -------------------------------------------------------------------------- */
    const [modalData, setModalData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [rows, setRows] = useState([]);

    const handleEditClick = (id) => () => {
        setModalData(id);
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
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
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
                        toolbar: { setModalOpen },
                    }}
                />
            </Box>
            {createPortal(
                <MealModal id={modalData} open={modalOpen} onClose={() => setModalOpen(false)} />,
                document.body
            )}
            {createPortal(
                <DeleteMealDialog id={modalData} open={dialogOpen} onClose={() => setDialogOpen(false)} />,
                document.body
            )}
        </DashboardLayout>
    )
}