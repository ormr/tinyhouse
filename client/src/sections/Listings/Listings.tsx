import React from 'react';
import { server } from '../../lib/api';
import { Listing } from './types';
import {
  ListingsData,
  DeleteListingsData,
  DeleteListingsVariables
} from './types';

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings: React.FC<Props> = ({ title }) => {
  const [listings, setListings] = React.useState<Listing[] | null>(null);

  React.useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({
      query: LISTINGS
    });
    setListings(data.listings);
  };

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingsData, DeleteListingsVariables>({
      query: DELETE_LISTING,
      variables: {
        id
      }
    });

    fetchListings();
  };

  const listingsList = listings
    ? listings.map(({ id, title }) => {
        return (
          <li key={id}>
            {title}
            <button onClick={() => deleteListing(id)}>X</button>
          </li>
        );
      })
    : null;

  return (
    <div>
      <h2>{title}</h2>
      <ul>{listingsList}</ul>
      <button onClick={fetchListings}>Query Listings</button>
    </div>
  );
};
