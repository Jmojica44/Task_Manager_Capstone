import React, { useState, useEffect} from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import "./ViewTaskPage.css";

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
    setChoreTasks(response.data.filter(task => task.category === 'Chore'));
    setLifestyleTasks(response.data.filter(task => task.category === 'Lifestyle'));
  }

  useEffect(() => {getAllTasks()
  },[]);

  return (
    <div>
      <h1>Tasks Page</h1>
      <h2>Daily Tasks</h2>
      <ul class='list'>
        {dailyTasks.map(task => (
          <li class='border' key={task.task_id}>
            <p class='text_size'>Task: {task.task}</p>
            <p class='text_size'>Category: {task.category} </p>
            <p class='text_size'>Status: {task.status} </p>
            {/* <a href="#"><img class="imgsize2" src="assets/download.png" alt="Delete"/> </a> */}
          </li>
        ))}
      </ul>
      <br></br>
      <h2>Weekly Tasks</h2>
      <ul class='list'>
        {weeklyTasks.map(task => (
          <li class='border' key={task.task_id}>
            <p class='text_size'>Task: {task.task}</p>
            <p class='text_size'>Category: {task.category} </p>
            <p class='text_size'>Status: {task.status} </p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2>Monthly Tasks</h2>
      <ul class='list'>
        {monthlyTasks.map(task => (
          <li class='border' key={task.task_id}>
            <p class='text_size'>Task: {task.task}</p>
            <p class='text_size'>Category: {task.category} </p>
            <p class='text_size'>Status: {task.status} </p>
          </li>
        ))}
      </ul>
      <br class='bottom'></br>
      <h2>Health Tasks</h2>
      <ul class='list'>
        {healthTasks.map(task => (
          <li class='border' key={task.task_id}>
            <p class='text_size'>Task: {task.task}</p>
            <p class='text_size'>Timeframe: {task.timeframe} </p>
            <p class='text_size'>Status: {task.status} </p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2>Chores</h2>
      <ul class='list'>
        {choreTasks.map(task => (
          <li class='border' key={task.task_id}>
            <p class='text_size'>Task: {task.task}</p>
            <p class='text_size'>Timeframe: {task.timeframe} </p>
            <p class='text_size'>Status: {task.status} </p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2>Lifestyle</h2>
      <ul class='list'>
        {lifestyleTasks.map(task => (
          <li class='border' key={task.task_id}>
            <p class='text_size'>Task: {task.task}</p>
            <p class='text_size'>Timeframe: {task.timeframe} </p>
            <p class='text_size'>Status: {task.status} </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddTaskPage;
