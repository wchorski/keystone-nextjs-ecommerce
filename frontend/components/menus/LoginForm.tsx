import useForm from "../../lib/useForm";
import { StyledForm } from "../../styles/Form.styled";
import PasswordReset from "../../components/menus/PasswordResetRequest";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { QUERY_USER_CURRENT } from "./Session";
import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";
// import { useGlobalContext } from "../../lib/useGlobalContext";
// import { useLocalStorage } from "../../lib/useLocalStorage";


export default function LoginForm() {

  // const { session, setSession } = useGlobalContext()
  const router = useRouter()

  const [isReset, setIsReset] = useState(false)

  const { inputs, handleChange, clearForm, resetForm } = useForm({
    email: '',
    password: '',
  })

  const [loginUser, { data, error, loading }] = useMutation(MUTATION_USER_LOGIN)

  async function handleSubmit(e: any) {
    e.preventDefault()
    // console.log(inputs)
    const res = await loginUser({
      variables: inputs,
      refetchQueries: [{ query: QUERY_USER_CURRENT }]
    })
    // console.log('res', res)

    if (res.data.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordFailure")
      console.log('LOGIN FAILED, ', res.data.authenticateUserWithPassword.message)
    // TODO why is it creating an empty session object
    // console.log(session);


    if (res.data.authenticateUserWithPassword.__typename === "UserAuthenticationWithPasswordSuccess"){
      console.log('LOGIN SUCCESS, ', res.data.authenticateUserWithPassword)
      router.push(`/home`)
    }
    // @ts-ignore
    // TODO setting local storage
    // setSession(prev => ({...prev, ...res.data.authenticateUserWithPassword.item}) )
    // localStorage.setItem('session', JSON.stringify(res.data.authenticateUserWithPassword))
    // useLocalStorage('session', JSON.stringify(res.data.authenticateUserWithPassword))
  }


  return (<>

    <StyledForm method="POST" onSubmit={handleSubmit}>

      <h2> Login </h2>

      <p className="error">{data?.authenticateUserWithPassword?.message}</p>

      <fieldset>
        <label htmlFor="email">
          Email
          <input type="email" id="email" name="email" autoComplete="email"
            placeholder="email..."
            required
            defaultValue={inputs.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          Email
          <input type="password" id="password" name="password" autoComplete="password"
            placeholder="password..."
            required
            defaultValue={inputs.password}
            onChange={handleChange}
          />
        </label>


        <button type="submit"> Login </button>
        <button type="button" onClick={() => setIsReset(!isReset)} className="forgot-password"> Forgot your password? </button>
      </fieldset>

    </StyledForm>
    <br />

    <StyledDrawer isReset={isReset}>
      <PasswordReset />
    </StyledDrawer>
  </>)
}

const StyledDrawer = styled.div<{isReset:boolean}>`
  opacity: 0;
  position: absolute;
  pointer-events: none;
  ${p => p.isReset ? 'opacity: 1; pointer-events: all; position: relative;' : ''}
  transition: all .5s;
`

const MUTATION_USER_LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
          email
          isAdmin
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`