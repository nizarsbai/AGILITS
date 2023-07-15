import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from 'react-modal';
import axios from 'axios';

function Column({ title, status, items, setItems }) {
  const columnItems = items.filter((item) => item.statut__c === status);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [draggingItemId, setDraggingItemId] = useState(null);

  const [formData, setFormData] = useState({
    Name: 'A',
    title__c: '',
    description__c: '',
    statut__c: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3001/delete-item/${itemId}`);
      const updatedItems = items.filter((item) => item.Id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSubmitUserStory = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/insert', formData);
      console.log(response.status, response.data);
      closeModal();
    } catch (error) {
      console.error('Error:', error.response.data);
      console.error('Error:', error);
      // Gérer l'erreur
    }
  };

  const openModal = (data) => {
    setModalIsOpen(true);
    setModalData(data.st);
  };

  const closeModal = () => {
    setModalData(null);
    setModalIsOpen(false);
  };

  const handleDragStart = (itemId) => {
    setDraggingItemId(itemId);
  };

  const handleDragEnd = (result) => {
    setDraggingItemId(null);

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedItems = [...items];
    const draggedItem = updatedItems.find((item) => item.attributes.url === draggableId);

    updatedItems.splice(source.index, 1);
    updatedItems.splice(destination.index, 0, draggedItem);

    setItems(updatedItems);
  };

  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>
      <Droppable droppableId={status}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {columnItems.map((item, index) => (
              <Draggable
                key={item.attributes.url}
                draggableId={item.attributes.url}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`item ${
                      draggingItemId === item.attributes.url ? 'dragging' : ''
                    }`}
                    onDragStart={() => handleDragStart(item.attributes.url)}
                    onDragEnd={handleDragEnd}
                  >
                    <h3>{item.title__c}</h3>
                    <p>{item.description__c}</p>
                    <p>{item.date__c}</p>
                    <button
                      onClick={() => handleDeleteItem(item.Id)}
                      className="delete-button"
                    >
                      <span className="delete-text">Delete</span>
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={() => openModal({ st: status })}
          style={{
            backgroundColor: 'transparent',
            color: 'darkgrey',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 20px',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#dddddd')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
        >
          + Ajouter une carte
        </button>
      </div>
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Example Modal"
  className="custom-modal"
  overlayClassName="custom-overlay"
  shouldCloseOnOverlayClick={false}
>
  {modalData && (
    <div>
      <p> {modalData.st}</p>
    </div>
  )}
  <form onSubmit={handleSubmitUserStory}>
    <label>
      <b>Name :</b>
      <input type="text" name="Name" value={formData.Name} onChange={handleChange} className="input-field" />
    </label>
    <label>
      <b>Title :</b>
      <input
        type="text"
        name="title__c"
        value={formData.title__c}
        onChange={handleChange}
        className="input-field"
      />
    </label>
    <br />
    <label>
      <b>Description :</b>
      <textarea
        type="text"
        name="description__c"
        value={formData.description__c}
        onChange={handleChange}
        className="input-field">
      </textarea>
    </label>
    <br />
    <label>
      <b>Statut :</b>
      <input
        type="text"
        name="statut__c"
        value={formData.statut__c}
        onChange={handleChange}
        className="input-field"
      />
    </label>
    <br />
    <button type="submit" className="submit-button">Submit</button>
  </form>
  <button onClick={closeModal} className="close-button"><b>x</b></button>
</Modal>

    </div>
  );
}

export default Column;
