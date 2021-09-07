import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";
import {useHistory} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import AuthService from "../service/AuthService";

const LoginPage = () => {
	const initialValues = {username : "", password : ""}
	const schema = Yup.object({
		username : Yup.string().required("No username provided."),
		password : Yup.string()
			.required('No password provided.')
			// .min(8, 'Password is too short - should be 8 chars minimum.')

	})

	const notify = (success) => {
		success ?
		toast.success('Login is successful!', {
			position: "bottom-right",
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			pauseOnFocusLoss: false
		})
		:
		toast.error('Login failed!', {
			position: "bottom-right",
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined,
			pauseOnFocusLoss: false
		});
	}

	const history = useHistory();

	const sleep = (milliseconds) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}

	const handleSubmit = async (values, actions) => {
		actions.resetForm();

		const response = await AuthService.signin(values);

		if (response) {
			notify(true);
			await sleep(1500);
			history.push("/");
		}
		else {
			notify(false);
		}


	}

	const formik = useFormik(
		{initialValues : initialValues,
		validationSchema : schema,
		onSubmit : (async (values, actions) => handleSubmit(values, actions))},
		)

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [])


	return (
		<div>
			<h1>Login Page</h1>
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
			<ToastContainer position="bottom-right"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							draggable/>
		</div>
	);
};

export default LoginPage;
