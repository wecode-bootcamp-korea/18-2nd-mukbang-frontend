import React from 'react';
import Filter from './Components/Filter/Filter';
import StoreList from './Components/StoreList/StoreList';
import StoreDetail from './Components/StoreDetail/StoreDetail';
import './Main.scss';

const Main = () => {
  return (
    <main>
      <section className="main">
        <div></div>
        <Filter />
        {/*<StoreList /> */}
        <StoreDetail />
      </section>
    </main>
  );
};

export default Main;
