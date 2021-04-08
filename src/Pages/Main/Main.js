import React from 'react';
import Filter from './Components/Filter/Filter';
import StoreList from './Components/StoreList/StoreList';
import StoreDetail from './Components/StoreDetail/StoreDetail';
import './Main.scss';
import { useHistory } from 'react-router-dom';

const Main = () => {
  const history = useHistory();
  const PATH = history.location.pathname;
  return (
    <main>
      <section className="main">
        <div></div>
        <Filter />
        {PATH === '/main' ? <StoreList /> : <StoreDetail />}
      </section>
    </main>
  );
};

export default Main;
