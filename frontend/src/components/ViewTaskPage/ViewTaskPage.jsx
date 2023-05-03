import React, { useState, useEffect} from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const AddTaskPage = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [monthlyTasks, setMonthlyTasks] = useState([]);
  const [healthTasks, setHealthTasks] = useState([]);
  const [choreTasks, setChoreTasks] = useState([]);
  const [lifestyleTasks, setLifestyleTasks] = useState([]);
  const [user, token] = useAuth();
  
  async function getAllTasks() {
    let response = await axios.get(`http://127.0.0.1:5000/api/task`, {headers: {Authorization: 'Bearer ' + token}});
    setDailyTasks(response.data.filter(task => task.timeframe === 'Daily'));
    setWeeklyTasks(response.data.filter(task => task.timeframe === 'Weekly'));
    setMonthlyTasks(response.data.filter(task => task.timeframe === 'Monthly'));
    setHealthTasks(response.data.filter(task => task.category === 'Health'));
    setChoreTasks(response.data.filter(task => task.category === 'Chores'));
    setLifestyleTasks(response.data.filter(task => task.category === 'Lifestyle'));
  }

  useEffect(() => {getAllTasks()
  },[]);

  return (
    <div>
      <h1>Tasks Page</h1>
      <h2>Daily Tasks</h2>
      <ul>
        {dailyTasks.map(task => (
          <li key={task.task_id}>
            <p>Task: {task.task}</p>
            <p>Category: {task.category} </p>
            <p>Status: {task.status} </p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2>Weekly Tasks</h2>
      <ul>
        {weeklyTasks.map(task => (
          <li key={task.task_id}>
            <p>Task: {task.task}</p>
            <p>Category: {task.category} </p>
            <p>Status: {task.status} </p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2>Monthly Tasks</h2>
      <ul>
        {monthlyTasks.map(task => (
          <li key={task.task_id}>
            <p>Task: {task.task}</p>
            <p>Category: {task.category} </p>
            <p>Status: {task.status} </p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2>Health Tasks</h2>
      <ul>
        {healthTasks.map(task => (
          <li key={task.task_id}>
            <p>Task: {task.task}</p>
            <p>Timeframe: {task.timeframe} </p>
            <p>Status: {task.status} </p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2>Chores</h2>
      <ul>
        {choreTasks.map(task => (
          <li key={task.task_id}>
            <p>Task: {task.task}</p>
            <p>Timeframe: {task.timeframe} </p>
            <p>Status: {task.status} </p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2>Lifestyle</h2>
      <ul>
        {lifestyleTasks.map(task => (
          <li key={task.task_id}>
            <p>Task: {task.task}</p>
            <p>Timeframe: {task.timeframe} </p>
            <p>Status: {task.status} </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTaskPage;
