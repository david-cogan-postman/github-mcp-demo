// User type - OUTDATED: missing 'role' and 'created_at' fields
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  in_stock: boolean;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  zip: string;
}

export interface Order {
  user_id: number;
  items: OrderItem[];
  shipping: ShippingAddress;
}
