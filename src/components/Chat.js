import React, { useState, useEffect } from 'react';
import '../styles/chat.css'
import { Avatar, IconButton } from '@mui/material';
import { AttachFile, InsertEmoticon, MicOutlined, MoreVert, SearchOutlined } from '@mui/icons-material';
import { useParams } from 'react-router';
import db from '../firebase';
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useStateValue } from './StateProvider';

function Chat() {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const [roomName, setRoomName] = useState('');
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        setSeed(Math.random() * 10000);
    }, []);

    useEffect(() => {
        if (roomId) {
            console.log(serverTimestamp())
            var roomDocRef = doc(db, 'rooms', roomId);
            onSnapshot(roomDocRef, roomSnapShot => {
                var roomData = roomSnapShot.data();
                console.log(roomData);
                setRoomName(roomData.name);
            }, err => {
                console.log(err);
            })

            var messagesCollectionRef = collection(db, 'rooms', roomId, 'messages');

            var messagesQuery = query(messagesCollectionRef, orderBy('timestamp', 'asc'));
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
    }, [roomId]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (roomId) {
            var messageCollection = collection(db, 'rooms', roomId, 'messages');
            await addDoc(messageCollection, {
                message: input,
                name: user.displayName,
                timestamp: serverTimestamp()
            })
            setInput('');
        }
    }

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${seed}`} />
                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen {" "} {new Date(messages[messages.length - 1]?.timestamp?.seconds * 1000).toLocaleString()}</p>
                </div>

                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className='chat__body'>
                {messages.map(message => (
                    <p className={`chat__message 
                        ${(message.name === user.displayName) && 'chat__reciever'}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {new Date(message.timestamp?.seconds * 1000).toLocaleString()}
                            {/* {new Date(message.timestamp.seconds)?.toLocaleString()} */}
                        </span>
                    </p>
                ))}
            </div>
            <div className='chat__footer'>
                <InsertEmoticon />
                <form>
                    <input type='text' value={input} onChange={e => setInput(e.target.value)} placeholder='Type a message' />
                    <button type='submit' onClick={sendMessage}>Send a message</button>
                </form>
                <MicOutlined />
            </div>
        </div>
    )
}

export default Chat