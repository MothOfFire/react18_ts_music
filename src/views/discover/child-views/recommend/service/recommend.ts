import XSRequest from '@/service';

export function getBanner() {
  return XSRequest.get({
    url: '/banner'
  });
}
