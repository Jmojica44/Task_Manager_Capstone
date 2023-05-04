import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const AddNewTask = (props) => {

    const [task, setTask] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [point_value, setPoint_value] = useState("");
    const [timeframe, setTimeframe] = useState("");
    const [start_date, setStart_date] = useState("");
    const [end_date, setEnd_date] = useState("");
    const [task_id, setTask_id] = useState("");
    const [tasks, setTasks] = useState([]);
    const [user, token] = useAuth();
    
    async function getAllTasks() {
        let response = await axios.get(`http://127.0.0.1:5000/api/user_tasks`, {headers: {Authorization: 'Bearer ' + token}});
        setTasks(response.data);
      }

    async function addNewTask(newTask) {
        let response = await axios.post('http://127.0.0.1:5000/api/user_tasks', newTask, {headers: {Authorization: 'Bearer ' + token}});
                if(response.status === 201) {
          await getAllTasks();
        }
      }

    function handleSubmit(event) {
        event.preventDefault();
        let newTask = {
            task: task,
            category: category,
            status: status,
            point_value: point_value,
            timeframe: timeframe,
            start_date: start_date,
            end_date: end_date,
        };
        console.log(newTask);
        addNewTask(newTask);
    };

    return (
        <div>
        <form onSubmit={handleSubmit} className ="form-grid">
            <div className="form-group">
                <label> Task </label>
                <input type="text" className="form-control" id="inputTask" placeholder="Task" value={task} onChange={(event) => setTask(event.target.value)} />
            </div>
            <div className="form-group">
                <label> Category </label>
                <input type="text" className="form-control" id="inputCategory" placeholder="Text" value={category} onChange={(event) => setCategory(event.target.value)} />
            </div>
            <div className="form-group">
                <label> Status </label>
                <input type="text" className="form-control" id="inputStatus" placeholder="Status" value={status} onChange={(event) => setStatus(event.target.value)} />
            </div>
            <div className="form-group">
                <label> Point Value </label>
                <input type="text" className="form-control" id="inputPoint_value" placeholder="Point_value" value={point_value} onChange={(event) => setPoint_value(event.target.value)} />
            </div>
            <div className="form-group">
                <label> Timeframe </label>
                <input type="text" className="form-control" id="inputTimeframe" placeholder="Timeframe" value={timeframe} onChange={(event) => setTimeframe(event.target.value)} />
            </div>
            <div className="form-group">
                <label> Start Date </label>
                <input type="text" className="form-control" id="inputStart_date" placeholder="Start_date" value={start_date} onChange={(event) => setStart_date(event.target.value)} />
            </div>
            <div className="form-group">
                <label> End Date </label>
                <input type="text" className="form-control" id="inputEnd_date" placeholder="End_date" value={end_date} onChange={(event) => setEnd_date(event.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" style={{"margin-top": "1em"}}> Add </button>
        </form>
        <h3> Tasks </h3>
        {/* <AddNewTask addNewTaskProperty={addNewTask} task={task}/> */}
        </div>
    )
};

export default AddNewTask;