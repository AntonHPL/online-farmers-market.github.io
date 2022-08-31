import { useState, useContext, useEffect, FC, FormEvent, ReactElement } from "react";
import { Backdrop, TextField, IconButton, Paper, Typography, CircularProgress } from "@mui/material";
import { Block, Chat, Send } from "@mui/icons-material";
import Interlocutors from "./Interlocutors";
import { UserContext } from "./UserContext";
import axios from "axios";
import { MessageInterface, ModifiedChatInterface } from "../types";

const Chats: FC = () => {
	const [oldMessages, setOldMessages] = useState<Array<MessageInterface> | null>(null);
	const [newMessage, setNewMessage] = useState<MessageInterface | null>(null);
	const [allMessages, setAllMessages] = useState<Array<MessageInterface>>([]);
	const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
	const [messageText, setMessageText] = useState("");
	const [chatId, setChatId] = useState<string>("");
	const [chats, setChats] = useState<Array<ModifiedChatInterface> | null>(null);
	const [myId, setMyId] = useState("");
	const [isChatChosen, setIsChatChosen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(UserContext);

	useEffect(() => {
		const ws = new WebSocket("ws://localhost:3002");
		const textReceived = localStorage.getItem("message-text");
		ws.onopen = () => console.log("Connected to the WS Server.");
		ws.onmessage = message => setNewMessage(JSON.parse(message.data));
		setWebSocket(ws);
		textReceived && setMessageText(textReceived);
		return () => {
			localStorage.getItem("ad-id_selected") && localStorage.removeItem("ad-id_selected");
			textReceived && localStorage.removeItem("message-text");
			ws.close();
		};
	}, []);

	useEffect(() => {
		user && setMyId(user._id)
	}, [user]);

	const send = (e: FormEvent): void => {
		e.preventDefault();
		webSocket && webSocket.send(JSON.stringify({ senderId: myId, message: messageText }));
		setMessageText("");
	};

	useEffect(() => {
		newMessage &&
			axios.put("/api/chat", {
				message: newMessage, id: chatId,
			})
	}, [newMessage]);

	useEffect(() => {
		let arr: Array<MessageInterface> = [];
		if (newMessage) {
			arr = [...allMessages, newMessage];
		} else {
			if (oldMessages) {
				arr = oldMessages;
			}
		};
		if (arr.length) {
			let previousDate = new Date(arr[0].creationDate || "").toLocaleDateString();
			for (let i = 0; i < arr.length; i++) {
				const currentDate = new Date(arr[i].creationDate || "");
				const elementWithBreak = {
					...arr[i], break: currentDate.toLocaleDateString("en-US", {
						day: "numeric",
						month: "long",
					})
				};
				if (i === 0) {
					arr[i] = elementWithBreak;
				} else {
					if (currentDate.toLocaleDateString() !== previousDate) {
						previousDate = currentDate.toLocaleDateString();
						arr[i] = elementWithBreak;
					};
				}
			};
		};
		setAllMessages(arr);
	}, [newMessage, oldMessages]);

	useEffect(() => {
		allMessages.length && setLoading(false);
	}, [allMessages]);

	const isAdTitlePresent = chats?.find(el => el._id === chatId)?.adTitle;

	const backdrop = (): ReactElement => (
		<Backdrop
			className="backdrop"
			open={true}
		>
			<CircularProgress />
		</Backdrop>
	);

	return (
		<div className="chat-container">
			<>
				<Interlocutors
					myId={myId}
					chats={chats}
					setChats={setChats}
					newMessage={newMessage}
					setNewMessage={setNewMessage}
					chatId={chatId}
					setChatId={setChatId}
					setOldMessages={setOldMessages}
					setIsChatChosen={setIsChatChosen}
					setLoading = {setLoading}
				/>
				{!loading && chats ? (
					chats?.length ?
						<div className="chat-and-form">
							{isChatChosen ?
								<>
									<div className="chat">
										{allMessages?.map(el => {
											return (
												<>
													{el.break &&
														<div className="break">
															<Paper>
																{el.break}
															</Paper>
														</div>
													}
													<Paper
														className={el.senderId === myId ? "sent-message" : "received-message"}
													>
														{el.message}
														<div>
															{el.creationDate && new Date(el.creationDate)
																.toLocaleTimeString("en-US", {
																	hour: "numeric",
																	minute: "numeric"
																})
															}
														</div>
													</Paper>
												</>
											)
										})}
									</div>
									<form onSubmit={send}>
										<TextField
											required
											disabled={!isAdTitlePresent}
											type="text"
											size="small"
											variant="outlined"
											value={messageText}
											autoComplete="off"
											placeholder="Enter your Message"
											onChange={e => setMessageText(e.target.value)}
											className="form-row"
										/>
										<IconButton type="submit" disabled={!isAdTitlePresent}>
											<Send />
										</IconButton>
									</form>
								</>
								:
								<div className="choose-the-chat-plug">
									<div>
										<Chat />
										<Typography variant="h5">
											Choose the Chat...
										</Typography>
									</div>
								</div>
							}
						</div> :
						<div className="no-chats-plug">
							<div>
								<Block />
								<Typography variant="h5">
									No Chats...
								</Typography>
							</div>
						</div>
				) :
					backdrop()
				}
				{/* {loading && backdrop()} */}
			</>
		</div >
	);
};

export default Chats;