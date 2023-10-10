export interface ProductDetail {
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
    external: string;
  };
  new: boolean;
  name: string;
  description: string;
  category: string;
  features: string;
  includes: {
    quantity: number;
    item: string;
  }[];
  price: number;
  slug: string;
  quantity: number;
}