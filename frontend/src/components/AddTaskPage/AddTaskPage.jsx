import React, { useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import "./AddTaskPage.css";

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

        setTask("");
        setCategory("");
        setStatus("");
        setPoint_value("");
        setTimeframe("");
        setStart_date("");
        setEnd_date("");
    };

    return (
        <div className="form-body">
            <div className="row">
                <div className="form-holder"> 
                    <div className="form-content">
                        <div className="form-items">
                            <h3> Add A New Task</h3>
                            <p> Fill in the data below</p>
                            <form onSubmit={handleSubmit}> 
                                <div className="col-md-12">
                                    <input type="text" className="form-control" id="inputTask" placeholder="Task" value={task} onChange={(event) => setTask(event.target.value)} />
                                </div>
                                <div className="col-md-12">
                                <select className="form-select mt-3" id="inputCategory" placeholder="Category" value={category} onChange={(event) => setCategory(event.target.value)}>
                                    <option value="">Category</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Health">Health</option>
                                    <option value="Chore">Chore</option>
                                </select>
                                </div>
                                <div className="col-md-12">
                                    <select className="form-select mt-3" id="inputCategory" placeholder="Status" value={status} onChange={(event) => setStatus(event.target.value)}>
                                        <option value="">Status</option>
                                        <option value="Not started">Not Started</option>
                                        <option value="Started">Started</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                                <div className="col-md-12">
                                    <input type="text" className="form-control" id="inputPoint_value" placeholder="Point Value" value={point_value} onChange={(event) => setPoint_value(event.target.value)}/>
                                </div>
                                {/* <div className="col-md-12">
                                    <select className="form-select mt-3" id="inputPoint_value" placeholder="Point Value" value={point_value} onChange={(event) => setPoint_value(event.target.value)}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </select>
                                </div> */}
                                <div className="col-md-12">
                                    <select className="form-select mt-3" id="inputTimeframe" placeholder="Timeframe" value={timeframe} onChange={(event) => setTimeframe(event.target.value)}>
                                        <option value="">Timeframe</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                    </select>
                                </div>
                                <br />
                                <div className="col-md-12">
                                    <label> Start Date </label>
                                    <input type="text" className="form-control" id="inputStart_date" placeholder="yyyy-mm-dd" value={start_date} onChange={(event) => setStart_date(event.target.value)} />
                                </div>
                                <br />
                                <div className="col-md-12">
                                    <label> End Date </label>
                                    <input type="text" className="form-control" id="inputEnd_date" placeholder="yyyy-mm-dd" value={end_date} onChange={(event) => setEnd_date(event.target.value)} />
                                </div>
                                <br />
                                <div className="form-button mt-3">
                                    <button id="submit" type="submit" className="btn btn-primary">Add Task</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
};

export default AddNewTask;