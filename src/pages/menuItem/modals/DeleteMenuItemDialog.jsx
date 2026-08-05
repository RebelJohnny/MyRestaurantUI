import { useDeleteMenuItemMutation } from "@/features/api/menuItemApis";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function DeleteMenuItemDialog({ id, open, onClose }) {
    /* -------------------------------------------------------------------------- */
    /*                              Redux / RTKQuery                              */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------- Mutations ------------------------------- */
    const [deleteMenuItem, deleteResults] = useDeleteMenuItemMutation();
    const handleDelete = async () => {
        await deleteMenuItem(id).unwrap().then(onClose).catch((error) => console.error(error))
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