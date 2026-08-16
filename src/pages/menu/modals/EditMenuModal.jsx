import { useCallback, useEffect } from "react";
import { FormikProvider, useFormik } from "formik";
import {
    Box,
    Button,
    Modal,
    Stack,
    Typography,
} from "@mui/material";
import { useUpdateMenuMutation } from "@/features/api/menuApis";
import MealsSelect from "./MealsSelect";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: '90vw', sm: 400 },
    maxWidth: '95vw',
    maxHeight: '90vh',
    overflowY: 'auto',
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 3,
};

export default function MenuModal({ rowData, mealPeriodId, open, onClose }) {
    /* -------------------------------- Mutations ------------------------------- */
    const [updateMenu, updateResults] = useUpdateMenuMutation();
    /* -------------------------------------------------------------------------- */
    const formik = useFormik({
        initialValues: {
            mealIds: [],
        },
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            var submitValues = mapSubmitValues(values);
            await updateMenu(submitValues).unwrap().then(onClose).catch((error) => console.error(error))
        },
    });
    useEffect(() => {
      formik.setFieldValue('mealIds', rowData?.meals.map((m) => m.id))
    }, [rowData])
    

    const mapSubmitValues = useCallback(
        (values) => {
            let submitValues = JSON.parse(JSON.stringify(values));
            submitValues.date = rowData.date
            submitValues.mealPeriodId = mealPeriodId
            return submitValues;
        },
        [formik.values]
    )

    // Reset the form whenever the modal closes
    useEffect(() => {
        if (!open) {
            formik.resetForm();
        }
    }, [open]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" mb={3}>
                    {"ویرایش منو"}
                </Typography>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <MealsSelect />
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
                                loading={updateResults.isLoading}
                            >
                                ثبت
                            </Button>
                        </Stack>
                    </form>
                </FormikProvider>
            </Box>
        </Modal>
    );
}