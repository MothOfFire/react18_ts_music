import xsRequest from '@/service';

export function getSongDetail(ids: number) {
  return xsRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  });
}

export function getSongLyric(id: number) {
  return xsRequest.get({
    url: '/lyric',
    params: {
      id
    }
  });
}
