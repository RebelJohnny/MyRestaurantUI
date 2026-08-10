import { useEffect } from "react";
import { useFormik } from "formik";
import {
    Box,
    Button,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useCreatePersonnelMutation, useGetPersonnelByIdQuery, useUpdatePersonnelMutation } from "@/features/api/personnelApis";

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

export default function PersonnelModal({ id, open, onClose }) {
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- Queries -------------------------------- */
    const {
        data: personnelData,
        isFetching: personnelIsFetching,
        error: personnelError,
        isUninitialized: personnelIsUnitialized
    } = useGetPersonnelByIdQuery(id, {
        skip: id === null,
        refetchOnMountOrArgChange: true
    })
    useEffect(() => {
        if (!personnelIsFetching && !personnelError && !personnelIsUnitialized) {
            formik.setValues(personnelData)
        }
    }, [personnelIsFetching])

    /* -------------------------------- Mutations ------------------------------- */
    const [createPersonnel, createResults] = useCreatePersonnelMutation();
    const [updatePersonnel, updateResults] = useUpdatePersonnelMutation();
    /* -------------------------------------------------------------------------- */
    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            !!id
                ? await updatePersonnel({ id, args: values }).unwrap().then(onClose).catch((error) => console.error(error))
                : await createPersonnel({ args: values }).unwrap().then(onClose).catch((error) => console.error(error))
        },
    });

    // Reset the form whenever the modal closes
    useEffect(() => {
        if (!open && !id) {
            formik.resetForm();
        }
    }, [open]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" mb={3}>
                    {!!id ? "ویرایش پرسنل" : "افزودن پرسنل"}
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={2}>
                        <TextField
                            name="code"
                            label="کد"
                            fullWidth
                            value={formik.values.code}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.code && Boolean(formik.errors.code)}
                            helperText={formik.touched.code && formik.errors.code}
                        />
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