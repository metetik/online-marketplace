import axios from "axios";
import authHeader from "./authHeader";

const ProductService = (function () {
	const _getAllByPage = async (pageNo, pageSize) => {
		try {
			const response = await axios.get("/api/product/get-all-by-page", { headers : authHeader(),
				params : {"page-no" : pageNo,
					"page-size" : pageSize}});

			return response;
		} catch (error) {
			console.log(error);
		}
	};

	const _getAllByPageContains = async (pageNo, pageSize, values) => {
		try {
			const response = await axios.get("/api/product/get-all-by-page-contains", { headers : authHeader(),
				params : {"page-no" : pageNo,
					"page-size" : pageSize,
					"query-word" : values.word}});

			return response;
		} catch (error) {
			console.log(error);
		}
	};

	const _getAllByPageWithoutBlackList = async (pageNo, pageSize) => {
		try {
			const response = await axios.get("/api/product/get-all-by-page-without-blacklist", { headers : authHeader(),
			params : {"page-no" : pageNo,
				"page-size" : pageSize}});

			return response;
		} catch (error) {
			console.log(error);
		}
	};

	const _getAllByPageWithoutBlackListContains = async (pageNo, pageSize, values) => {
		try {
			const response = await axios.get("/api/product/get-all-by-page-without-blacklist-contains", { headers : authHeader(),
				params : {"page-no" : pageNo,
					"page-size" : pageSize,
					"query-word" : values.word}});

			return response;
		} catch (error) {
			console.log(error);
		}
	};

	const _getById = async (id) => {
		try {
			const response = await axios.get("/api/product/get", { headers : authHeader(), params : {"id" : id}});

			return response;
		} catch (error) {
			return error;
		}
	};

	const _addToFavorites = async (id) => {
		try {
			const response = await axios.get("/api/favorite-list/add", { headers : authHeader(), params : {"id" : id}});

			return response;
		} catch (error) {
			console.log("err : " + error);

			return error;
		}
	};

	const _addToBlackList = async (id) => {
		try {
			const response = await axios.get("/api/black-list/add", { headers : authHeader(), params : {"id" : id}});

			return response;
		} catch (error) {

			return error;
		}
	};

	const _getFavorites = async () => {
		try {
			const response = await axios.get("/api/favorite-list/get-favorites", { headers : authHeader()});

			return response;
		} catch (error) {
			console.log("err : " + error);
		}
	};

	const _removeFromFavorites = async (id) => {
		try {
			const response = await axios.get("/api/favorite-list/remove", { headers : authHeader(), params : {"id" : id}});

			return response;
		} catch (error) {
			console.log("err : " + error);

			return error;
		}
	};

	const _removeProduct = async (id) => {
		try {
			const response = await axios.get("/api/product/remove", { headers : authHeader(), params : {"id" : id}});

			return response;
		} catch (error) {
			console.log("err : " + error);

			return error;
		}
	};


	const _addProduct = async (values) => {
		try {
			const response = await axios.post("/api/product/add", values, { headers : authHeader()});

			return response;
		} catch (error) {
			console.log("err : " + error);

			return error;
		}
	};

	return {
		getAllByPageWithoutBlackList : _getAllByPageWithoutBlackList,
		getAllByPage : _getAllByPage,
		getById : _getById,
		addToFavorites : _addToFavorites,
		addToBlackList : _addToBlackList,
		getFavorites : _getFavorites,
		removeFromFavorites : _removeFromFavorites,
		removeProduct : _removeProduct,
		addProduct : _addProduct,
		getAllByPageContains : _getAllByPageContains,
		getAllByPageWithoutBlackListContains : _getAllByPageWithoutBlackListContains
	};
})();

export default ProductService;