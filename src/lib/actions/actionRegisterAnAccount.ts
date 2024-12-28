"use server"
import { envs } from "@/envs"
import { keystoneContext } from "@ks/context"

export type RegisterAnAccountValues = {
	name: string
	email: string
	password: string
	passwordConfirm: string
}

export type RegisterAnAccountState = {
  url?:string,
	values?: RegisterAnAccountValues
	valueErrors?: Record<keyof RegisterAnAccountValues, string> | undefined
	error?: string
	success?: string
}

export async function actionRegisterAnAccount(
	prevState: RegisterAnAccountState,
	formData: FormData
): Promise<RegisterAnAccountState> {
	try {
		const values = Object.fromEntries(formData) as RegisterAnAccountValues
		// // @ts-ignore
		// delete values["$ACTION_REF_1"]; delete values["$ACTION_1:0"]; delete values["$ACTION_1:1"];  delete values["$ACTION_KEY"];
		const { name, email, password, passwordConfirm } = values
		const data = (await keystoneContext.graphql.run({
			query: `
        mutation RegisterAnAccount($name: String!, $email: String!, $password: String!, $passwordConfirm: String!) {
          registerAnAccount(name: $name, email: $email, password: $password, passwordConfirm: $passwordConfirm) {
            id
          }
        }
      `,
			variables: values,
			// variables: {
			// 	name: "wiLLB1gg$one__3",
			// 	email: "wiLLB1gg$one__3@m",
			// 	password: "wiLLB1gg$one__3",
			// 	passwordConfirm: "wiLLB1gg$one__3",
			// },
		})) as { registerAnAccount: { id: string } }

		return {
			url: envs.FRONTEND_URL + `/users/${data.registerAnAccount.id}`,
			success: `Success! Account registered with ${email}`,
		} 
	} catch (error) {
		console.log("!!! actionRegisterAnAccount: ", error)
		return {
			error: "Registeration Failed: " + error,
			success: undefined,
		}
	}
}