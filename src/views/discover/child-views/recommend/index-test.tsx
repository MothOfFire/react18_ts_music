import React, { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import XSRequest from '@/service';

interface IProps {
  children?: ReactNode;
}

const Recommend: FC<IProps> = () => {
  const [banners, setBanners] = useState<any[]>([]);
  // 测试网络请求
  useEffect(() => {
    XSRequest.get({
      url: '/banner'
    }).then((res: any) => {
      console.log(res);
      setBanners(res.banners);
    });
  }, []);
  return (
    <div>
      {banners.map((item) => {
        return <div key={item.imageUrl}>{item.imageUrl}</div>;
      })}
    </div>
  );
};

export default memo(Recommend);
