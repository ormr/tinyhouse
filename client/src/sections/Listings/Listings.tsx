import React from 'react';
import { server, useQuery } from '../../lib/api';
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

  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingsData, DeleteListingsVariables>({
      query: DELETE_LISTING,
      variables: {
        id
      }
    });

    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings
    ? listings.map(({ id, title }) => {
        return (
          <li key={id} style={{"marginBottom": "10px"}}>
            <span style={{"marginRight": "5px"}}>{title}</span>
            <button
              style={{"cursor": "pointer", "border": 0, "background": "transparent"}}
              onClick={() => deleteListing(id)}
            >
              <span role="img" aria-label="delete-emoji">❌</span>
            </button>
          </li>
        );
      })
    : null;
  
  if (loading) {
    return <h2>loading...</h2>
  }

  if (error) {
    return <h2>Something went wrong. Try again later.</h2>
  }
  
  return (
    <div style={{"fontFamily": "Arial"}}>
      <h2>{title}</h2>
      <ul>{listingsList}</ul>
    </div>
  );
};
