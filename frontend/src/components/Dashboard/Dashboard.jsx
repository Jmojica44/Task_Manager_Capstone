import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import Download from '../ViewTaskPage/assets/download.png';
import Checkmark from '../ViewTaskPage/assets/checkmark.png';

import '../ViewTaskPage/ViewTaskPage.css';
import './Dashboard.css';
import EntriesChartTracker from '../Chart/Chart'
import GraphedChart from '../Chart/Chart';


const Dashboard = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [monthlyTasks, setMonthlyTasks] = useState([]);
  const [healthTasks, setHealthTasks] = useState([]);
  const [choreTasks, setChoreTasks] = useState([]);
  const [lifestyleTasks, setLifestyleTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [user, token] = useAuth();
  const [eventData, setEventData] = useState([]);
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
  
    
 
    useEffect(() => {
      const DemoApp = () => {
      if (calendarRef.current) {
        const calendar = calendarRef.current.getApi();
        calendar.setOption('editable', true);
      }};

      DemoApp();
    }, []);
  
  function getThisWeekRange() {
  const today = new Date();
  const currentDay = today.getDay();
  const startDate = new Date(today);
  const endDate = new Date(today);

  startDate.setDate(today.getDate() - currentDay);
  startDate.setHours(0, 0, 0, 0);

  endDate.setDate(today.getDate() + (6 - currentDay));
  endDate.setHours(23, 59, 59, 999);
  
  const startDateString = startDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
  const endDateString = endDate.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
  return `${startDateString} - ${endDateString}`;
}
  const handleClick = async (event, task_id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/user_tasks/${task_id}`, {headers: {Authorization: 'Bearer ' + token}})
      getAllTasks()
    } catch (error) {
  }
  };
  
  const handleClick2 = async (event, task_id) => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/user_tasks/${task_id}`, 
      { status: 'Completed',
        end_date: new Date().toJSON()
      }, {headers: {Authorization: 'Bearer ' + token}})
      console.log('Data updated successfully:', response.data);
      getAllTasks()
    } catch (error) {
      console.error('Error updating data:', error)
  }
  };

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
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

  async function getAllTasks() {
    let response = await axios.get(`http://127.0.0.1:5000/api/task`, {headers: {Authorization: 'Bearer ' + token}});
    setDailyTasks(response.data.filter(task => (task.timeframe === 'Daily' || task.timeframe === 'daily') && (task.status === 'Not Started' || task.status === 'Started' || task.status === 'started' || task.status === 'Not started')));
    setWeeklyTasks(response.data.filter(task => task.timeframe === 'Weekly' && (task.status === 'Not started' || task.status === 'Started' || task.status === 'Not started')));
    setMonthlyTasks(response.data.filter(task => task.timeframe === 'Monthly' && (task.status === 'Not started' || task.status === 'Started' || task.status === 'Not started')));
    setHealthTasks(response.data.filter(task => task.category === 'Health' && (task.status === 'Not started' || task.status === 'Started' || task.status === 'Not started')));
    setChoreTasks(response.data.filter(task => task.category === 'Chore' && (task.status === 'Not started' || task.status === 'Started' || task.status === 'Not started')));
    setLifestyleTasks(response.data.filter(task => task.category === 'Lifestyle' && (task.status === 'Not started' || task.status === 'Started' || task.status === 'Not started')));
    setCompletedTasks(response.data.filter(task => task.status === 'Completed'));
  } 



  useEffect(() => {
    getAllTasks();
  }, [])

    return (
    <div className='flex'>
      <div className='dashboard3'>Dashboard for {getThisWeekRange()} </div>
      <p className='dashboard4'>Total Points Completed: {" "} {completedTasks.reduce((sum, task) => {
        const startDate = new Date(getThisWeekRange().split(" - ")[0]);
        const endDate = new Date(getThisWeekRange().split(" - ")[1]);
        const taskEndDate = new Date(task.end_date);
      
        if (taskEndDate >= startDate && taskEndDate <= endDate) {
          return sum + task.point_value;
        } else {
          return sum;
        }
      }, 0)}</p>
      <div className='width3'>
    <div className='width'>
      <br></br>
      <h2 className='tasklist'>Task List</h2>
      <br></br>
      <div  className='bordered'>
        <div>
          <h2 className='dashboard2'>Daily Tasks</h2>
          <ul className='dashboard1 circle-list'>
            {dailyTasks.map(task => (
              <li className='' key={task.id}>
                <p key='{task.task}'className='text_size'>{task.task} 
                <img 
                  className="imgsize2" 
                  src={Download} 
                  alt="Delete"
                  onClick={(event) => handleClick(event, task.id)}
                  style={{ cursor: 'pointer'}}
                />
                <img 
                  className="imgsize2" 
                  src={Checkmark} 
                  alt="Complete"
                  onClick={(event) => handleClick2(event, task.id)}
                  style={{ cursor: 'pointer'}}
                />
                </p>
              </li>
            ))}
          </ul>
        </div>
        <br></br>
        <div>
          <h2 className='dashboard2'>Weekly Tasks</h2>
          <ul className='dashboard1 circle-list'>
            {weeklyTasks.map(task => (
              <li className='border' key={task.id}>
                <p className='text_size'>{task.task}
                <img 
                  className="imgsize2" 
                  src={Download} 
                  alt="Delete"
                  onClick={(event) => handleClick(event, task.id)}
                  style={{ cursor: 'pointer'}}
                />
                <img 
                  className="imgsize2" 
                  src={Checkmark} 
                  alt="Complete"
                  onClick={(event) => handleClick2(event,task.id)}
                  style={{ cursor: 'pointer'}}
                />
                </p>
              </li>
            ))}
          </ul>
        </div>
        <br></br>
        <div>
          <h2 className='dashboard2'>Monthly Tasks</h2>
          <ul className='dashboard1 circle-list'>
            {monthlyTasks.map(task => (
              <li className='border' key={task.id}>
                <p className='text_size'>{task.task}
                <img 
                  className="imgsize2" 
                  src={Download} 
                  alt="Delete"
                  onClick={(event) => handleClick(event, task.id)}
                  style={{ cursor: 'pointer'}}
                />
                <img 
                  className="imgsize2" 
                  src={Checkmark} 
                  alt="Complete"
                  onClick={(event) => handleClick(event, task.id)}
                  style={{ cursor: 'pointer'}}
                />
                </p>
              </li>
            ))}
          </ul>
          <br className='bottom'></br>
        </div>
        <h2 className='dashboard2'>Completed</h2>
        <ul className='dashboard1 circle-list'>
          {completedTasks.map(task => (
            <li className='border' key={task.id}>
              <p className='text_size'>{task.task} 
              <img 
                  className="imgsize2" 
                  src={Download} 
                  alt="Delete"
                  onClick={(event) => handleClick(event, task.id)}
                  style={{ cursor: 'pointer'}}
                />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div>   
        <div  className='width2'>
        <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            dateClick={handleDateClick}
            initialView="dayGridMonth"
            weekends={true}
            events={eventData}
            eventDrop={handleEventDrop}
            displayEventTime={false}
        />
        </div>
    </div>
    <div className='chartformat'>
      <GraphedChart/>
    </div>
    </div>
    </div>
  )};

    export default Dashboard;
