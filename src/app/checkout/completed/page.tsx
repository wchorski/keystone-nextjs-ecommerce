import { envs } from "@/envs"
import { nextAuthOptions } from "@/session"
import { NoDataFoundPage } from "@components/layouts/NoDataFoundPage"
const stripe = require("stripe")(envs.STRIPE_SECRET)
import { Stripe } from "stripe"

import {
	layout_site,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { StatusBadge } from "@components/StatusBadge"
import Link from "next/link"
import ErrorPage from "@components/layouts/ErrorPage"

type Props = {
	searchParams: { stripeCheckoutSessionId: string }
	params: { id: string }
}

export default async function CheckoutSuccessPage({
	params,
	searchParams,
}: Props) {
	const { stripeCheckoutSessionId } = await searchParams
	// const session = await getServerSession(nextAuthOptions)

	// TODO account for other `checkoutSessionId` stuff
	if (!stripeCheckoutSessionId)
		return (
			<NoDataFoundPage>
				<p> no checkout session id</p>
			</NoDataFoundPage>
		)

	const { session: stripeCheckoutSession, error } = await getCheckoutSession(
		stripeCheckoutSessionId
	)

	if (error)
		return (
			<ErrorPage error={error}>
				<p>stripe error: {error}</p>
			</ErrorPage>
		)

	if (stripeCheckoutSession && stripeCheckoutSessionId)
		return (
			<main className={[page_layout].join(" ")}>
				<header className={layout_site}>
					<h1>Checkout Successful</h1>
				</header>
				<div className={[page_content, layout_site].join(" ")}>
					<ul>
						<li>amount_total: {stripeCheckoutSession.amount_total}</li>
						<li>
							payment_status:{" "}
							<StatusBadge
								type={"any"}
								status={stripeCheckoutSession.payment_status}
							/>
						</li>
						<li>
							<Link href={`/account?dashState=orders#orders`}>My Account</Link>
						</li>
					</ul>
					{/* <pre>{JSON.stringify(stripeCheckoutSession, null, 2)}</pre> */}
				</div>
			</main>
		)

	return (
		<main className={[page_layout].join(" ")}>
			<header className={layout_site}>
				<h1>Checkout Return </h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<p>
					{" "}
					No checkout session provided. View your{" "}
					<Link href={`/account`}>account</Link> or return to{" "}
					<Link href={`/checkout`}>checkout</Link>
				</p>
			</div>
		</main>
	)
}

const getCheckoutSession = async (sessionId: string) => {
	try {
		const session = await stripe.checkout.sessions.retrieve(sessionId)

		return { session }
	} catch (error: any) {
		if (error.type === "StripeInvalidRequestError") {
			console.error("Invalid session ID:", error.message)
			return {
				error:
					"The session ID is invalid. Visit your account or contact us to resolve this issue.",
			}
		} else {
			console.error("Unexpected error:", error)
			return {
				error:
					"An unexpected error occurred. Visit your account or contact us to resolve  this issue.",
			}
		}
	}
}
