import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

const baseButtonClass =
  'text-white px-4 py-2 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition';

const AlertUtil = {
  info: (text: string, title = '안내') =>
    Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonText: '확인',
      buttonsStyling: false,
      customClass: {
        confirmButton: `${baseButtonClass} bg-blue-500 hover:bg-blue-600 focus:ring-blue-400`,
      },
    }),

  success: (text: string, title = '성공') =>
    Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonText: '확인',
      buttonsStyling: false,
      customClass: {
        confirmButton: `${baseButtonClass} bg-green-500 hover:bg-green-600 focus:ring-green-400`,
      },
    }),

  error: (text: string, title = '에러') =>
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText: '확인',
      buttonsStyling: false,
      customClass: {
        confirmButton: `${baseButtonClass} bg-red-500 hover:bg-red-600 focus:ring-red-400`,
      },
    }),

  confirm: (text: string, title = '확인') =>
    Swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니오',
      buttonsStyling: false,
      customClass: {
        confirmButton: `${baseButtonClass} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 mr-2`,
        cancelButton: `${baseButtonClass} bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-300`,
      },
    }),

  sideConfirm: (text: string, title = '확인') =>
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title,
      text,
      showConfirmButton: false,
      timer: 1200,
    }),
};

export default AlertUtil;
