import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan,faPen,faLocationDot,faEnvelope,faPhoneFlip } from '@fortawesome/free-solid-svg-icons';

import "../../styles/home.css";
import gatolentes from "../../img/gatolentes.jpg";

export const Home = () => {
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
							<div className="d-flex justify-content-between">
								<div className="" style={{margin:'auto',}}>
									<img 
										src={gatolentes} 
										alt="Descripción de la imagen" 
										style={{
											objectFit: 'cover',
											overflow: 'hidden', 
											width: '120px', 
											height: '120px', 
											borderRadius: '50%' 
										}} 
									/>
								</div>
								<div style={{marginLeft:'25px',}}>
									<p style={{fontSize:'26px'}}>{item.name}</p>
									<p style={{color:'gray'}}><FontAwesomeIcon icon={faLocationDot} />   {item.address}</p>
									<p style={{color:'gray'}}><FontAwesomeIcon icon={faPhoneFlip} />   {item.phone}</p>
									<p style={{color:'gray'}}><FontAwesomeIcon icon={faEnvelope} />   {item.email}</p>
								</div>
							</div>
							<div style={{marginRight:'20px', marginTop:'15px',}}>
								<Link to={`/editContact/${item.id}`}>
									<button className="btn btn-link text-dark"><FontAwesomeIcon icon={faPen} /></button>
								</Link>
								<button className="btn btn-link text-dark" onClick={() => actions.deleteContact(index)}>
									<FontAwesomeIcon icon={faTrashCan} />
								</button>
							</div>
					    </li>
					);
				})}
			</ul>
		</div>
	);
};
