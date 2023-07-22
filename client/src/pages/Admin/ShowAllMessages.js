import React, { useEffect, useState } from "react";
import axios from 'axios';
import Messages from "../../components/Admin/Messages";

const ShowAllMessages = (props) => {
	// Set messages as soon as page renderes
	const [allMessages, setAllMessages] = useState([]);

	/*
		1. Fetch all messages from json-server.
	*/
	const getAllMessages = async () => {
		const messages = await fetch("https://ecohub-mern-server.onrender.com/messages");
		let messagesJson = await messages.json();
		// messagesJson = JSON.parse(messagesJson);
		console.log(messagesJson);
		setAllMessages(messagesJson);
	};

	const onRemoveMessage = async (id) => {
		await fetch(`https://ecohub-mern-server.onrender.com/messages/${id}`, {
			method: "DELETE",
		});
		console.log("removed");
		window.location.reload("/admin/messages");
		await axios.post(`https://ecohub-mern-server.onrender.com/clear-redis`, {key: ''})
	};

	// as soon as page renders, execute this.
	useEffect(() => {
		getAllMessages();
	}, []);

	return (
		<div>
			{allMessages !== undefined && allMessages !== null && (
				<Messages
					messages={allMessages}
					onLogout={props.onLogout}
					onRemoveMessage={onRemoveMessage}
				/>
			)}
		</div>
	);
};

export default ShowAllMessages;
