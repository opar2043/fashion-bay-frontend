import React from 'react'
import Banner from '../Share/Banner'
import Title from '../Share/Title';
import MoreDetails from '../About/MoreDetails';
import HomeProducts from '../Products/HomeProduct';
import SwiperCard from '../Products/SwiperCard';
import Review from '../Review/Review';
import WhyShopWithUs from './WhyShopWithUs';
import img1 from "../../assets/banner1.jpg"
import img2 from "../../assets/banner2.jpg"
import img3 from "../../assets/banner3.jpg"

const Home = () => {
    const ban1 = img1;

    const ban2 = img2;
    const ban3 = img3;
  return (
    <div>
        <Banner ban={ban1}></Banner>
        <Title head={'NEW'} head2={"IN"} para={'New Styles Drop Daily'}></Title>
        {/* <CategoryData></CategoryData> */}
        <HomeProducts></HomeProducts>
        <Banner ban={ban2}></Banner>
         <Title head={'MEGA'} head2={"OFFER"} para={'Grab Your Item'}></Title>
        <Banner ban={ban3}></Banner>
        <SwiperCard></SwiperCard>
        <Review></Review>
        <MoreDetails></MoreDetails>
        {/* FAQ hidden on home page */}
        {/* <Faq></Faq> */}
        <WhyShopWithUs></WhyShopWithUs>
        {/* <Policy></Policy> */}
    </div>
  )
}

export default Home