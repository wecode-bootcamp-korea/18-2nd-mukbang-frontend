import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import styled, { css } from 'styled-components';
import PriceOption from './PriceOption/PriceOption';
import StoreOption from './StoreOption/StoreOption';
import {
  PriceCategoryProvider,
  PriceCategoryConsumer,
} from './PriceCategoryContext';

const { kakao } = window;

const Filter = ({
  viewPointData,
  setViewPointData,
  getPriceRange,
  getCategoryCheck,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [place, setPlace] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [selectOption, setSelectOption] = useState(null);

  const clickSelectOption = (e, index) => {
    setSelectOption(index);
  };

  const searchOnChange = e => {
    setSearchInput(e.target.value);
  };

  const placeSubmit = e => {
    (e.keyCode === 13 || e.type === 'click') && setPlace(searchInput);
  };

  const clickSearchTarget = (e, coordinate) => {
    const { lat, lng } = coordinate;
    setViewPointData({
      ...viewPointData,
      lat: Number(lat),
      lng: Number(lng),
    });
    setSearchList([]);
    setSearchInput('');
    setPlace('');
  };

  const placeSearchCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      setSearchList(
        data.filter(item => {
          const code = item.category_group_code;
          const exceptCategory = [
            'CS2',
            'PS3',
            'AC5',
            'AG2',
            'AD5',
            'FD6',
            'CE7',
          ];
          return exceptCategory.indexOf(code) === -1 ? true : false;
        })
      );
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
      return;
    }
  };

  useEffect(() => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(place, placeSearchCB);
  }, [place]);

  return (
    <PriceCategoryProvider>
      <FilterBox>
        <FilterBoxList>
          <FilterInput
            type="text"
            name="search"
            placeholder="지역, 지하철역, 학교 검색"
            value={searchInput}
            onChange={searchOnChange}
            onKeyUp={placeSubmit}
          />
          <FilterButton onClick={placeSubmit} searchBtn>
            <FontAwesomeIcon icon={faSearch} />
          </FilterButton>
          {searchList.length !== 0 && (
            <SearchListBox>
              {searchList?.map((list, index) => {
                const coordinate = { lat: list.y, lng: list.x };
                return (
                  <SearchList
                    key={index}
                    onClick={e => {
                      clickSearchTarget(e, coordinate);
                    }}
                  >
                    <h1>{list.place_name}</h1>
                    <p>{list.address_name}</p>
                  </SearchList>
                );
              })}
            </SearchListBox>
          )}
        </FilterBoxList>
        <PriceCategoryConsumer>
          {({ state, action }) => {
            const { price, category } = state;
            const priceSelect = price[0] !== 0 && price[1] !== 20000;
            const categorySelectCheck =
              category.first.filter(Boolean).length +
                category.second.filter(Boolean).length !==
              0;
            return (
              <>
                <FilterBoxList>
                  <FilterTab>
                    {options.map((option, index) => {
                      const activeTab =
                        index === 0
                          ? selectOption === index + 1 || priceSelect
                          : selectOption === index + 1 || categorySelectCheck;
                      return (
                        <FilterTabList
                          key={index}
                          activeTab={activeTab}
                          onClick={e => {
                            clickSelectOption(e, index + 1);
                          }}
                        >
                          {option}
                          <FontAwesomeIcon icon={faCaretDown} />
                        </FilterTabList>
                      );
                    })}
                  </FilterTab>
                </FilterBoxList>
                {selectOption && (
                  <>
                    <FilterBoxList priceStoreBox selectOption={selectOption}>
                      <PriceOption
                        state={state}
                        action={action}
                        getPriceRange={getPriceRange}
                        selectOption={selectOption}
                      />
                      <StoreOption
                        state={state}
                        action={action}
                        getCategoryCheck={getCategoryCheck}
                        selectOption={selectOption}
                      />
                    </FilterBoxList>
                    <FilterBoxList resetViewBox>
                      <FilterButton
                        resetBtn
                        onClick={e => {
                          action.handleReset(e, selectOption);
                        }}
                      >
                        초기화
                      </FilterButton>
                      <FilterButton viewBtn>맛집보기</FilterButton>
                    </FilterBoxList>
                  </>
                )}
              </>
            );
          }}
        </PriceCategoryConsumer>
      </FilterBox>
    </PriceCategoryProvider>
  );
};

const options = ['가격범위', '업종'];

const FilterBox = styled.div`
  position: absolute;
  top: 80px;
  left: 30px;
  width: 358px;
  border: 1px solid #333;
  background: #eeeeee;
  z-index: 2;
`;
const FilterInput = styled.input`
  width: 100%;
  outline: none;
  ${props =>
    props.name === 'search' &&
    css`
      padding-left: 10px;
      height: 30px;
      border: 1px solid #fb8807;
      border-radius: 3px;
    `}
`;
const FilterButton = styled.button`
  cursor: pointer;
  height: 100%;

  ${props => {
    const { searchBtn, resetBtn, viewBtn } = props;
    if (searchBtn) {
      return css`
        position: absolute;
        right: 10px;
        top: 50%;
        width: 30px;
        height: 30px;
        background: #fb8807;
        border-radius: 3px;
        color: #fff;
        transform: translateY(-50%);
      `;
    } else if (resetBtn) {
      return css`
        flex-grow: 3;
        font-size: 16px;
      `;
    } else if (viewBtn) {
      return css`
        flex-grow: 7;
        background: #fa950b;
        border-radius: 7px;
        font-weight: 700;
        font-size: 16px;
        color: #fff;
      `;
    }
  }}
`;

const FilterBoxList = styled.div`
  position: relative;
  background: #fff;
  padding: 10px;
  width: 100%;

  svg {
    pointer-events: none;
  }
  ${({ priceStoreBox, resetViewBox }) => {
    if (priceStoreBox)
      return css`
        max-height: 360px;
        padding: 0;
        background: #eee;
        border-top: 1px solid #eeeeee;
        overflow-y: ${props => (props.selectOption === 2 ? 'auto' : 'none')};
      `;
    else if (resetViewBox)
      return css`
        display: flex;
        height: 60px;
      `;
  }};
`;

const FilterTab = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const FilterTabList = styled.li`
  display: flex;
  align-items: center;
  height: 30px;
  margin-right: 10px;
  padding: 0 10px;
  background: #f6f6f6;
  font-size: 12px;
  color: #222;
  line-height: 30px;
  cursor: pointer;
  svg {
    margin-left: 5px;
    color: #333;
    pointer-events: none;
  }

  ${props =>
    props.activeTab &&
    css`
      background: #fef4e5;
      border: 1px solid #fb8807;
      font-weight: 700;
      color: #fb8807;
      svg {
        color: #fb8807;
      }
    `};
`;

const SearchListBox = styled.ul`
  position: absolute;
  width: calc(100% - 50px);
  height: 460px;
  top: 40px;
  left: 10px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  background: #fff;
  overflow-y: scroll;
  z-index: 2;
`;

const SearchList = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 63px;
  padding: 0 10px;
  line-height: 18px;
  cursor: pointer;

  h1 {
    font-size: 12px;
    font-weight: 700;
  }

  p {
    font-size: 10px;
  }

  &:hover {
    background: #ddd;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10px;
    width: calc(100% - 20px);
    height: 1px;
    background: rgba(0, 0, 0, 0.1);
  }

  &:last-of-type::after {
    display: none;
  }
`;
export default Filter;
