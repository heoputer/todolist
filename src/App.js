import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
  margin: 0 auto;
`;

function App() {
  const [description, setDescription] = useState('');
  const [todoList, setTodoList] = useState([]);
  const handleSubmit = async () => {
    const { data } = await axios.post('http://localhost:4000/todos', {
      description,
      isCompleted: false,
    });
    window.location.reload();
    setDescription('');
  };
  const readList = async () => {
    const { data } = await axios.get('http://localhost:4000/todos');
    setTodoList(data);
  };
  useEffect(() => {
    (async () => {
      await readList();
    })();
  }, []);
  const toggleCompleteBtn = async (id, isCompleted) => {
    await axios.patch(`http://localhost:4000/todos/${id}`, {
      isCompleted: !isCompleted,
    });
    await readList();
  };
  const deleteTodoBtn = async (id) => {
    await axios.delete(`http://localhost:4000/todos/${id}`);
    await readList();
  };
  return (
    <>
      <h1>오늘 할일 </h1>
      <div>
        <h2>추가하기</h2>
        <input placeholder='할 일' type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
        <button onClick={handleSubmit}> Create Todo </button>
        <br />
        <h2> TODO's</h2>
        <ul>
          {todoList?.map((todo) => (
            <div key={todo.id}>
              <li key={todo.id}>{todo.description}</li>
              <button onClick={() => toggleCompleteBtn(todo.id, todo.isCompleted)}>{todo.isCompleted ? '완료' : '미완료'}</button>
              <button onClick={() => deleteTodoBtn(todo.id)}>삭제하기</button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
