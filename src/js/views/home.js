
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Home = () =>  {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<ul className="list-group">
				{store.contacts.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							style={{ background: item.background || "white" }}>
							<div>
								<span>{item.name}</span>
								<br />
								<span>{item.address}</span>
								<br />
								<span>{item.phone}</span>
								<br/>
								<span>{item.id}</span>
							</div>
							<button className="btn btn-danger" onClick={() => actions.deleteContact(index)}>
								Eliminar
							</button>
					    </li>
					);
				})}
			</ul>
		</div>
	);
};
