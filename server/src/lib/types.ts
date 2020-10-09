import { Collection, ObjectId } from 'mongodb';

export interface Listing {
  _id: ObjectId;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBaths: number;
  numOfBeds: number;
  rating: number;
}

export interface Database {
  listings: Collection<Listing>;
}
