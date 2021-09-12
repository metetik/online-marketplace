import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {useHistory, useLocation} from "react-router-dom";
import AuthService from "../service/AuthService";
import {setUser} from "../store/actions/userActions";
import {useDispatch} from "react-redux";
import {Message} from "semantic-ui-react";
import toastify from "../util/ToastifyUtil";
import {StatusCodes} from "http-status-codes";

const LoginPage = () => {
	const [authError, setAuthError] = useState(false);
	const initialValues = {username : "", password : ""};
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();

	const schema = Yup.object({
		username : Yup.string().required("No username provided."),
		password : Yup.string().required("No password provided.")
	})

	const sleep = (milliseconds) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}

	const handleSubmit = async (values, actions) => {
		actions.resetForm();
		const response = await AuthService.signin(values);

		if (response.status === StatusCodes.OK) {
			toastify("success", "Login is Successful!");
			const currentUser = AuthService.getCurrentUser();

			const userObject = {username : currentUser.username,
				role : currentUser.roles[0]};

			if (userObject) {
				dispatch(setUser(userObject));
			}
			await sleep(1500);

			history.push("/");
		}
		else {
			toastify("error", "Login failed!");
		}
	}

	const formik = useFormik(
		{initialValues : initialValues,
		validationSchema : schema,
		onSubmit : (async (values, actions) => handleSubmit(values, actions))},
		)

	useEffect(() => {
		window.scrollTo(0, 0);

		if (location.state){
			setAuthError(location.state);
		}

		return () => {
			setAuthError(false);
		}
	}, [])


	return (
		<div>
			<h1>Login</h1>
			{authError &&
			<Message warning>
				You must login to access this page!
			</Message>}

			<form className="ui form" onSubmit={formik.handleSubmit}>
				<div className="field">
					<label>Username</label>
					<input
					type="text"
					name="username"
					placeholder="Username"
					onChange={formik.handleChange}
					value={formik.values.username}/>

					{formik.errors.username &&
					<div className="ui pointing red basic label">
						{formik.errors.username}</div>
					}
				</div>
				<div className="field">
					<label>Password</label>
					<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={formik.handleChange}
					value={formik.values.password}/>
					{formik.errors.password &&
					<div className="ui pointing red basic label">
						{formik.errors.password}</div>
					}
				</div>
				<button className="ui primary basic button" type="submit">Login</button>
			</form>
		</div>
	);
};

export default LoginPage;
