import { useState } from "react";
import Button from "./Button";
import EditTask from "./EditTask";

const ShowTask = ({ task, onEdit, onDelete }) => {
  // создаем функцию для отображения текста статуса выполнения заметки
    const statusInterpretation = () => {
        switch(task.status) {
        case 'to-do':
          return 'Ожидает выполнения'
        case 'in-progress':
          return 'В процессе выполнения'
        case 'done':
          return 'Выполнена'
        default:
          return ''
        }
  }
  // содаем стейт для отображения/скрытия области редактирования заметки
    const [showEditTask, setShowEditTask] = useState(false) //начальное значение false, т.к. по умолчанию область скрыта

  return (
    // создаем карточку с информацией о заметке и кнопками для взаимодействия с ней
    <div className="showTask">        
       <h3>{task.header}</h3>{/* заполняем данными из пропса */}
      <p>{task.description}</p>
      <p className="status">{statusInterpretation()}</p>{/* подставляем текст в зависимости от статуса */}
      <div>
        <Button
            btnColor={'#f1b100'}
            text={showEditTask? 'Отмена' : 'Редактировать'} // в зависимоти от стейта меняется текст и функция кнопки
            onClick={() => setShowEditTask(!showEditTask)} // по клику переключаем стейт
        />
        <Button
            btnColor={'red'}
            text={'Удалить'}
            onClick={() => {onDelete(task.id)}} //по клику записываем в onDelete id заметки для передачи в App компонент
        />  
      </div>       
      {showEditTask && <EditTask task={task} onEdit={onEdit} />} {/* в зависимоти от стейта открываем/скрываем компонент редактирования заметки */}
        
    </div>
  )
}

export default ShowTask