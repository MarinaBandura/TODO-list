const Button = ({ btnColor, text, onClick }) => {

    return (
        //создаем кнопку для переиспользования в других компонентах
        <>
            <button
                onClick={onClick}
                style={{ backgroundColor: btnColor }}
                className='btn'
            >
                {text}
            </button>
        </>
    )
}


export default Button