import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

export default function DemoApp(){
    const [eventData, setEventData] = useState([]);
    const [user, token] = useAuth();

    useEffect(() => {
    const getEvents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/user_tasks', {headers: {Authorization: 'Bearer ' + token}});
            const events = response.data.map((el) => ({title: el.task, date:el.start_date}));
            setEventData(events);
        } catch (error) {
            console.error(error);
        }
    };
        getEvents();
    }, [token]);

const handleDateClick = (arg) => { // bind with an arrow function
    alert(arg.dateStr);
};

    return (
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        dateClick={handleDateClick}
        initialView="dayGridMonth"
        weekends={true}
        events={eventData}
      />
    );
    }
