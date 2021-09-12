// Only admin can see
import React, {useEffect, useState} from 'react';
import {Button, Container, Divider, List, Transition} from "semantic-ui-react";
import {useHistory} from "react-router-dom";
import UsersService from "../service/UsersService";
import toastify from "../util/ToastifyUtil";
import {useFormik} from "formik";
import * as Yup from "yup";
import AuthService from "../service/AuthService";
import {StatusCodes} from "http-status-codes";

const UsersPage = () => {
	const [users, setUsers] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [flag, setFlag] = useState(false);
	const history = useHistory();
	const initialValues = {username : "", password : "", repassword : "", roles : ""}

	const getUsers = () => {
		UsersService.getAll()
			.then((response) => {
				if (response && response.status === StatusCodes.OK) {
					setUsers(response.data);
				}
				else if (response && response.status === StatusCodes.UNAUTHORIZED) {
					history.push("/login", {authError : true});
				}
			})
			.catch(reason => {
				console.log(reason);
			});
	}

	useEffect(() => {
		getUsers();
		window.scrollTo(0, 0);
	},[showForm,flag]);

	const schema = Yup.object({
		username : Yup.string().required("No username provided."),
		password : Yup.string().required("No password provided."),
		repassword : Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
		role : Yup.string().required("Please select a role")
	});

	const formik = useFormik(
		{initialValues : initialValues,
			validationSchema : schema,
			onSubmit : (async (values, actions) => handleSubmit(values, actions))},
	);

	const handleSubmit = async (values, actions) => {
		actions.resetForm();

		const credentials = {"username" : values.username,
							 "password" : values.password,
							 "role" : [values.role]}

		const response = await AuthService.signup(credentials);
		if((response && response.status === StatusCodes.OK)) {
			toastify("success", "User is added to system");
			setFlag(prevState => (!prevState));
		} else if (response && response.status === StatusCodes.UNAUTHORIZED) {
			history.push("/login", {authError : true});
		} else {
			toastify("error", "User couldnt be added to system");
		}
	}

	const handleRemoveUser = (userId) => {
		UsersService.removeUser(userId).then((response) => {
			if (response.status === StatusCodes.OK) {
				toastify("success", "User is removed");
				setFlag(prevState => (!prevState));
			}
			else if (response && response.status === StatusCodes.UNAUTHORIZED) {
				history.push("/login", {authError : true});
			}
			else {
				toastify("error", "User couldn't be removed");
			}
		});
	}

	const toggleVisibility = () => {
		setShowForm((prevState) => (!prevState));
	}

	return (
		<div>
			<h1>Users</h1>
			<Divider/>
			<List divided verticalAlign="middle">
				{!! users && users.map((user) =>(
					<List.Item key={user.id}>
						<List.Content floated="right">
							<Button basic compact color="red" onClick={() => handleRemoveUser(user.id)}>Remove</Button>
						</List.Content>
						<List.Content><h3>{user.username}</h3></List.Content>

					</List.Item>
				))}
			</List>
			<Divider hidden />
			<Button basic primary
				content={showForm ? "Hide" : "Add"}
				onClick={() => toggleVisibility()}
			/>
			<Divider hidden />
			<Transition.Group animation="fly down" duration={500}>
				{showForm && (
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
						<div className="field">
							<label>Confirm Password</label>
							<input
								type="password"
								name="repassword"
								placeholder="Confirm Password"
								onChange={formik.handleChange}
								value={formik.values.repassword}/>
							{formik.errors.repassword &&
							<div className="ui pointing red basic label">
								{formik.errors.repassword}</div>
							}
						</div>
						<div className="field">
							<label>Role</label>
							<select id="role" name="role" onChange={formik.handleChange}>
								<option value="" hidden>Role</option>
								<option value="USER">User</option>
								<option value="ADMIN">Admin</option>
							</select>
							{formik.errors.role &&
							<div className="ui pointing red basic label">
								{formik.errors.role}</div>
							}
						</div>
						<Container textAlign="right">
							<button className="ui positive basic button" type="submit">Add</button>
						</Container>
					</form>
					)}
			</Transition.Group>
		</div>
	);
};

export default UsersPage;