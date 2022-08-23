const SearchBar = ({ search }) => {
  return (
    //создаем инпут в котором будет осуществляться поиск по названиям заметок
      <input
        className="search-bar-input"
        onChange={(e) => search(e.target.value)}//записываем то, что вводит пользователь, в search для переачи в App-компонент
        type="text"
        placeholder="Поиск..."
    />
  );
}

export default SearchBar