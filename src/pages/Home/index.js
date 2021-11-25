import { useState } from 'react';
import { ListCategories } from '../../components/ListCategories';
import api from '../../service/api';
import './style.css';

export function Home() {
  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [viewSearch, setViewSearch] = useState(false);
  const [category, setCategory] = useState({ id: 'd5954570-1a24-11ec-890a-357ed7be30b6', descricao: 'Serviços de beleza'});

  function handleUpdateVisibility() {
    setViewSearch(old => !old);
  }

  async function handleGetCategories() {
    const response = await api.get(
      `/segmentos?page=1&Descricao=${inputValue}&TemFiltro=true`,
    );
    setCategories(response.data.list);
  }

  function handleSelectCategory({ id, descricao}) {
    setCategory({id, descricao});
    setViewSearch(false);
  }
  
  return (
    <div className="container">
      <header className="header">
        <h1>Segmento da Empresa</h1>
        {viewSearch ? (
          <p>Selecione abaixo o segmento que mais se aproxima com o ramo de atividade de sua empresa</p>
        ) : (
          <p>Confirme o segmento que sua empresa atua para personalizarmos sua experiência em nosso aplicativos</p>
        )}
      </header>

      <main>
        {viewSearch ? (
          <>
            <input 
              type="text" 
              placeholder="Ex.: Restaurante"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
            <button
              type="button"
              onClick={handleGetCategories}
            >
              Lupinha
            </button>

            {categories.length > 0 ? (
              <ListCategories 
                categories={categories} 
                handleSelectCategory={handleSelectCategory} 
              />
            ) : (
              <p>Informe acima o segmento para continuar</p>
            )}

            <footer>
              <button
                type="button"
                onClick={handleUpdateVisibility}
              >Voltar</button>
            </footer>
          </>
        ) : (
          <>
            <p>Segmento Selecionado:</p>
            <div className="selected-category">
              <span>{category.descricao}</span>
              <button 
                type="button"
                onClick={handleUpdateVisibility}
              >
                Ícone
              </button>
            </div>

            <footer>
              <button>Voltar</button>
              <button>Finalizar Cadastro</button>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}