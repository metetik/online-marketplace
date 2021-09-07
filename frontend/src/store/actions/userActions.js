export const SET_USER = "SET_USER";
export const GET_USER = "GET_USER";
export const CLEAR_USER = "CLEAR_USER";

export const setUser = (user) => {
	return {
		type : SET_USER,
		payload : user
	}
};

export const getUser = (user) => {
	return {
		type : GET_USER,
		payload : user
	}
};

export const clearUser = (user) => {
	return {
		type : CLEAR_USER,
		payload : user
	}
};