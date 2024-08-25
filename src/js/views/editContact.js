import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/editContact.css";

export const EditContact = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // Hook para navegar
    const [contact, setContact] = useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    });

    useEffect(() => {
        const contactToEdit = store.contacts.find(contact => contact.id === parseInt(id));
        if (contactToEdit) {
            setContact(contactToEdit);
        }
    }, [id, store.contacts]);

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.updateContact(id, contact);
        navigate(-1); // Regresar a la página anterior
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input className="form-control" id="name" name="name" value={contact.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={contact.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input className="form-control" id="phone" name="phone" value={contact.phone} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input className="form-control" id="address" name="address" value={contact.address} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
};
