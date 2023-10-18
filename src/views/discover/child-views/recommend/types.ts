// 热门推荐
export interface IPersonalized {
  id: number;
  type: number;
  name: string;
  copywriter: string;
  picUrl: string;
  canDislike: boolean;
  trackNumberUpdateTime: number;
  playCount: number;
  trackCount: number;
  highQuality: boolean;
  alg: string;
}

export interface IPersonalizedResult {
  hasTaste: boolean;
  code: number;
  category: number;
  result: Array<IPersonalized>;
}

// 新碟上架
export interface IArtist {
  name: string;
  id: number;
  type: string;
  size: number;
  picId: number;
  blurPicUrl: string;
  companyId: number;
  pic: number;
  picUrl: string;
  publishTime: number;
  description: string;
  tags: string;
  company: string;
  briefDesc: string;
  artist: Artist;
  songs: any;
  alias: any[];
  status: number;
  copyrightId: number;
  commentThreadId: string;
  artists: Artist2[];
  paid: boolean;
  onSale: boolean;
  picId_str: string;
}

export interface Artist {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: string[];
  trans: string;
  musicSize: number;
  topicPerson: number;
  img1v1Id_str: string;
}

export interface Artist2 {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: any[];
  trans: string;
  musicSize: number;
  topicPerson: number;
  img1v1Id_str: string;
}
