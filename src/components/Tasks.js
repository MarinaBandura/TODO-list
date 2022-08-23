import Task from "./Task"

const Tasks = ({tasks, getTask, truncate}) => {
    
    return (
        //создаем список заметок
        <>
            {tasks.map((task) => (
                <Task key={task.id} task={task} getTask={getTask} truncate={truncate} /> //данные о каждой заметке передаем в дочерний элемент
            ))}
        </>
    )
}

export default Tasks