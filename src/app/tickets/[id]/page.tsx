import { nextAuthOptions } from "@/session"
import ErrorMessage from "@components/ErrorMessage"
import { DialogPopup } from "@components/menus/Dialog"
import { datePrettyLocalDay } from "@lib/dateFormatter"
import fetchTicket from "@lib/fetchdata/fetchTicket"
import { getServerSession } from "next-auth"
import Link from "next/link"
import styles, {
	qrcode_wrap,
	texture_cardstock,
} from "@styles/events/tickets.module.css"
import { Metadata } from "next"
import { envs } from "@/envs"
import {
	layout_site,
	layout_wide,
	page_content,
	page_layout,
} from "@styles/layout.module.css"
import { notFound } from "next/navigation"
import { LoginToViewPage } from "@components/menus/LoginToViewPage"
import { StatusBadge } from "@components/StatusBadge"
import { QRCode } from "@components/elements/QRCodeSVG"
import ErrorPage from "@components/layouts/ErrorPage"
import { VerifyEmailCard } from "@components/menus/VerifyEmailCard"
import { c_theme_light } from "@styles/colorthemes.module.css"
import { TicketRedeemForm } from "@components/tickets/TicketRedeemForm"
import { Callout } from "@components/blocks/Callout"

export const metadata: Metadata = {
	title: "Ticket | " + envs.SITE_TITLE,
	description: envs.SITE_DESC,
}

type Props = {
	searchParams: { q: string }
	params: { id: string }
}

export default async function TicketByIdPage({ params, searchParams }: Props) {
	const { id } = params

	const session = await getServerSession(nextAuthOptions)
	if (!session) return <LoginToViewPage />

	const {
		ticket,
		sudoTicketCount = 0,
		error,
	} = await fetchTicket(id, query, session)
	// console.log({ticket});

	if (error) return <ErrorMessage error={error} />
	if (sudoTicketCount > 0 && !ticket)
		return (
			<ErrorPage error={{}}>
				<h2>Ticket Not Available</h2>
				<p>Account must be verified to claim Ticket</p>
				<VerifyEmailCard email={session.user.email} />
			</ErrorPage>
		)
	if (!ticket) return notFound()

	const { status, event, holder, email, orderCount } = ticket

	const hostIds = event.hosts.flatMap((host) => host.id)

	return (
		<main className={page_layout}>
			<DialogPopup buttonLabel={""}>
				{hostIds.includes(session.itemId) ||
				session.data.role.canManageTickets ? (
					<>
						<TicketRedeemForm ticketId={id} status={status} />
						<br />
						<br />
						<br />
						<br />
						<br />
						<br />
						<p>
							<Link href={envs.BACKEND_URL + `/tickets/${id}`}>
								resolve ticket issues
							</Link>
						</p>
					</>
				) : (
					<Callout intent={"error"}>
						<p>Not Host or Ticket Manager</p>
					</Callout>
				)}
			</DialogPopup>

			<header className={layout_wide}>
				<h1> Ticket </h1>
			</header>
			<div className={[page_content, layout_site].join(" ")}>
				<article
					className={[styles.ticket, c_theme_light, texture_cardstock].join(
						" "
					)}
				>
					<div className={styles.meta_short}>
						<strong>{datePrettyLocalDay(event.start)}</strong>
					</div>

					<div className={styles.rip}></div>

					<ul className={styles.details}>
						<li>
							<h2>{event.summary}</h2>
						</li>
						<li>
							<h5>
								<Link href={`/locations/${event.location?.id}`}>
									{event.location?.name}
								</Link>
							</h5>
						</li>
						<li>{orderCount}</li>
						<li>
							{holder?.name} {holder?.nameLast}
						</li>
						<li>{holder?.email || email}</li>
					</ul>

					<div className={[qrcode_wrap, "anim_shadow_breath"].join(" ")}>
						{["PAID", "RSVP"].includes(status) ? (
							<QRCode text={envs.FRONTEND_URL + `/tickets/${id}?popup=modal`} />
						) : (
							<StatusBadge type="ticket" status={status} />
						)}
					</div>
				</article>

				<footer style={{ marginTop: "var(--space-l)" }}>
					{(hostIds.includes(session.itemId) ||
						session.data.role.canManageTickets) && (
						<Link
							className={"button large"}
							style={{ margin: "0 1rem" }}
							href={`?${new URLSearchParams({ popup: "modal" })}`}
						>
							Redeem Ticket
						</Link>
					)}
				</footer>
			</div>
		</main>
	)
}

const query = `
  qrcode
  id
  status
  email
  orderCount
  holder {
    id
    name
    nameLast
    email
  }
  event {
    id
    summary
    location {
      name
      address
      id
    }
    hosts{
      id
    }
    start
    end
    price
    image
    status
  }
`
