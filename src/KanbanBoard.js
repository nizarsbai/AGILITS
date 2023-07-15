import React, { useEffect, useState } from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
//import { Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import Column from './Column';

function KanbanBoard() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/execute-query');
        setItems(response.data.records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = [...items];
    const [removed] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, removed);

    setItems(updatedItems);
  };
  

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="kanban-board">
        <Column title="To Do" status="to do" items={items} setItems={setItems} />
        <Column title="In Progress" status="in Progress" items={items} setItems={setItems} />
        <Column title="Done" status="done" items={items} setItems={setItems} />
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
