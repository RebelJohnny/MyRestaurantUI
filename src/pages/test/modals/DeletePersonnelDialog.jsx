import { useDeletePersonnelMutation } from "@/features/api/personnelApis";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function DeletePersonnelDialog({ id, open, onClose }) {
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------- Mutations ------------------------------- */
    const [deletePersonnel, deleteResults] = useDeletePersonnelMutation();
    const handleDelete = async () => {
        await deletePersonnel(id).unwrap().then(onClose).catch((error) => console.error(error))
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
                    {"حذف پرسنل"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        آیا از حذف پرسنل مطمئنید؟
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