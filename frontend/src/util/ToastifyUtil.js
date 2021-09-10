import {toast} from "react-toastify";

const toastify = (type, message) => {
	switch (type) {
		case "success":
			toast.success(message, {
				position: "bottom-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				pauseOnFocusLoss: false
			});

			break;
		case "error":
			toast.error(message, {
				position: "bottom-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				pauseOnFocusLoss: false
			})

			break;
		default:
			toast(message, {
				position: "bottom-right",
				autoClose: 1500,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined,
				pauseOnFocusLoss: false
			})
			break;
	}
};

export default toastify;
