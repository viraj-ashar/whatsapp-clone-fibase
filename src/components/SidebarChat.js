import React, { useEffect, useState } from 'react';
import '../styles/sidebarChat.css';
import { Avatar } from '@mui/material';

function SidebarChat({ addNewChat }) {
    console.log(addNewChat);
    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.random() * 10000);
    }, []);

    const createChat = () => { 
        const roomName = prompt('Please enter name for chat');
        if(roomName) {
            
        }
    }

    return !addNewChat ? (
        <div className='sidebarChat'>
            <Avatar src={`https://api.dicebear.com/6.x/adventurer-neutral/svg?seed=${seed}`} />
            <div className='sidebarChat__info'>
                <h2>Room Name</h2>
                <p>Last message...</p>
            </div>
        </div>
    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat