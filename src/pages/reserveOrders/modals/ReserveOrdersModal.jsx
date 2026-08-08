import { useCallback } from "react";
import { FormikProvider, useFormik } from "formik";
import {
    Box,
    Modal,
    Typography,
} from "@mui/material";
import MealsSelect from "./MealsSelect";
import { useUpdatePersonnelReservedOrdersMutation } from "@/features/api/personnelApis";

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

export default function ReserveOrdersModal({ rowData, mealPeriodId, personnelId, open, onClose }) {
    /* -------------------------------- Mutations ------------------------------- */
    const [updateReserves, updateResults] = useUpdatePersonnelReservedOrdersMutation();
    /* -------------------------------------------------------------------------- */
    const formik = useFormik({
        initialValues: {
            personnelId: personnelId,
            date: rowData?.date,
            meals: rowData?.meals ?? [],
        },
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            var submitValues = mapSubmitValues(values);
            await updateReserves(submitValues).unwrap().then(onClose).catch((error) => console.error(error))
        },
    });

    const mapSubmitValues = useCallback(
        (values) => {
            let submitValues = JSON.parse(JSON.stringify(values));
            submitValues.meals.forEach(meal => {
                meal.mealPeriodId = mealPeriodId;
            });
            return submitValues;
        },
        [formik.values]
    )

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
                    {"ویرایش منو"}
                </Typography>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <MealsSelect />
                    </form>
                </FormikProvider>
            </Box>
        </Modal>
    );
}