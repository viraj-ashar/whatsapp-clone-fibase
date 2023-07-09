import React, { useEffect, useState } from 'react';
import '../styles/sidebarChat.css';
import { Avatar } from '@mui/material';
import db from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function SidebarChat({ id, addNewChat, name }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setSeed(Math.random() * 10000);
    }, []);

    useEffect(() => {
        if(id) {
            var messagesCollectionRef = collection(db, 'rooms', id, 'messages');
            var messagesQuery = query(messagesCollectionRef, orderBy('timestamp', 'desc'));
            onSnapshot(messagesQuery, messagesSnapshot => {
                var newMessages = [];
                messagesSnapshot.forEach(messageSnapshot => {
                    newMessages.push(messageSnapshot.data());
                })
                setMessages(newMessages);
            }, err => {
                console.log(err);
            })
        }
    }, [id]);


    const createChat = async () => {
        const roomName = prompt('Please enter name for chat room');
        if (roomName) {
            var roomsCollectionRef = collection(db, 'rooms');
            var newRoomData = { name: roomName };
            await addDoc(roomsCollectionRef, newRoomData);
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`} relative='path'>
            <div className='sidebarChat'>
                <Avatar src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${seed}`} />
                <div className='sidebarChat__info'>
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat