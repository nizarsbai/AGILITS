import React from "react";
import KanbanBoard from '../KanbanBoard';
import '../kanban.css';


const HomePage = () => {
    return( 
    <div className='dashboard'>
        <h1>Home</h1>
        <br></br>
        <KanbanBoard />
    </div> );
};

export default HomePage;