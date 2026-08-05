import { useEffect } from "react";
import { useFormik } from "formik";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useCreateMenuItemMutation, useGetMenuItemByIdQuery, useUpdateMenuItemMutation } from "@/features/api/menuItemApis";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
};

export default function MenuItemModal({ id, open, onClose }) {
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- Queries -------------------------------- */
    const {
        data: menuItemData,
        isFetching: menuItemIsFetching,
        error: menuItemError,
        isUninitialized: menuItemIsUnitialized
    } = useGetMenuItemByIdQuery(id, {
        skip: id === null,
        refetchOnMountOrArgChange: true
    })
    useEffect(() => {
        if (!menuItemIsFetching && !menuItemError && !menuItemIsUnitialized) {
            formik.setValues(menuItemData)
        }
    }, [menuItemIsFetching])

    /* -------------------------------- Mutations ------------------------------- */
    const [createMenuItem, createResults] = useCreateMenuItemMutation();
    const [updateMenuItem, updateResults] = useUpdateMenuItemMutation();
    /* -------------------------------------------------------------------------- */
    const formik = useFormik({
        initialValues: {
            name: "",
            type: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            !!id
                ? await updateMenuItem({ id, args: values }).unwrap().then(onClose).catch((error) => console.error(error))
                : await createMenuItem({ id, args: values }).unwrap().then(onClose).catch((error) => console.error(error))
        },
    });

    // Reset the form whenever the modal closes
    // useEffect(() => {
    //     if (!open) {
    //         formik.resetForm();
    //     }
    // }, [open]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" mb={3}>
                    {!!id ? "ویرایش پرسنل" : "افزودن پرسنل"}
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            name="name"
                            label="نام"
                            fullWidth
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }} error={formik.touched.type && Boolean(formik.errors.type)}>
                            <InputLabel id="demo-simple-select-outlined-label">نوع</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={formik.values.type}
                                onChange={(event) => formik.setFieldValue('type', event.target.value)}
                                label="نوع"
                            >
                                <MenuItem value={0}>غذا</MenuItem>
                                <MenuItem value={1}>دسر</MenuItem>
                            </Select>
                        </FormControl>

                        <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-end"
                        >
                            <Button
                                variant="outlined"
                                onClick={onClose}
                            >
                                بازگشت
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                loading={createResults.isLoading || updateResults.isLoading}
                            >
                                ثبت
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Modal>
    );
}