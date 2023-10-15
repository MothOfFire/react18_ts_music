import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import XSRequest from '@/service';

interface IProps {
  children?: ReactNode;
}
// interface IBannersData {
//   imageUrl: string;
//   targetId: number;
//   targetType: number;
//   titleColor: string;
//   typeTitle: string;
//   exclusive: boolean;
//   encodeId: string;
//   scm: string;
//   bannerBizType: string;
// }

const Recommend: FC<IProps> = () => {
  // const [banners, setBanners] = useState<IBannersData[]>([]);
  // 测试网络请求
  useEffect(() => {
    XSRequest.get({
      url: '/banner'
    }).then((res: any) => {
      console.log(res);
      // setBanners(res.banners);
    });
  }, []);
  return (
    <div>
      {/* {banners.map((item, index) => {
        return <div key={index}>{item.imageUrl}</div>;
      })} */}
    </div>
  );
};

export default memo(Recommend);
