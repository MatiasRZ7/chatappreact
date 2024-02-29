import React, { useEffect } from 'react'
import { useState } from 'react';
import { addDoc, collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'; 
import { auth, db } from '../firebase-config';
import { serverTimestamp } from 'firebase/firestore';
import '../styles/Chat.css';
export const Chat = (props) => {

    const [newMessage, setNewMessage] = useState('');
    const messageRef = collection(db, 'messages');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const queryMessages = query(messageRef, where ("room", "==", props.room), orderBy("createdAt"));
        const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id})
            });
            setMessages(messages);
        });
        return () => unsuscribe();

    }, [messageRef, props.room]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: props.room
        });
        setNewMessage('');
    }
  return (
    <div className='chat-app'>
        <div className='header'>
            <h1>Welcome to: {props.room.toUpperCase()} </h1>
        </div>
        <div className='messages'> {messages.map((message) => (
            <div className='message' key={message.id}>
                <span className='user'>{message.user}</span>
                {message.text}
            </div>
        ) )} </div>
    <form className='new-message-form' onSubmit={handleSubmit}>
        <input className='new-message-input' placeholder='Type your message here' 
        onChange={(e) => setNewMessage(e.target.value)} value={newMessage}/>
        <button className='send-button' type='submit'>Send</button>
    </form>
    </div>
  )
}
