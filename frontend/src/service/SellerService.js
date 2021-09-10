import axios from "axios";
import authHeader from "./authHeader";

const ProductService = (function () {
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
		getBlackList : _getBlackList,
		removeFromBlackList : _removeFromBlackList
	};
})();

export default ProductService;