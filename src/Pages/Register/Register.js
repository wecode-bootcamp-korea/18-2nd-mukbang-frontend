import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import DetailInfo from './DetailInfo/DetailInfo';
import ImageInfo from './ImageInfo/ImageInfo';
import topBanner from './images/topBanner.png';
import MenuInfo from './MenuInfo/MenuInfo';
import RegisterAddress from './RegisterAddress/RegisterAddress';
import RegisterMenu from './RegisterMenu/RegisterMenu';
import RegisterStoreImage from './RegisterStoreImage/RegisterStoreImage';
import StoreDetail from './StoreDetail/StoreDetail';
import { FormTable, FormButton, FormBottomBox } from './StyleData/StyleData';
import adBanner1 from './images/adBanner1.png';
import adBanner2 from './images/adBanner2.png';
import { URL } from '../../config';

const Register = () => {
  const [storeInput, setStoreInput] = useState({});
  const [imageList, setImageList] = useState(Array(4).fill(false));
  const [menuImageList, setMenuImageList] = useState([]);
  const [daumPost, setDaumPost] = useState(false);
  const [address, setAddress] = useState('');
  const [roadAddress, setRoadAddress] = useState({});
  const [subwayData, setSubwayData] = useState([]);

  const dumaPostStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    border: '1px solid #000',
    zIndex: 3,
  };

  const getAddressData = data => {
    const { userSelectedType, roadAddress, jibunAddress } = data;
    setAddress(userSelectedType === 'R' ? roadAddress : jibunAddress);
  };

  const handleDaumPost = () => {
    setDaumPost(!daumPost);
  };

  const searchSubway = (station, line) => {
    const query = `${station} ${line}`;
    fetch(
      `https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=1&sort=accuracy&query=${query}`,
      {
        headers: {
          Authorization: 'KakaoAK f2932441adb6d858c74534d9e19c1436',
        },
      }
    )
      .then(res => res.json())
      .then(res => {
        if (res.message === 'query parameter required') {
          alert('입력을 해주세요.');
          return;
        } else if (res.documents.length === 0) {
          alert('검색 결과가 없습니다.');
          return;
        }
        const data = res.documents[0];
        const saveData = {
          name: data.place_name.split(' ')[0],
          line: data.place_name.split(' ')[1],
          x: data.x,
          y: data.y,
        };
        setSubwayData([...subwayData, saveData]);
        setStoreInput({
          ...storeInput,
          station: '',
          line: '',
        });
      });
  };

  const searchPlace = () => {
    fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?size=1&page=1&query=${address}`,
      {
        headers: {
          Authorization: 'KakaoAK f2932441adb6d858c74534d9e19c1436',
        },
      }
    )
      .then(res => res.json())
      .then(res => {
        const roadData = res.documents[0].road_address;
        setRoadAddress({
          ...roadAddress,
          ...roadData,
        });
      });
  };

  const postAllData = () => {
    const storeImages = imageList.slice(0, 3).filter(Boolean);
    const allMenuImage = imageList[3];
    const storeData = {
      category: storeInput.category,
      open_status: storeInput.status,
      store_name: storeInput.storeName,
      one_line_introduction: storeInput.introduce,
      opening_time_description: storeInput.workTime,
      phone_number: storeInput.phone,
      sns_url: storeInput.SNS,
      menu_pamphlet_image_url: allMenuImage,
      is_reservation: storeInput.reserve,
      is_wifi: storeInput.wifi,
      is_parking: storeInput.park,
      store_image_urls: storeImages,
      road_address: roadAddress,
      menus: menuImageList,
      metros: subwayData,
    };
    console.log(storeImages, allMenuImage, storeData);
    fetch(`${URL}/store`, {
      method: 'POST',
      body: JSON.stringify({
        data: storeData,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.message === 'KEY_ERROR') {
          alert('다시 작성해주세요.');
        } else if (res.message === 'SUCCESS') {
          alert('맛집이 등록됐습니다.');
        }
      });
  };

  const handleStoreInput = e => {
    const { name, value } = e.target;
    setStoreInput({
      ...storeInput,
      [name]: value,
    });
  };

  const removeMenuList = dataIndex => {
    const filterData = menuImageList.filter((e, index) => index !== dataIndex);
    setMenuImageList(filterData);
  };

  const removeSubwayList = name => {
    const filterData = subwayData.filter(data => data.name !== name);
    setSubwayData(filterData);
  };

  const handleRegister = (listIndex, imageName, ImageUrl) => {
    const imageCheck = imageList[listIndex] ? false : ImageUrl;
    !imageCheck && setStoreInput({ ...storeInput, [imageName]: '' });
    setImageList(
      imageList.map((list, index) => (listIndex === index ? imageCheck : list))
    );
    imageCheck ? alert('등록했습니다.') : alert('삭제했습니다');
  };

  const handleImageList = (e, imageName, listIndex) => {
    const ImageValidation = Array(storeInput[imageName]).filter(Boolean).length;
    ImageValidation === 0
      ? alert('이미지를 등록해주세요.')
      : handleRegister(listIndex, imageName, storeInput[imageName]);
  };

  const addMenuImageList = (menuImage, menuName, price) => {
    if (menuImageList.length >= 4) {
      alert('최대 4개까지 등록할 수 있습니다.');
    } else {
      setMenuImageList([
        ...menuImageList,
        { name: menuName, image_url: menuImage, price: price },
      ]);
      setStoreInput({
        ...storeInput,
        menuImage: '',
        menuName: '',
        price: '',
      });
      alert('메뉴 이미지를 등록했습니다.');
    }
  };

  const handleMenuList = () => {
    const { menuImage, menuName, price } = storeInput;
    const inputList = [menuImage, menuName, price].filter(Boolean).length;
    inputList === 3
      ? addMenuImageList(menuImage, menuName, price)
      : alert('모두 입력해주세요.');
  };

  const handleSubwayList = () => {
    const { station, line } = storeInput;
    station && line ? searchSubway(station, line) : alert('모두 입력해주세요.');
  };

  useEffect(() => {
    address.length !== 0 && searchPlace();
  }, [address]);

  return (
    <RegisterContainer>
      <RegisterSection>
        <RegisterInnerContainer>
          <RegisterFomContainer>
            <RegisterFormBox>
              <RegisterTopBanner>
                <TopBannerImage src={topBanner} alt="상단 배너 이미지" />
                <TopBannerTitle>위코드 맛집 등록하기</TopBannerTitle>
              </RegisterTopBanner>
              <DetailInfo />
              <FormTitle>가게 정보</FormTitle>
              <StoreDetail handleStoreInput={handleStoreInput} />
              <FormTitle>이미지 등록</FormTitle>
              <ImageInfo />
              <RegisterStoreImage
                storeInput={storeInput}
                imageList={imageList}
                handleImageList={handleImageList}
                handleStoreInput={handleStoreInput}
              />
              <FormTitle>메뉴 등록</FormTitle>
              <FormTable>
                <MenuInfo />
                <RegisterMenu
                  storeInput={storeInput}
                  handleStoreInput={handleStoreInput}
                  handleMenuList={handleMenuList}
                  menuImageList={menuImageList}
                  removeMenuList={removeMenuList}
                />
              </FormTable>
              <FormTitle>주소 & 주변역 등록</FormTitle>
              <RegisterAddress
                storeInput={storeInput}
                address={address}
                subwayData={subwayData}
                handleStoreInput={handleStoreInput}
                handleDaumPost={handleDaumPost}
                handleSubwayList={handleSubwayList}
                removeSubwayList={removeSubwayList}
              />
              {daumPost && (
                <DaumPostcode
                  width={400}
                  autoClose={true}
                  style={dumaPostStyle}
                  onComplete={getAddressData}
                />
              )}
            </RegisterFormBox>
            <FormBottomBox>
              <FormButton className="submitBtn" onClick={postAllData}>
                먹방 내놓기
              </FormButton>
            </FormBottomBox>
          </RegisterFomContainer>
          <AdvertiseBannerBox>
            {adTitle.map((title, index) => (
              <AdBannerBox key={index}>
                <AdBannerImg
                  src={index === 0 ? adBanner1 : adBanner2}
                  alt="광고"
                />
                <AdBannerTitle>{title}</AdBannerTitle>
                <FontAwesomeIcon icon={faChevronRight} />
              </AdBannerBox>
            ))}
          </AdvertiseBannerBox>
        </RegisterInnerContainer>
      </RegisterSection>
    </RegisterContainer>
  );
};

const adTitle = ['위코더에게 맛집이란?', '먹방 등록 가이드'];

export default Register;

const RegisterContainer = styled.main`
  background: #f6f6f6;
  margin-top: 80px;
`;
const RegisterSection = styled.section`
  padding-top: 23px;
`;
const RegisterInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 950px;
  margin: 0 auto;
`;
const RegisterFomContainer = styled.div``;
const RegisterFormBox = styled.div`
  width: 630px;
  padding: 0 15px 50px;
  border: 1px solid #d8d3c7;
  background: #fff;
`;
const AdvertiseBannerBox = styled.div`
  width: 310px;
`;
const RegisterTopBanner = styled.h3`
  display: flex;
  flex-direction: column;
  height: 147px;
  margin-top: 20px;
  background: #fea500;
  justify-content: center;
  align-items: center;
`;
const TopBannerTitle = styled.p`
  font-size: 45px;
  color: #fff;
  text-align: center;
`;
const TopBannerImage = styled.img`
  width: 200px;
  margin-bottom: 10px;
`;

const FormTitle = styled.h4`
  margin: 30px 0 10px;
  font-size: 16px;
  font-weight: 700;
`;
const AdBannerBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px;
  background: #fff;
  border: 1px solid #c5c5c5;

  &:first-of-type {
    margin-bottom: 10px;
  }
  svg {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
`;
const AdBannerImg = styled.img`
  height: 45px;
  object-fit: cover;
  margin-right: 10px;
`;
const AdBannerTitle = styled.h2`
  font-weight: 700;
  font-size: 18px;
`;
