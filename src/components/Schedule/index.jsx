import { useEffect, useState } from "react";
import './schedule.css';
import '../../index.css'
import Modal from "../Modal";


    /* *************** Create Task Class  *************** */ 

    class Task {
        constructor(desc, start, end, colour){
            this.desc = desc;
            this.start = start;
            this.end = end;
            this.colour = colour;
        }

        setProperties(){
            this.startHour = this.start.slice(0,2);
            console.log(`this.startHour: ${this.startHour}`)
            this.startMin = this.start.slice(3);
            console.log(`this.startMin: ${this.startMin}`)
            this.endHour = this.end.slice(0,2);
            console.log(`this.endHour: ${this.endHour}`)
            this.endMin = this.end.slice(3);
            console.log(`this.endMin: ${this.endMin}`)
        }

    }

/* *************** useState variables *************** */ 

function Schedule() {
    const [inputValue, setInputValue] = useState('');
    const [selectStartValue, setSelectStartValue] = useState('');
    const [selectEndValue, setSelectEndValue] = useState('');
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasksArr')) || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskBg, setTaskBg] = useState('');
    const [modalMsg, setModalMsg] = useState(0);

    /* *************** Saves tasks to local storage *************** */ 
    useEffect(() => {
        localStorage.setItem('tasksArr', JSON.stringify(tasks));
    }, [tasks])
    

    /* *************** Creates arrays of units of time to be used as time slots *************** */ 

    // Variable declarations
    const hoursArr = [];
    const timeSlotsArr =[];
    const combinedSlotsArr = [];
    let tenMinSlots = 0;

    //Create array of hours
    for(let i=0; i<24; i++){
        hoursArr.push(i)
    }

    //Create array of 10 minute slots
    for(let j=0; j<6; j++){
        timeSlotsArr.push(tenMinSlots.toFixed(2));
        tenMinSlots+=0.1;
    }
    
    //Create array of hours going up in 10 min increments
    hoursArr.forEach((hour) => {
        let prefix = '0';

        if(hour > 9){
            prefix = '';
        }
        timeSlotsArr.forEach((slot) => {

          let currentSlot = `${prefix}${hour}:${slot.slice(2)}`;
          combinedSlotsArr.push(currentSlot);
        });
      });

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        };
    
    const handleSelectStart = event => {
        setSelectStartValue(event.target.value);
    }

    const handleSelectEnd = event => {
        setSelectEndValue(event.target.value);
    }

    const handleTaskBg = event => {
        setTaskBg(event.target.dataset.color);
    }
    

    const handleClick = () => {
        let timeClash = false;
        const currentTask = new Task(inputValue, selectStartValue, selectEndValue, taskBg);
        currentTask.setProperties();

        tasks.forEach(task => {
        // Convert start and end times to minutes
            const currentTaskStartMins= parseInt(currentTask.startHour) * 60 + parseInt(currentTask.startMin);
            const currentTaskEndMins= parseInt(currentTask.endHour) * 60 + parseInt(currentTask.endMin);
            const newTaskStartMins = parseInt(task.startHour) * 60 + parseInt(task.startMin);
            const newTaskEndMins = parseInt(task.endHour) * 60 + parseInt(task.endMin);

            //Error handling conditionals
            // Check if the new task overlaps with any existing task
            if (
                (currentTaskStartMins >= newTaskStartMins && currentTaskStartMins < newTaskEndMins) || //New task starts within existing task
                (currentTaskEndMins > newTaskStartMins && currentTaskEndMins<= newTaskEndMins) || //New task ends within existing task
                (currentTaskStartMins <= newTaskStartMins && currentTaskEndMins>= newTaskEndMins) //New task completely covers existing task
            ) {
                timeClash = true;
                setModalMsg(1);
                setIsModalOpen(true);
            }
        });

        if((parseInt(currentTask.startHour) * 60 + parseInt(currentTask.startMin)) >  (parseInt(currentTask.endHour) * 60 + parseInt(currentTask.endMin))){
            timeClash = true;
            setModalMsg(2);
            setIsModalOpen(true);
        }

        if(selectStartValue === '' || selectEndValue === ''){
            timeClash = true;
            setModalMsg(3);
            setIsModalOpen(true);
        }
        
        
        //Thanks for making everything difficult Mr.Zuckerberg
        //Updates array if there's no time clash
        if(!timeClash){
            setTasks(prevTasks => [...prevTasks, currentTask]);
        }
        
        // Clear input values
        setInputValue('');
        setSelectEndValue('');
        setSelectStartValue('');

    };

    const modalContent = (msg) => {
        if (msg === 1) {
            return <p className="py-3 px-3" id="error-text">This task clashes with a pre-existing task. Please choose a different time for your task.</p>
        }
        else if(msg === 2) {
            return <p className="py-3 px-3" id="error-text">The end time cannot be before the start time</p>
        }
        else if(msg === 3){
            return <p className="py-3 px-3" id="error-text">Please enter a start and end time</p>
        }
        return null;
    }
    
    const handleDelete = (event) => {
        console.log('Delete button clicked');
        const taskToDelete = event.target.parentNode.parentNode.parentNode;
        const taskId = taskToDelete.dataset.listid;
        console.log(taskId);

        // setTasks(tasks.splice(taskId, 1))

        setTasks(prevTasks => prevTasks.filter((_, index) => index !== parseInt(taskId)));
    }

    useEffect(() => {
        console.log(tasks)
    }, [tasks])


  /* *************** Create hours for select dropdowns *************** */ 
        
    let hourArray = [];

    for(let i=0; i<24; i++){

        i<10 ? hourArray.push(`0${i}:00`) : hourArray.push(`${i}:00`);
    }


    /* *************** Returned JSX *************** */ 
    return(
        <>
        {/* *************** New task modal container *************** */}

            <div id="schedule-content">
                
                <div id="new-task-container" className="py-1 px-3">
                    
                    <div className="new-task-div mt-3 mb-2" id="new-task-form">
                        <label htmlFor="new-task" className="schedule-input-label form-label">Task</label>
                        <input onChange={handleInputChange} value={inputValue} type="text" id="new-task-input" name="new-task" className="form-control all-forms" placeholder="Enter a task here"/>
                    </div>
                    
                    <div className="new-task-div" id="schedule-dropdowns">
                        
                        <div id="dropdown-1" className="dropdown-container mb-2">
                            <label htmlFor="duration" className="schedule-input-label form-label" >Start</label>
                            <select onChange={handleSelectStart} value={selectStartValue} name="duration" id="new-task-duration" className="form-select all-forms">
                                <option value="prompt">Please select a start time</option>  {/**/}
                                {combinedSlotsArr.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div id="dropdown-2" className="dropdown-container">
                            <label htmlFor="duration" className="schedule-input-label form-label" >End</label>
                            <select onChange={handleSelectEnd} value={selectEndValue}name="duration" id="new-task-duration" className="form-select all-forms">
                                <option value="prompt">Please select an end time</option>
                                {combinedSlotsArr.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div id="colour-picker-container" className="my-3">
                        
                        <p className="text-center" id="colour-picker-title">Block Colour</p>

                        <div id="colour-picker">
                            <div className="cp-row">
                                {['#57d3ac', '#58d7d8', '#8da0cb', '#5461d8'].map((color, index) => (
                                    <div key={index} className="colour-container" onClick={handleTaskBg} style={{ backgroundColor: color }} data-color={color} tabIndex={0}></div>
                                ))}
                            </div>
                            <div className="cp-row">
                                {['#6024c1', '#e7af46', '#c48255', '#b33c3c'].map((color, index) => (
                                    <div key={index} className="colour-container" onClick={handleTaskBg} style={{ backgroundColor: color }} data-color={color} tabIndex={0}></div>
                                ))}
                            </div>
                        </div>

                    </div>
                    
                    <div className="btn-wrapper py-3 link-btn-wrapper" id="new-task-btn-wrapper">
                        <button onClick={handleClick} id="new-task-btn">Add</button>
                    </div>

                </div>
                
                {/* *************** Schedule section *************** */}

                <div className="grid-parent">
            
                    {hourArray.map((hour, index) => (
                        <div className="time-square"  key={index} id={`time-${index}`} style={{ gridColumn: 1 }}>{hour}</div>
                    ))} 

                    <div className="grid-of-tasks">


                        {tasks && tasks.length > 0 ? (

                            tasks.map((task, index) => {
                                
                                let totalMins = 0; //Variable that stores total Mins for each task

                                //calculates differences in start and end hours/mins
                                const taskHourDiff = parseInt(task.endHour) - parseInt(task.startHour);
                                const taskMinDiff = parseInt(task.endMin) - parseInt(task.startMin);
    
                                //calculates total Mins
                                totalMins = (taskHourDiff * 60) + taskMinDiff;
                                console.log(`TOTAL MINS: ${totalMins}`);
    
                                // Calculate the duration of the task in minutes
                                const taskDuration = (parseInt(task.endHour) * 60 + parseInt(task.endMin)) - (parseInt(task.startHour) * 60 + parseInt(task.startMin));

                                return (
                                
                                <div className="task" key={index} data-listid={index} 
                                style={{gridRow: `${((parseInt(task.startHour) * 6 + parseInt(task.startMin)/10) + 1)}/span ${totalMins/10}`,
                                zIndex: 2, backgroundColor: task.colour}}> 
                                    <div className="task-content-container">
                                        <div className="task-buttons">
                                            <p className="edit-btn">Edit</p>
                                            <span className="close-btn" onClick={handleDelete}>x</span>
                                        </div>
                                        <div className="task-content">
                                            <p className="task-desc">{task.desc}</p> 
                                            <p className="task-time">{task.start} - {task.end}</p>
                                        </div>
                                    </div>
                                </div>
                            )})
                        ) : (
                            <p id="no-tasks-msg">No tasks available</p>
                        )}
                    </div>
                </div>
            </div>

            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {modalContent(modalMsg)}
            </Modal>
            
        </>
    )
}

export default Schedule;