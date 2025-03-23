export interface CampgroundItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  region: string;
}

export interface CampgroundResponse {
  success: boolean;
  data: {
    _id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel: string;
    region: string;
    __v: number;
  };
}

export interface CampgroundJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CampgroundItem[];
}

export interface BookingItem {
  nameLastname: string;
  tel: string;
  venue: string;
  bookDate: string;
}