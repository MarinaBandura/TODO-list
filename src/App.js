import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Button from "./components/Button";
import ShowTask from "./components/ShowTask";
import SearchBar from "./components/SearchBar";
import { useState, useEffect } from 'react';

function App() {

  //создаем стейты для отображения компонентов и 
  const [showAddTask, setShowAddTask] = useState(false)
  const [showTask, setShowTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState({})
  const [filtered, setFiltered] = useState([])
  
  //получаем заметки с псевдо-сервера и записываем в стейт Tasks
  useEffect(() => {
    const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //записываем список аметок в стейт для фильтрации (для пользовательского поиска)
  useEffect(() => {
    setFiltered(tasks);
    },
    [tasks]
  );
  
    //Fetch Tasks - функция для получения списка заметок с псевдо-сервера
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //Fetch Task - функция для получения с псевдо-сервера 1 заметки по id
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // Функция обрезки длинных назаний заметок
  const truncate = (str) => str.length > 27 ? str.substring(0, 24) + "..." : str


  //Add Task - добавдение заметки
  const addTask = async (task) => {
    //добавляем новую заметку запросом на псевдо-сервер
    const res = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    
    const data = await res.json()//записываем результат в переменную
    
    setTasks([...tasks, data])//пересобираем массив заметок, добавляя новую заметку
  }
  
  //Show Task - получаем заметку для отображения в компоненте ShowTask
  const getTaskToShow = async (id) => {    
    const taskToShow = await fetchTask(id) //получаем нужную заметку по id
    setShowTask(true) //ставим флаг отображения компонента в true
    setTask(taskToShow) //записываем нужную заметку в стейт для передачи в компонент

  }

  //Edit Task - редактирование заметки
  const editTask = async (task) => {
    const id = task.id
    //даелаем запрос на редактирование на псевдо-сервер
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)      
    })
    const data = await res.json() //записываем результат в переменную
    setTasks(tasks.map((task) => task.id === id ? { ...task, header: data.header, description: data.description, status: data.status } : task)) //пересобираем массив заметок, обновляя данные в нужной заметке
    setShowTask(false)//ставим флаг отображение компонента на false после окончания редактирования
  }
  
  // Delete Task - удаление заметки
  const deleteTask = async (id) => {
    //запрашиваем подтверждение удаления пользоватетем
    if (window.confirm('Вы действительно хотите удалить заметку?')) {
      //далаем запрос на удаление на псевдо-сервер
      await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
      })
      setTasks(tasks.filter((task) => task.id !== id))//фильтруем массив заметок, убирая удаленную
      setShowTask(false)//ставим флаг отображение компонента на false
    }
    
  }
  
  //Search - функция поиска по названию заметок
  const search = value => {
    let currentTasks = [], newList = [];//создаем переменные для текущих заметок и отфильтрованных заметок
    if (value !== "") {      
      currentTasks = tasks;//записываем в текущие заметки наш массив заметок
      //фильтруем массив в поисках совпадений
      newList = currentTasks.filter(task => {
        const lowerCaseTask = task.header.toLowerCase();//приводим данные к строчным буквам для лучшего результата сравнения
        const filter = value.toLowerCase();        
        return lowerCaseTask.includes(filter);//возвращаем заметки, содержащие искомые значение
      });
    } else {
      newList = tasks;//если инпут пустой, выводим массив заметок
    }
    setFiltered(newList);//записываем результат в стейт
  };


  return (
    <div className="container">
      <div className="task-list">
        <SearchBar {...{search}}/>
        {tasks.length > 0 ? (        
        <Tasks
          tasks={filtered}
          truncate={truncate}
          getTask={getTaskToShow}
        />
        ) : (
        'No Tasks To Show'
        )}

      </div>
      <div className="task-crud">
        <Button
          btnColor={showAddTask ? 'red' : 'green'}
          text={showAddTask ? 'Закрыть' : 'Добавить заметку'}// в зависимоти от стейта меняется текст и функция кнопки
          onClick={() => {
            setShowAddTask(!showAddTask)// по клику переключаем стейт отображения компонента AddTask
            setShowTask(false)//по клику переключаем стейт отображения компонента ShowTask в false
            }}
        />
        {showAddTask && <AddTask onAdd={addTask} />} {/**Если флаг отображения компонента true - отображаем его */}
        {showTask && <ShowTask task={task} onEdit={editTask} onDelete={deleteTask} />} {/**Если флаг отображения компонента true - отображаем его */}

      </div>
      
    </div>
  );
}

export default App;
