import Image from 'next/image';
import Link from 'next/link';
import { ProductThumbnail } from "@/components/ProductThumbnail";
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components';

export function ProductsList() {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;

  return (
    <StyledProductsList>
      {data.products.map((prod: any) => {
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
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  list-style: none;
  margin: 0;
  padding: 0;

  li{
    background-color: #dcdcdc;
    padding: .3em;
  }

  img{
    width: 100%;
    height: auto;
  }
`

const GET_ALL_PRODUCTS = gql`
  query Products {
    products {
      id
      description
      name
      photo {
        image {
          url
          width
          height
          id
        }
        id
        altText
      }
      price
      status
    }
  }
`