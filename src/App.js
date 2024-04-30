import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos]= useState([]);
  const [editId, setEditId] = useState(0);
  const handleSubmit = (e) =>{
    e.preventDefault();

    if(editId){
      console.log(editId)
      const editingTodo = todos.find((i) => i.courseId === editId);
      const updatedTodos = todos.map((t) => 
      t.courseId === editingTodo.courseId 
      ? (t = {courseId: t.courseId, courseName: todo})
      : {courseId: t.courseId, courseName: t.courseName}
      )
      setTodos(updatedTodos);
      setEditId(0)
      setTodo("");
      return;
    }
    if(todo !== ""){
      setTodos([{courseId: `${todo}-${Date.now()}`, courseName: todo }, ...todos]);
      setTodo("");
    }
  }

  const handleDelete = (id) =>{
    const DeleteTodo = todos.filter((to) => to.courseId !== id);
    setTodos(DeleteTodo);
  }

  const handleEdit = (id) =>{ 
      const editTodo = todos.find((i) => i.courseId === id);
      setTodo(editTodo.courseName);
      setEditId(id);
  }
  return (
    <div className="App">
     <h2>TODO LIST</h2>
      <div className='main-container'>
      <form className='todo_form' onSubmit={handleSubmit}>
        <input type='text' value={todo} onChange={(e) =>setTodo(e.target.value)} />
        <button type='submit'> {editId ? "Edit" : "Enter"}</button>
      </form>
      <div className='list_items'>
      <ol style={{listStyle: "none", margin: 0, padding: 0}}>
      {todos?.map((course) =>{
        return(
            <li className='list_item'>
            <span className='todotext' key={course.courseId}>{course.courseName}</span>
            <button onClick={() => handleEdit(course.courseId)}>Edit</button>
            <button onClick={() => handleDelete(course.courseId)}>Delete</button>
            </li>
           
          
        )
      })}
      </ol>
      </div>

      </div>
    </div>
  );
}

export default App;
