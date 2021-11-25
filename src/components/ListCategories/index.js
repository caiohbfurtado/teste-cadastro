import './styles.css';

export function ListCategories({ categories, handleSelectCategory }) {
  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => handleSelectCategory(category)}
          >
            {category.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
}