import { useApiErrorAlert } from "@/components/ErrorSwal";
import { useDeleteMealPeriodMutation } from "@/features/api/mealPeriodApis";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function DeleteMealPeriodDialog({ id, open, onClose }) {
    const showApiError = useApiErrorAlert();
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------- Mutations ------------------------------- */
    const [deleteMealPeriod, deleteResults] = useDeleteMealPeriodMutation();
    const handleDelete = async () => {
        await deleteMealPeriod(id).unwrap().then(onClose).catch((error) => {
            console.log(error)
            showApiError(error)
        })
    }
    /* -------------------------------------------------------------------------- */
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog"
            >
                <DialogTitle id="alert-dialog-title">
                    {"حذف وعده غذایی"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        آیا از حذف وعده غذایی مطمئنید؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} autoFocus>
                        بازگشت
                    </Button>
                    <Button loading={deleteResults.isLoading} onClick={handleDelete}>بله</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}