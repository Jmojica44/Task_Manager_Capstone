import React, { useState, useEffect} from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import "./ViewTaskPage.css";
import Download from './assets/download.png'
import Checkmark from './assets/checkmark.png'

const AddTaskPage = () => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [weeklyTasks, setWeeklyTasks] = useState([]);
  const [monthlyTasks, setMonthlyTasks] = useState([]);
  const [healthTasks, setHealthTasks] = useState([]);
  const [choreTasks, setChoreTasks] = useState([]);
  const [lifestyleTasks, setLifestyleTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [lowTasks, setLowTasks] = useState([]);
  const [mediumTasks, setMediumTasks] = useState([]);
  const [highTasks, setHighTasks] = useState([]);
  const [user, token] = useAuth();
  
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

  async function getAllTasks() {
    let response = await axios.get(`http://127.0.0.1:5000/api/task`, {headers: {Authorization: 'Bearer ' + token}});
    setDailyTasks(response.data.filter(task => (task.timeframe === 'Daily' || task.timeframe === 'daily') && (task.status === 'Not Started' || task.status === 'Started' || task.status === 'started' || task.status === 'Not started')));
    setWeeklyTasks(response.data.filter(task => task.timeframe === 'Weekly' && (task.status === 'Not started' || task.status === 'Started' || task.status === 'Not started')));
    setMonthlyTasks(response.data.filter(task => task.timeframe === 'Monthly' && (task.status === 'Not started' || task.status === 'Started' || task.status === 'Not started')));
    setHealthTasks(response.data.filter(task => task.category === 'Health' && (task.status === 'Not started' || task.status === 'Started' || task.status === 'Not started')));
    setChoreTasks(response.data.filter(task => task.category === 'Chore' && (task.status === 'Not started' || task.status === 'Started' || task.status === 'Not started')));
    setLifestyleTasks(response.data.filter(task => task.category === 'Lifestyle' && (task.status === 'Not started' || task.status === 'Started' || task.status === 'Not started')));
    setCompletedTasks(response.data.filter(task => task.status === 'Completed'));
    setLowTasks(response.data.filter(task => task.point_value <5));
    setMediumTasks(response.data.filter(task => task.point_value >4 && task.point_value <10));
    setHighTasks(response.data.filter(task => task.point_value >9));
  } 
  
  useEffect(() => { getAllTasks() },[]);

  return (
    <div className='height'>
      <h1 className="spacing">Tasks Page</h1>
      <br></br>
      <p className="spacing">{getThisWeekRange()}</p>
      <br></br>
      <p className="spacing">Total Points Completed: {" "} {completedTasks.reduce((sum, task) => {
        const startDate = new Date(getThisWeekRange().split(" - ")[0]);
        const endDate = new Date(getThisWeekRange().split(" - ")[1]);
        const taskEndDate = new Date(task.end_date);
      
        if (taskEndDate >= startDate && taskEndDate <= endDate) {
          return sum + task.point_value;
        } else {
          return sum;
        }
      }, 0)}</p>

      
      <br></br>
      <div className="spacing2">
      <div className='list'>
        <div>
        <h2 className='spacing3'>Daily Tasks</h2>
        <ul className='list2 circle-list'>
          {dailyTasks.map(task => (
            <li className='border' key={task.id}>
              <div>
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
              </div>
            </li>
          ))}
        </ul>
      </div>
      <br></br>
      <div>
        <h2 className='spacing3'>Weekly Tasks</h2>
        <ul className='list2 circle-list'>
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
        <h2 className='spacing3'>Monthly Tasks</h2>
        <ul className='list2 circle-list'>
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
                onClick={(event) => handleClick2(event, task.id)}
                style={{ cursor: 'pointer'}}
              />
              </p>
            </li>
          ))}
        </ul>
        </div>
        <br className='bottom'></br>
      </div>
      <div className='list'>
      <h2 className='spacing3'>Health</h2>
      <ul className='list2 circle-list'>
        {healthTasks.map(task => (
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
                onClick={(event) => handleClick2(event, task.id)}
                style={{ cursor: 'pointer'}}
              />
            </p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2 className='spacing3'>Chores</h2>
      <ul className='list2 circle-list'>
        {choreTasks.map(task => (
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
                onClick={(event) => handleClick2(event, task.id)}
                style={{ cursor: 'pointer'}}
              />
            </p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2 className='spacing3'>Lifestyle</h2>
      <ul className='list2 circle-list'>
        {lifestyleTasks.map(task => (
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
                onClick={(event) => handleClick2(event, task.id)}
                style={{ cursor: 'pointer'}}
              />
            </p>
          </li>
        ))}
      </ul>
      </div>
      <div className='list'>
      <h2 className='spacing3'>Low</h2>
      <ul className='list2 circle-list'>
        {lowTasks.map(task => (
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
                onClick={(event) => handleClick2(event, task.id)}
                style={{ cursor: 'pointer'}}
              />
            </p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2 className='spacing3'>Medium</h2>
      <ul className='list2 circle-list'>
        {mediumTasks.map(task => (
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
              onClick={(event) => handleClick(event,)}
              style={{ cursor: 'pointer'}}
            />
            </p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2 className='spacing3'>High</h2>
      <ul className='list2 circle-list'>
        {highTasks.map(task => (
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
                onClick={(event) => handleClick(event,)}
                style={{ cursor: 'pointer'}}
              />
            </p>
          </li>
        ))}
      </ul>
      </div>
      <div className='list'>
      <h2 className='spacing3'>Completed</h2>
      <ul className='list2 circle-list'>
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
    </div>
  );
};

export default AddTaskPage;
