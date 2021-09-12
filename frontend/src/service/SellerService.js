import axios from "axios";
import authHeader from "./authHeader";

const SellerService = (function () {
	const _getAll = async () => {
		try {
			const response = await axios.get("/api/seller/get-all", { headers : authHeader()});

			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	const _removeSeller = async (id) => {
		try {
			const response = await axios.get("/api/seller/remove", { headers : authHeader(), params : {"seller-id" : id}});

			return response;
		} catch (error) {
			console.log("err : " + error);

			return error.response;
		}
	};

	const _addSeller = async (seller) => {
		try {
			const response = await axios.post("/api/seller/add", seller,{headers : authHeader()});

			return response;
		} catch (error) {
			console.log("err : " + error);

			return error.response;
		}
	};

	const _getBlackList = async () => {
		try {
			const response = await axios.get("/api/black-list/get", { headers : authHeader()});

			return response.data;
		} catch (error) {
			console.log(error);
		}
	};
	const _removeFromBlackList = async (id) => {
		try {
			const response = await axios.get("/api/black-list/remove", { headers : authHeader(), params : {"id" : id}});

			return response;
		} catch (error) {
			console.log("err : " + error);

			return error.response;
		}
	};

	return {
		getAll : _getAll,
		addSeller : _addSeller,
		removeSeller : _removeSeller,
		getBlackList : _getBlackList,
		removeFromBlackList : _removeFromBlackList
	};
})();

export default SellerService;