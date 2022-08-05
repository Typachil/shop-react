import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Context } from '.';
import Header from './components/Header';
import Main from './components/Main';
import './sass/App.scss';
import './sass/header.scss';
import './sass/main.scss';
import './sass/popupCart.scss';
import './sass/popupInfo.scss';
import { observer } from 'mobx-react-lite';
import useHttp from './hooks/useHttp';

const App = observer(() => {
  const { products } = useContext(Context);
  const { loading, request, error, clearError } = useHttp();

  /**
   * useEffect отправляет запрос на получение всех продуктов и категорий
   * После полученные данные фильтруются и добавляются в хранилище ProductStore
   */
  useEffect(() => {
    request('http://test1.web-gu.ru/').then(data => {
      products.setСategories(data.filter(item => item.parent_id < 0));
      products.setTypes(data.filter(item => item.parent_id > 0 && !item.props));
      products.setProduts(data.filter(item => item.parent_id > 0 && item.props));

      products.setCurrentСategory(products.categories[0]);
      products.setCurrentType(products.types.filter(item => item.parent_id === products.currentСategory.id)[0]);
    });
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} exact />
      </Routes>
    </BrowserRouter>
  );
})

export default App;
