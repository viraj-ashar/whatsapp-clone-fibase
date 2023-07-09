import React, { useEffect, useState } from 'react';
import '../styles/sidebar.css'
import { Avatar, IconButton } from '@mui/material';
import { DonutLarge, Chat, MoreVert, SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import db from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore'
import { useStateValue } from './StateProvider';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    function getDocFromCollection() {
        // update it with onSnapshot functionality
        var roomsCollectionRef = collection(db, 'rooms');
        onSnapshot(roomsCollectionRef,
            snapshot => {
                var newRooms = [];
                snapshot.forEach(doc => {
                    var room = {
                        id: doc.id,
                        data: doc.data()
                    };
                    newRooms.push(room);
                })
                setRooms(newRooms);
            }, error => {
                console.log(error);
            }
        );
    }

    useEffect(() => {
        return () => {
            getDocFromCollection();
        }
    }, []);

    return (
        <div className='sidebar'>
            <div className='sidebar__header'>
                <IconButton>
                    <Avatar src={user?.photoURL} />
                </IconButton>

                <div className='sidebar__headerRight'>
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className='sidebar__search'>
                <div className='sidebar__searchContainer'>
                    <SearchOutlined />
                    <input placeholder='Search or start new chat' type='text' />
                </div>
            </div>
            <div className='sidebar__chats'>
                <SidebarChat addNewChat />
                {
                    rooms.map(room => (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar