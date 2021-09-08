import AuthService from "./AuthService";

const authHeader = () => {
	const user = AuthService.getCurrentUser();

	if (user && user.token) {
		return { Authorization: user.tokenType + " " + user.token };
	} else {
		return {};
	}
}

export default authHeader;