import { User } from "./users.type";

export interface AdCardProps extends AdCardType {
  total: number;
  setTotal: any;
}

export interface AdCardType {
  title?: string;
  picture?: string;
  price?: number;
  id?: number;
  location?: string;
  description?: string;
  category?: string;
  createdAt?: Date;
  user: User;
}
