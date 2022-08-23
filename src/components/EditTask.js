import { useState } from "react"

const EditTask = ({ task, onEdit }) => {
    //создаем стейты для для каждого инпута формы, записываем в них начальные значения из пропса
    const [header, setHeader] = useState(task.header)
    const [description, setDescription] = useState(task.description)
    const [status, setStatus] = useState(task.status)
    const id = task.id

    const onSubmit = (e) => {
        e.preventDefault()
        // проверяем, чтобы пользователь не добавлял пустые заметки. Поле description в данном случае необязательное
        if (!header) {
            alert('Пожалуйста введите наименование заметки')
            return
        }

        onEdit({ id, header, description, status }) //записываем полученные значения для переачи в ShowTask, а оттуда в App-компонент
        
        //обнуляем стейты, чтобы очистить форму после сабмита
        setHeader('')
        setDescription('')
        setStatus('')
    }
    return (
      //создаем форму редактирования
        <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Наименование заметки</label>
            <input
                type='text'
                value={header} //привязываем значение к стейту, чтобы видеть редактируемую заметку и чтобы потом очистить форму
                onChange={(e) => setHeader(e.target.value)}// записываем введенные пользователем данные в соответствующий стейт
            />
        </div>
        <div className='form-control'>
            <label>Описание заметки</label>
            <textarea
                value={description}//привязываем значение к стейту, чтобы видеть редактируемую заметку и чтобы потом очистить форму
                onChange={(e) => setDescription(e.target.value)}// записываем введенные пользователем данные в соответствующий стейт
            />
        </div>
        <div className='form-control form-control-select'>
            <label>Статус выполнения</label>
                <select
                    value={status}//привязываем значение к стейту, чтобы видеть редактируемую заметку и чтобы потом очистить форму
                    onChange={(e) => setStatus(e.target.value)}// записываем введенные пользователем данные в соответствующий стейт
                >
                    <option value="to-do" style={{ color: "rgb(80 80 80)" }}>Ожидает выполнения</option>
                    <option value="in-progress"  style={{ color: "rgb(28 130 191)" }}>В процессе выполнения</option>
                    <option value="done"  style={{ color: "rgb(11 175 38)" }}>Выполнена</option>
            </select>
        </div>

        <input
            type='submit'
            value='Сохранить заметку'
            className='btn btn-block'
        />
    </form>
  )
}

export default EditTask