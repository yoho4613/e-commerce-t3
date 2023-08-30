import React, { FC } from 'react';

interface TopBannerProps {
  
};

const TopBanner:FC<TopBannerProps> = ({}) => {
  
  return (
    <div className='bg-buttonBlack text-whitePrimary text-center py-2 text-sm sm:text-base'>
      {/* Place Holder */}
      Summer Sale For All Swim Suit And Free Express Delivery - OFF 50%! <button className='font-bold'>Shop Now</button>
    </div>
  )
};

export default TopBanner;