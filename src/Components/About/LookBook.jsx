import React from 'react'
import Banner from '../Share/Banner'
import SwiperCard from '../Products/SwiperCard';

const LookBook = () => {
     const ban3 = 'https://t3.ftcdn.net/jpg/06/08/19/10/360_F_608191088_ATXwUHQnOIe67Dnt7JDkzKWHDpgCfuCA.jpg';
  return (
    <div>
        <Banner ban={ban3}></Banner>
        <SwiperCard></SwiperCard>
    </div>
  )
}

export default LookBook