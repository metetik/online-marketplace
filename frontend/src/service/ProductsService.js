import axios from "axios";
import authHeader from "./authHeader";

const ProductService = (function () {
	const _getAll = async () => {
		try {
			const response = await axios.get("/api/product/get-all", { headers : authHeader()});

			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	const _getAllByPage = async (pageNo, pageSize) => {
		try {
			const response = await axios.get("/api/product/get-all-by-page", { headers : authHeader(),
			params : {"page-no" : pageNo,
				"page-size" : pageSize}});

			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	const _getById = async (id) => {
		try {
			const response = await axios.get("/api/product/get", { headers : authHeader(), params : {"id" : id}});
			console.log("resp : " + response);

			return response;
		} catch (error) {
			console.log("err : " + error);

			return error.response;
		}
	};

	return {
		getAll : _getAll,
		getAllByPage : _getAllByPage,
		getById : _getById
	};
})();

export default ProductService;