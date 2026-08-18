import { useApiErrorAlert } from "@/components/ErrorSwal";
import { useDeleteMealMutation } from "@/features/api/mealApis";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function DeleteMealDialog({ id, open, onClose }) {
    const showApiError = useApiErrorAlert();
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------- Mutations ------------------------------- */
    const [deleteMeal, deleteResults] = useDeleteMealMutation();
    const handleDelete = async () => {
        await deleteMeal(id).unwrap().then(onClose).catch((error) => {
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
                    {"حذف غذا"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        آیا از حذف غذا مطمئنید؟
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