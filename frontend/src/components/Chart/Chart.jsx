import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import useAuth from '../../hooks/useAuth';

const GraphedChart = (props) => {
  const [completedTasksByWeek, setCompletedTasksByWeek] = useState([]);
  const [user, token] = useAuth();

  useEffect(() => {
    getAllTasks();
  }, []);

  async function getAllTasks() {
    let response = await axios.get('http://127.0.0.1:5000/api/user_tasks', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const tasks = response.data;
    const completedTasks = tasks.filter((task) => task.status === 'Completed');
    const completedTasksByWeek = groupTasksByWeek(completedTasks);
    setCompletedTasksByWeek(completedTasksByWeek);
  }

  function groupTasksByWeek(tasks) {
    const tasksByWeek = tasks.reduce((groups, task) => {
      const weekStartDate = getWeekStartDate(task.start_date);
      if (!groups[weekStartDate]) {
        groups[weekStartDate] = {
          tasks: [],
          totalPointValue: 0,
        };
      }
      groups[weekStartDate].tasks.push(task);
      groups[weekStartDate].totalPointValue += parseInt(task.point_value, 10);
      return groups;
    }, {});
  
    const sortedTasksByWeek = Object.entries(tasksByWeek).sort(
      ([weekStartDateA], [weekStartDateB]) =>
        new Date(weekStartDateA) - new Date(weekStartDateB)
    );
  
    return sortedTasksByWeek.map(([weekStartDate, tasks]) => [
      weekStartDate,
      tasks.totalPointValue, // Update the mapping to include total point value
    ]);
  }

  function getWeekStartDate(dateStr) {
    const date = new Date(dateStr);
    const currentDay = date.getDay();
    const weekStartDate = new Date(date);
    weekStartDate.setDate(date.getDate() - currentDay);
    weekStartDate.setHours(0, 0, 0, 0);
    return weekStartDate.toISOString().slice(0, 10);
  }

  return (
    <div className="chart-container">
      <Chart
        chartType="LineChart"
        data={[['Week Start Date', 'Completed Tasks'], ...completedTasksByWeek]}
        width="100%"
        height="400px"
        options={{
          title: 'Points by Week',
          titleTextStyle: { color: 'white', fontSize: 30, textAlign: 'center' },
          legend: { position: 'bottom', textStyle: { color: 'white' } },
          vAxis: {
            title: 'Point Value',
            titleTextStyle: { color: 'white', italic: false },
            textStyle: { color: 'white' },
            minValue: 0,
          },
          hAxis: {
            title: 'Week Start Date',
            titleTextStyle: { color: 'white', italic: false },
            textStyle: { color: 'white' },
          },
          backgroundColor: '#152733',
          colors: ['white'],
          chartArea: {
            width: '80%',
            height: '70%',
            border: {
              color: 'white',
              width: 1,
              style: 'solid',
            },
          },
          borderWidth: 1,
          borderColor: 'white',
        }}
        loader={<div>Loading Chart</div>}
      />
    </div>
  );
};

export default GraphedChart;