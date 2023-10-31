import { set } from 'date-fns';
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
    description?: string,
    owner?: string,
    category?: string,
    createdAt?: Date
  }