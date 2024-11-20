"use client"
import { btn_msg, btn_msg_reveal } from "@styles/elements/button.module.scss"
import { useState } from "react"
import { BsShare } from "react-icons/bs"

type Props = {
	textToCopy: string
}

export function ShareButton({ textToCopy }: Props) {
	const [isCopied, setIsCopied] = useState(false)

	function onClick() {
		navigator.clipboard.writeText(textToCopy)
		setIsCopied(true)
		setTimeout(() => {
			setIsCopied(false)
		}, 2000) //
	}

	const hiddenStyle = {}

	return (
		<div style={{ display: "flex", gap: "var(--space-s)" }}>
			<button
				className={["subtext", "sub-text"].join(" ")}
				title="copy share link"
				onClick={onClick}
				style={{
					border: "none",
					padding: "var(--space-s)",
					display: "flex",
					alignItems: "center",
					gap: "var(--space-s)",
				}}
			>
				<BsShare />
				<span> Share</span>
			</button>

			<span
				className={[
					"subtext",
					"sub-text",
					btn_msg,
					isCopied ? btn_msg_reveal : "",
				].join(" ")}
			>
				{" "}
				link copied{" "}
			</span>
		</div>
	)
}