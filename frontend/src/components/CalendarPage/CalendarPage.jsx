import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import "./CalendarPage.css";

export default function DemoApp() {
  const [eventData, setEventData] = useState([]);
  const [user, token] = useAuth();
  const calendarRef = useRef(null);
  const updatedStartDateRef = useRef(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/user_tasks', {
          headers: { Authorization: 'Bearer ' + token }
        });
        const events = response.data.map((el) => ({
          title: el.task,
          date: el.start_date,
          id: el.id 
        }));
        setEventData(events);
      } catch (error) {
        console.error(error);
      }
    };

    getEvents();
  }, [token]);

  const handleDateClick = (arg) => {
    const dateStr = arg.dateStr;
  };

  const handleEventDrop = (arg) => {
    const taskId = arg.event.id; 
    const newStartDate = arg.event.start.toISOString(); 
    updatedStartDateRef.current = newStartDate;
    updateTaskStartDate(taskId, newStartDate);
  };

  const updateTaskStartDate = async (taskId, newStartDate) => {
    try {
      await axios.put(
        `http://127.0.0.1:5000/api/user_tasks/${taskId}`,
        { start_date: newStartDate },
        { headers: { Authorization: 'Bearer ' + token } }
      );
      console.log('Task start date updated on the server.');
    } catch (error) {
      console.error('Error updating task start date:', error);
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendar = calendarRef.current.getApi();
      calendar.setOption('editable', true);
    }
  }, []);

  return (
      <div className='padding'>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={handleDateClick}
          initialView="dayGridMonth"
          weekends={true}
          events={eventData}
          eventDrop={handleEventDrop} // Add the eventDrop callback
          displayEventTime={false}
        />
      </div>
  );
}
