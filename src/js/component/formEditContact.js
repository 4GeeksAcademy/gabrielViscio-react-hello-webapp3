import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const editContact = () => {
	const { store, actions } = useContext(Context);
	const [contact, setContact] = useState({
		name: "",
		email: "",
		address: "",
		phone: ""
	});

	const handleChange = (e) => {
		setContact({
			...contact,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		actions.addContact(contact);
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">name</label>
					<textarea className="form-control" id="name" name="name" rows="3" onChange={handleChange} />
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">email</label>
					<input type="email" className="form-control" id="email" name="email" onChange={handleChange} />
				</div>
				<div className="mb-3">
					<label htmlFor="phone" className="form-label">Phone</label>
					<textarea className="form-control" id="phone" name="phone" rows="3" onChange={handleChange} />
				</div>
				<div className="mb-3">
					<label htmlFor="address" className="form-label">Address</label>
					<textarea className="form-control" id="address" name="address" rows="3" onChange={handleChange} />
				</div>
                <Link to="/">
				<button type="submit" className="btn btn-primary">Save</button>
                </Link>
			</form>
			<Link to="/">
				<button className="btn btn-primary">or get back to Contacts</button>
			</Link>
		</div>
	);
};