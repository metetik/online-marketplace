import axios from "axios";

const AuthService = (function () {
    const _signin = async (credentials) => {
        try {
            const response = await axios.post("/api/auth/login", credentials);

            if (response && response.data) {
                localStorage.setItem("user", JSON.stringify(response.data))
            }

            return response;
        } catch (error) {
            console.log(error);

            return error;
        }
    };

    const _logout = () => {
        localStorage.removeItem("user");
    }

    const _signup = async (credentials) => {
        try {
            return await axios.post("/api/auth/signup", credentials);
        } catch (error) {
            console.log(error);
        }
    }

    const _getCurrentUser = () => {
        return JSON.parse(localStorage.getItem("user"))
    }

    return {
        signin: _signin,
        logout: _logout,
        signup: _signup,
        getCurrentUser: _getCurrentUser
    };
})();

export default AuthService;
