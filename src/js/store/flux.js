const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			contacts: [
				{
					name: "Gabriel",
					address: "Las viñas"
				},
				{
					name: "SECOND",
					address: "White"
				}
			]
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			loadSomeData: () => {
				setStore({
					contacts: [
						{
							name: "contacto desde flux",
							address: "La dirección 2"
						},
						{
							name: "contacto de prueba",
							address: "La dirección prueba 2"
						}
					]
				});
				console.log('esta funcionando useefect')
				setStore({ contacts: [{
					name: "contacto desde flux",
					address: "La dirección 2"
				},
				{
					name: "contacto de prueba",
					address: "La dirección prueba 2"
				}] });
				fetch('https://playground.4geeks.com/contact/agendas/marypoppins/contacts')
					.then(response => response.json())
					.then(data => {
						setStore({contacts: data.contacts });
					})
					.catch(error => console.error('Error fetching data:', error));
			},

			deleteContact: (indexToDelete) => {
				const store = getStore();
				const updatedContacts = store.contacts.filter((_, index) => index !== indexToDelete);
				//setStore({ contacts: updatedContacts });
				const requestOptions = {
					method: "DELETE",
					redirect: "follow"
				  };
				  
				  fetch(`https://playground.4geeks.com/contact/agendas/marypoppins/contacts/${store.contacts[indexToDelete].id}`, requestOptions)					.then((response) => response.text())
					.then((result) => {
						console.log(result)
					
						fetch('https://playground.4geeks.com/contact/agendas/marypoppins/contacts')
					.then(response => response.json())
					.then(data => {
						setStore({contacts: data.contacts });
					})
					.catch(error => console.error('Error fetching data:', error));


					})
			},


			addContact: (contact) => {
				const myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");

				const raw = JSON.stringify({
					name: contact.name,
					phone: contact.phone,
					email: contact.email,
					address: contact.address
				});

				const requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: raw,
					redirect: "follow"
				};

				fetch("https://playground.4geeks.com/contact/agendas/marypoppins/contacts", requestOptions)
					.then((response) => response.text())
					.then((result) => {
						console.log(result);
						// Recargar los contactos después de agregar el nuevo
						getActions().loadSomeData();
					})
					.catch((error) => console.error("Error adding contact:", error));
			},

       

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
