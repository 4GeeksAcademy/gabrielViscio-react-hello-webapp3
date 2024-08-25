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
                    id: 1, // Asegúrate de que cada contacto tenga un id único
                    name: "Gabriel",
                    address: "Las viñas",
                    phone: "123456789",
                    email: "gabriel@example.com"
                },
                {
                    id: 2, // Asegúrate de que cada contacto tenga un id único
                    name: "SECOND",
                    address: "White",
                    phone: "987654321",
                    email: "second@example.com"
                }
            ]
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            loadSomeData: () => {
                fetch('https://playground.4geeks.com/contact/agendas/marypoppins/contacts')
                    .then(response => response.json())
                    .then(data => {
                        setStore({ contacts: data.contacts });
                    })
                    .catch(error => console.error('Error fetching data:', error));
            },

            deleteContact: (indexToDelete) => {
                const store = getStore();
                const requestOptions = {
                    method: "DELETE",
                    redirect: "follow"
                };
                
                fetch(`https://playground.4geeks.com/contact/agendas/marypoppins/contacts/${store.contacts[indexToDelete].id}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result);
                        getActions().loadSomeData();
                    })
                    .catch(error => console.error('Error deleting contact:', error));
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
                    .then(response => response.text())
                    .then(result => {
                        console.log(result);
                        getActions().loadSomeData();
                    })
                    .catch(error => console.error('Error adding contact:', error));
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },

            updateContact: (id, updatedContact) => {
                const requestOptions = {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedContact),
                };
                
                fetch(`https://playground.4geeks.com/contact/agendas/marypoppins/contacts/${id}`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result);
                        getActions().loadSomeData();
                    })
                    .catch(error => console.error('Error updating contact:', error));
            }
        }
    };
};

export default getState;
