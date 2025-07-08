import React, { useState, useEffect } from 'react';

const StreamList = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  // Load stored items from localStorage when the component mounts
  useEffect(() => {
    const storedItems = localStorage.getItem('streamListItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  // Save items to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem('streamListItems', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (input.trim() === '') {
      alert('You must write something!');
      return;
    }

    const updatedItems = [...items, input];
    setItems(updatedItems);
    setInput('');
  };

  const removeItem = (indexToRemove) => {
    const updatedItems = items.filter((_, index) => index !== indexToRemove);
    setItems(updatedItems);
  };

  return (
    <main>
      <h2>My StreamList</h2>
      <div id="myDIV" className="header">
        <input
          type="text"
          id="myInput"
          placeholder="Title..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <span onClick={addItem} className="addBtn">Add</span>
      </div>

      <ul id="myUL">
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <span className="close" onClick={() => removeItem(index)}>&times;</span>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default StreamList;
