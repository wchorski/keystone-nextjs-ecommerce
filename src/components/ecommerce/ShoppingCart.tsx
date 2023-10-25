'use client'
import { calcTotalPrice } from '@lib/calcTotalPrice'
import { useCart } from '@components/context/CartStateContext'
import moneyFormatter from '@lib/moneyFormatter'
import styles from '@styles/ecommerce/cart.module.scss'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CartItem from './CartItem'
import { TbArrowBarToRight } from "react-icons/tb";
import Link from 'next/link'
import { CartCount2 } from './CartCount2'
import { useSession } from 'next-auth/react'
import type { CartItem as CartItemType, User } from '@ks/types'
import { client } from '@lib/request'
// todo if clicked off of cart then close the cart

export default function ShoppingCart() {

  // const [cart, setCart] = useState<CartItemType[]>([])
  const elementRef = useRef<HTMLDivElement | null>(null);
  const { data: session, status }  = useSession()
  // console.log({session});
  
  const { isOpen, setIsOpen, openCart, closeCart, cartItems, setCartItems } = useCart()

  async function getUserCart(){
    // const variables = {
    //   where: {
    //     // @ts-ignore
    //     id: session?.itemId
    //   }
    // }

    try {
      // const { user } = await client.request(query, variables) as { user:User }
      const res = await fetch(`/api/sessioncart`, {
        method: 'POST',
        body: JSON.stringify({})
      }) 
      const { user } = await res.json()

      if(!user.cart) return console.log('cart not found');
      setCartItems(user.cart)
      
    } catch (error) {
      console.log('!!! getusercart: ', error);
      
    }
  }

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        elementRef.current &&
        isOpen &&
        !elementRef.current.contains(e.target as Node)
      ) {
        closeCart();
      }
    },
    [isOpen]
  );


  useEffect(() => {
    getUserCart()
  
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('click', handleClickOutside);
    };
  }, [session])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside])
  
  


  // if(!session) return <p>Login to start shopping</p>

  return (
    <div 
      className={isOpen ? [styles.shoppingcart, styles.open].join(' ') : styles.shoppingcart}
      ref={elementRef}
    >

      <header>
        <button 
          onClick={e => closeCart()} 
          className={isOpen ? [styles.knob, styles.open].join(' ') : styles.knob}
          title="close cart"
        > 
          <TbArrowBarToRight />
        </button>
        
        <h2>
           Cart
        </h2>
        <CartCount2 count={cartItems?.reduce(
          (tally: any, cartItem: any) => tally + cartItem.quantity,
          0
        )} />
      </header>

      {cartItems?.length <= 0 && <p> No items found. <Link href={`/shop`}> Go to shop </Link> </p>}
      <ul>
        {cartItems?.map((item: any) => <CartItem key={item.id} item={item} />)}
      </ul>
      
      <footer>
        <p> <span>Total: </span> {moneyFormatter(calcTotalPrice(cartItems))}</p>
        <Link
          href={'/shop/checkout'}
          onClick={() => closeCart()}
          className='button medium'
        >
          Checkout
        </Link>
      </footer>
    </div>
  )
}

// const query = `
//   query getUserCart($where: UserWhereUniqueInput!) {
//     user(where: $where) {
//       cart {
//         id
//         quantity
//         product {
//           id
//           price
//           name
//           image
//         }
//       }
//     }
//   }
// `