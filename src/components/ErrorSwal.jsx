import { useTheme } from '@emotion/react';
import Swal from 'sweetalert2';
import 'sweetalert2/themes/material-ui.css'

export const useApiErrorAlert = () => {
    const theme = useTheme();
    const showApiError = (problemDetails) => {
        Swal.fire({
            icon: 'error',
            title: problemDetails?.title || 'خطا',
            text: problemDetails?.detail || 'خطایی در پردازش درخواست رخ داد.',
            confirmButtonText: 'باشه',
            width: 'min(400px, calc(100vw - 32px))',
            confirmButtonColor: theme.palette.primary.main,
            customClass: {
                container: 'api-error-container',
                popup: 'api-error-popup',
                confirmButton: 'api-error-confirm-button',
            },
        });
    }
    return showApiError;
};