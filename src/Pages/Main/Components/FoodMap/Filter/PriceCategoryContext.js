import { createContext, useState } from 'react';

const PriceCategoryContext = createContext();

const PriceCategoryProvider = ({ children }) => {
  const [price, setPrice] = useState([0, 20000]);
  const [category, setCategory] = useState({
    first: Array(6).fill(false),
    second: Array(7).fill(false),
  });

  const handlePrice = (e, newvalue) => {
    setPrice(newvalue);
  };

  const handleReset = (e, selectOption) => {
    selectOption === 0
      ? setPrice([0, 20000])
      : setCategory({
          ...category,
          first: Array(6).fill(false),
          second: Array(7).fill(false),
        });
  };
  const handleCategorySubOrAll = (target, saveType, targetCategory, name) => {
    const nowCheck = targetCategory.filter(Boolean).length;
    const nowSub = targetCategory[Number(target - 1)];

    return nowCheck === targetCategory.length - 2 && !nowSub
      ? setCategory({ ...category, [name]: saveType[0] })
      : setCategory({ ...category, [name]: saveType[1] });
  };

  const checkCategory = (e, index, target) => {
    const name = ['first', 'second'];
    const targetCategory = index === 0 ? category.first : category.second;
    const saveType = [
      targetCategory.map((select, index) => (index === 0 ? !select : false)),
      targetCategory.map((select, index) =>
        index === 0 ? false : index + 1 === Number(target) ? !select : select
      ),
    ];
    const targetCondition = Number(target) === 1;

    targetCondition
      ? setCategory({ ...category, [name[index]]: saveType[0] })
      : handleCategorySubOrAll(target, saveType, targetCategory, name[index]);
  };

  const value = {
    state: { price, category },
    action: {
      handleReset,
      handlePrice,
      setPrice,
      checkCategory,
    },
  };
  return (
    <PriceCategoryContext.Provider value={value}>
      {children}
    </PriceCategoryContext.Provider>
  );
};
const { Consumer: PriceCategoryConsumer } = PriceCategoryContext;
export { PriceCategoryProvider, PriceCategoryConsumer };
