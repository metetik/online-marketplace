import {anonymousUser} from "../initialValues/anonymousUser";
import {CLEAR_USER, SET_USER} from "../actions/userActions";

const initialState = {
	user : anonymousUser
}

const userReducer = (state = initialState,{type, payload} ) => {
	switch (type) {
		case SET_USER:
			return {
				...state,
				user : payload
			}
		case CLEAR_USER:
			return {
				...state,
				user : initialState.user
			}
		default:
			return state;
	}
};

export default userReducer;
