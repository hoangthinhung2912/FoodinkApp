
export class storeShortModel {
  id: number;
  name: string;
}

export class productModel {
  id: number;
  name: string;
  product_type: string;
  description: string;
  store: StoreModel;
  rates: RateModel[];
  sum_rate: number;
  pictures: string;
  avg_rate_score: number;
  sizes: SizeModel[];
  category: categoryModel;
}

export class categoryModel {
  id: number;
  name: string;
  picture: string;
}

export class SizeModel {
  id: number;
  size: string;
  price: number;
}

export class RateModel {
  id: number;
  rate: number;
  content: string;
}

export class StoreModel {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  open_at: Date;
  close_at: Date;
  description: string;
  pictures: ImageModel[];
}

export class ImageModel {
  no: number;
  is_destroy: number;
  link: any;
  url: string;
}

export class CartModel {
  id: number;
  quantity: number;
  product: productModel;
  size: SizeModel;
}

export class OrderInforModel {
  address: string;
  phone: string;
}

