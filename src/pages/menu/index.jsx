import { useGetMenuQuery } from "@/features/api/menuApis";
import MealPeriodSelect from "./MealPeriodsSelect";
import { createPortal } from "react-dom";
import MenuModal from "./modals/EditMenuModal";
import { Box, Button, ButtonGroup, Card, Chip, IconButton, Tooltip } from "@mui/material";
import { useMemo, useState } from "react";
import { Edit } from "@mui/icons-material";
import { getMealChipSx } from "@/utils/menuDisplayFunctions";
import { getMRT_RowSelectionHandler, MaterialReactTable } from "material-react-table";
import { MRT_Localization_FA } from "material-react-table/locales/fa";
import RefreshIcon from '@mui/icons-material/Refresh';

const daysOfWeek = [
    { name: "یک‌شنبه", value: 0 },
    { name: "دوشنبه", value: 1 },
    { name: "سه‌شنبه", value: 2 },
    { name: "چهارشنبه", value: 3 },
    { name: "پنج‌شنبه", value: 4 },
    { name: "جمعه", value: 5 },
    { name: "شنبه", value: 6 },
]

export default function Menu() {
    const [mealPeriodId, setMealPeriodId] = useState('')
    const [weekDiff, setWeekDiff] = useState(0)
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- Queries -------------------------------- */
    const {
        data = [],
        isFetching,
        isError,
        isLoading,
        refetch
    } = useGetMenuQuery({ mealPeriodId, weekDiff, culture: "fa-IR" },
        {
            skip: mealPeriodId === ''
        });
    /* -------------------------------------------------------------------------- */
    const [modalData, setModalData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const handleEditClick = (rowData) => {
        setModalData(rowData);
        setModalOpen(true);
    }
    const handleEditModalClose = () => {
        setModalData(null);
        setModalOpen(false);
    }
    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'dayOfWeek',
                header: 'روز',
                minSize: 100,
                size: 150,
                grow: 1,
                Cell: ({ cell }) => {
                    return daysOfWeek.find(x => x.value == cell.getValue()).name
                }
            },
            {
                accessorKey: 'date',
                header: 'تاریخ',
                minSize: 100,
                size: 150,
                grow: 1,
                Cell: ({ cell }) => new Date(cell.getValue()).toLocaleDateString("fa-IR")
            },
            {
                accessorKey: 'meals',
                header: 'غذا',
                minSize: 300,
                size: 600,
                grow: 3,
                Cell: ({ cell }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 0.5,
                            alignItems: 'center',
                            width: '100%',
                            py: 0.5,
                            direction: 'ltr'
                        }}
                    >
                        {(cell.getValue() ?? []).map((meal) => (
                            <Chip
                                key={meal.id ?? `${meal.name}`}
                                label={meal.name}
                                size="small"
                                sx={getMealChipSx(meal.type)}
                            />
                        ))}
                    </Box>
                ),
            }
        ],
        [],
        //end
    );

    return (
        <Box>
            <Card sx={{ overflow: 'hidden' }}>
                <MaterialReactTable
                    enableColumnFilters={false}
                    enableGlobalFilter={false}
                    enableFilters={false}
                    enableSorting={false}
                    columns={columns}
                    data={data}
                    initialState={{ density: 'comfortable' }}
                    muiTableBodyCellProps={{
                        sx: {
                            direction: 'rtl',
                            textAlign: 'unset',
                        },
                    }}
                    muiToolbarAlertBannerProps={isError
                        ? {
                            color: 'error',
                            children: 'Error loading data',
                        }
                        : undefined}
                    renderTopToolbarCustomActions={({ table }) => {
                        var rowSelection = table.getSelectedRowModel().rows
                        return (
                            <>
                                <Box sx={{ display: 'flex', gap: '2.5rem' }}>
                                    <Tooltip arrow title="ویرایش">
                                        <IconButton disabled={rowSelection.length === 0} onClick={() => handleEditClick(rowSelection[0].original)}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip arrow title="بارگیری مجدد">
                                        <IconButton onClick={() => refetch()}>
                                            <RefreshIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <MealPeriodSelect period={mealPeriodId} setPeriod={setMealPeriodId} />
                            </>
                        )
                    }}
                    rowCount={data.length}
                    state={
                        {
                            isLoading,
                            showAlertBanner: isError,
                            showProgressBars: isFetching,
                        }
                    }

                    layoutMode='grid'
                    localization={MRT_Localization_FA}
                    getRowId={(row) => row.date}
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
                    }}
                />
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
                <MenuModal rowData={modalData} mealPeriodId={mealPeriodId} open={modalOpen} onClose={handleEditModalClose} />,
                document.body
            )}
        </Box>
    )
}