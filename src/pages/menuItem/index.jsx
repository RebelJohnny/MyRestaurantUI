import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import DashboardLayout from '@/layout/LayoutContainers/DashboardLayout';
import DashboardNavbar from '@/layout/Navbars/DashboardNavbar';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import MenuItemModal from './modals/MenuItemModal';
import DeleteMenuItemDialog from './modals/DeleteMenuItemDialog';
import { useGetMenuItemsQuery } from '@/features/api/menuItemApis';

const itemTypes = [
    { name: "غذا", value: 0 },
    { name: "دسر", value: 1 }
]
function EditToolbar(props) {
    const { setModalOpen } = props;
    const handleClick = () => {
        setModalOpen(true);
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                افزودن غذا
            </Button>
        </GridToolbarContainer>
    );
}

export default function MenuItem() {
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- Queries -------------------------------- */
    const {
        data: menuItemsData = [],
        isFetching: menuItemsIsFetching,
        isError: menuItemIsError,
        currentData: menuItemCurrentData
    } = useGetMenuItemsQuery();

    useEffect(() => {
        if (!menuItemsIsFetching && !menuItemIsError) {
            setRows(menuItemsData);
        }
    }, [menuItemsIsFetching, menuItemCurrentData])

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
            width: 180,
            editable: false
        },
        {
            field: 'type',
            headerName: 'نوع',
            width: 80,
            editable: false,
            valueGetter: (params) => {
                return itemTypes.find(x => x.value == params).name
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
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

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
                    slots={{ toolbar: EditToolbar }}
                    slotProps={{
                        toolbar: { setModalOpen },
                    }}
                />
            </Box>
            {createPortal(
                <MenuItemModal id={modalData} open={modalOpen} onClose={() => setModalOpen(false)} />,
                document.body
            )}
            {createPortal(
                <DeleteMenuItemDialog id={modalData} open={dialogOpen} onClose={() => setDialogOpen(false)} />,
                document.body
            )}
        </DashboardLayout>
    );
}
