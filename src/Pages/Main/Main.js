import React from 'react';
import Header from '../../Components/Header/Header';
import Filter from './Components/Filter/Filter';
import StoreList from './Components/StoreList/StoreList';
import './Main.scss';

const Main = () => {
  return (
    <main>
      <Header />
      <section className="main">
        <div></div>
        <Filter />
        <StoreList />
      </section>
    </main>
  );
};

export default Main;
