"use client"
import { useCart } from "@components/hooks/CartStateContext"
import { LoadingAnim } from "@components/elements/LoadingAnim"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import CartItem from "./CartItem"

export function CartItemsList() {
	// const [isPending, setIsPending] = useState(true)
	const { data: session, status } = useSession()
	const { cartItems, closeCart, getUserCart, isPending } = useCart()

	useEffect(() => {
		if (!session?.itemId) return

		getUserCart(session?.itemId)

	}, [session, getUserCart])

	const ticketCartItems = cartItems.filter((item) => item.event?.id)
	const filteredProductItems = cartItems.filter((item) => item.product?.id)

	return (
		<>
			<ul style={{ padding: "0" }}>
				{isPending ? (
					<LoadingAnim isVisable={isPending} />
				) : cartItems?.length <= 0 ? (
					<p>
						Cart is empty.{" "}
						<Link href={`/shop`} onClick={closeCart}>
							Go to shop
						</Link>
					</p>
				) : (
					<>
						{ticketCartItems?.map((item: any) => (
							<CartItem key={item.id} item={item} sessionId={session?.itemId} />
						))}
						{filteredProductItems?.map((item: any) => (
							<CartItem key={item.id} item={item} sessionId={session?.itemId} />
						))}
					</>
				)}
			</ul>
		</>
	)
}
