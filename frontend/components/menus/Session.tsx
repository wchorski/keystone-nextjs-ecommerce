// import { useGlobalContext } from "../lib/useSessionContext";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import styled from "styled-components";
import SignOutButton from "./SignOutButton";

// export const User = () => {
//   return (
//     <div>User</div>
//   )
// }

export function SessionBadge({ session }: any) {

  return (
    <StyledSessionBadge className="toggle-menu">
      <MdAccountCircle />
      <ul>
        <li><Link href={`/account`}> My Account </Link> </li>
        <li>{session.name}</li>
        <li>{session.email}</li>
        <li><SignOutButton /></li>
      </ul>
    </StyledSessionBadge>
  )
}


export function useUser() {
  // TODO GET THIS WORKING
  const { data } = useQuery(QUERY_USER_CURRENT)
  // console.log('++++++ useUser, ', data);
  return data?.authenticatedItem

  // const ctx = useGlobalContext()
  // return ctx?.session
}

export const QUERY_USER_CURRENT = gql`
  query AuthenticatedItem {
    authenticatedItem {
      ... on User {
        email
        id
        isAdmin
        name
        role {
          canManageCart
          canManageOrders
          canManageProducts
          canManageRoles
          canManageUsers
          canSeeOtherUsers
        }
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`

const StyledSessionBadge = styled.button`
  padding: 1em;
  text-align: right;
  position: relative;
  margin-left: auto;


  /* svg{
    font-size: 2rem;
  } */

  ul{
    opacity: 0;
    position: absolute;
    pointer-events: none;
    top: 100%;
    background-color: var(--c-txt-rev);
    display: flex;
    flex-direction: column;
    padding: .5em;
    box-shadow: var(--boxs-1);
    transform: translateY(10px);
    transition: all linear .1s;
    right: 0;
  }

  li{
    margin-bottom: 1em;
  }

  a{
    padding: 0 !important;
    margin: 0;
  }

  &:hover, &:focus{
    ul{
      opacity: 1;
      pointer-events: all;
      transform: translateY(0px);
    }
  }
`