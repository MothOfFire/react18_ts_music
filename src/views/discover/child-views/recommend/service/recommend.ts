import XSRequest from '@/service';

// 轮播图数据
export function getBanner() {
  return XSRequest.get({
    url: '/banner'
  });
}

// 热门推荐数据
export const getHotRecommend = (limit = 30) =>
  XSRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  });

// 新碟上架数据
export const getAlbumNewest = () =>
  XSRequest.get({
    url: '/album/newest'
  });

// 榜单数据
export const getTopRanking = (id: number) =>
  XSRequest.get({ url: '/playlist/detail', params: { id } });

// 入驻歌手
export const getSingerData = (limit = 30) =>
  XSRequest.get({ url: '/artist/list', params: { limit } });
