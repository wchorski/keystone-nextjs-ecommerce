import Image from 'next/image';
import Link from 'next/link';
import { ProductThumbnail } from "../ProductThumbnail";
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components';
import { QueryLoading } from '../menus/QueryLoading';
import { QueryError } from '../menus/QueryError';
import { perPage } from '../../config';

type ProdProps = {
  page: number
}

export function ProductsList({ page }: ProdProps) {
  const { loading, error, data } = useQuery(GET_PAGE_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      take: perPage
    }
  })

  if (loading) return <QueryLoading />
  if (error) return <QueryError error={error} />
  // console.log({ data });

  return (
    <StyledProductsList>
      {/* {data.products.length <= 0 && (
        <p> No Products Available </p>
      )} */}
      {data.products.map((prod: any) => {
        // console.log(prod);

        if(prod.status === 'DRAFT') return null

        return (
          <li key={prod.id}>
            <ProductThumbnail {...prod} />

          </li>
        );
      })}
    </StyledProductsList>
  )
}

const StyledProductsList = styled.ul`

  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  list-style: none;
  padding: 0;

  img{
    width: 100%;
    object-fit: cover;
    background: var(--cg-stripes);
  }
`

export const GET_PAGE_PRODUCTS_QUERY = gql`
  query Query($skip: Int!, $take: Int) {
    products(skip: $skip, take: $take) {
      excerpt
      id
      name
      price
      status
      image
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

export const GET_ALL_PRODUCTS = gql`
  query Products {
    products {
      id
      excerpt
      name
      price
      status
      image
      # photo {
      #   id
      #   altText
      #   image {
      #     publicUrlTransformed
      #   }
      # }
    }
  }
`