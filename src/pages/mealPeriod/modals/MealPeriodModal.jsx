import { useCallback, useEffect } from "react";
import { useFormik } from "formik";
import {
    Box,
    Button,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useCreateMealPeriodMutation, useGetMealPeriodByIdQuery, useUpdateMealPeriodMutation } from "@/features/api/mealPeriodApis";
import { toTimeOfDayInt, toTimeString } from "@/utils/timeFunctions";


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

export default function MealPeriodModal({ id, open, onClose }) {
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* --------------------------------- Queries -------------------------------- */
    const {
        data: mealPeriodData,
        isFetching: mealPeriodIsFetching,
        error: mealPeriodError,
        isUninitialized: mealPeriodIsUnitialized
    } = useGetMealPeriodByIdQuery(id, {
        skip: id === null,
        refetchOnMountOrArgChange: true
    })
    useEffect(() => {
        if (!mealPeriodIsFetching && !mealPeriodError && !mealPeriodIsUnitialized) {
            var temp = JSON.parse(JSON.stringify(mealPeriodData))
            temp.time = toTimeString(mealPeriodData.time)
            formik.setValues(temp)
        }
    }, [mealPeriodIsFetching])

    /* -------------------------------- Mutations ------------------------------- */
    const [createMealPeriod, createResults] = useCreateMealPeriodMutation();
    const [updateMealPeriod, updateResults] = useUpdateMealPeriodMutation();
    /* -------------------------------------------------------------------------- */
    const formik = useFormik({
        initialValues: {
            name: "",
            time: "",
        },
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async (values) => {
            var submitValues = mapSubmitValues(values)
            !!id
                ? await updateMealPeriod({ id, args: submitValues }).unwrap().then(onClose).catch((error) => console.error(error))
                : await createMealPeriod({ args: submitValues }).unwrap().then(onClose).catch((error) => console.error(error))
        },
    });

    const mapSubmitValues = useCallback(
        (values) => {
            let submitValues = JSON.parse(JSON.stringify(values))
            submitValues.time = toTimeOfDayInt(values.time);
            return submitValues
        },
        [formik.values]
    )

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
                    {!!id ? "ویرایش وعده غذایی" : "افزودن وعده غذایی"}
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
                        <TextField
                            name="time"
                            label="ساعت"
                            fullWidth
                            value={formik.values.time}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.time && Boolean(formik.errors.time)}
                            helperText={formik.touched.time && formik.errors.time}
                        />
                        {/* <TimePicker
                            name="time"
                            label="ساعت"
                            value={formik.values.time}
                            onChange={formik.handleChange}
                        /> */}

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