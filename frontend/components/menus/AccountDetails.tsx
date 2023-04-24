import { useState } from "react"
import { MdAutorenew, MdOutlineAccountBox, MdOutlineDownload, MdShop } from "react-icons/md"
import styled from "styled-components"


enum DASH_STATE {
  DASHBOARD = 'dashboard',
  ORDERS = 'orders',
  SUBSCRIPTIONS = 'subscriptions',
  DOWNLOADS = 'downloads',
}


export function AccountDetails({ session }: any) {

  const [state, setState] = useState<string>(DASH_STATE.DASHBOARD)


  return (
    <StyledAccountCard>
      <StyledAccountNav>
        <ul>
          <li>
            <button onClick={() => setState(DASH_STATE.DASHBOARD)} className={state === DASH_STATE.DASHBOARD ? 'active' : ''}>
              Dashboard <MdOutlineAccountBox />
            </button>
          </li>
          <li>
            <button onClick={() => setState(DASH_STATE.ORDERS)} className={state === DASH_STATE.ORDERS ? 'active' : ''}>
              Orders <MdShop />
            </button>
          </li>
          <li>
            <button onClick={() => setState(DASH_STATE.SUBSCRIPTIONS)} className={state === DASH_STATE.SUBSCRIPTIONS ? 'active' : ''}>
              Subscriptions <MdAutorenew />
            </button>
          </li>
          <li>
            <button onClick={() => setState(DASH_STATE.DOWNLOADS)} className={state === DASH_STATE.DOWNLOADS ? 'active' : ''}>
              Downloads <MdOutlineDownload />
            </button>
          </li>
        </ul>
      </StyledAccountNav>

      <div className="dash-cont">

        <article className={state === DASH_STATE.DASHBOARD ? 'active' : ''}>
          <h3>Dashboard</h3>
          <a> dashboard 1 </a> <br />
          <a> dashboard 1 </a> <br />
          <a> dashboard 1 </a> <br />
          <a> dashboard 1 </a> <br />
          <a> dashboard 1 </a> <br />
          <a> dashboard 1 </a> <br />
          <a> dashboard 1 </a> <br />
          <a> dashboard 1 </a> <br />
        </article>

        <article className={state === DASH_STATE.ORDERS ? 'active' : ''}>
          <h3>Orders</h3>
          <a> order 1 </a> <br />
          <a> order 1 </a> <br />
          <a> order 1 </a> <br />
          <a> order 1 </a> <br />
          <a> order 1 </a> <br />
          <a> order 1 </a> <br />

        </article>

        <article className={state === DASH_STATE.SUBSCRIPTIONS ? 'active' : ''}>
          <h3>Subscriptions</h3>
          <a> d 1 </a> <br />
          <a> order 1 </a> <br />
          <a> d 1 </a> <br />
          <a> order 1 </a> <br />
          <a> d 1 </a> <br />
          <a> order 1 </a> <br />

        </article>

        <article className={state === DASH_STATE.DOWNLOADS ? 'active' : ''}>
          <h3>Downloads</h3>
          <a> d 1 </a> <br />
          <a> order 1 </a> <br />
          <a> d 1 </a> <br />
          <a> orsdfdfdfder 1 </a> <br />
          <a> d 1 </a> <br />
          <a> orddfdfdfdfdfder 1 </a> <br />

        </article>

      </div>
    </StyledAccountCard>
  )
}

const StyledAccountCard = styled.div`
  display: flex;
  

  .dash-cont{
    flex-grow: 1;
    /* padding: 0 1em; */
    display: grid;

    h2{
      margin-top: 0;
    }

    article{
      opacity: .3;
      transition: all .3s;
      background-color: var(--c-txt-rev);
      padding: 0 1em;

      grid-column: 1;
      grid-row: 1;

      h3{
        transform: translateX(20px);
        transition: all .3s;
        text-decoration: underline;
      }
      
    }

    article.active{
      opacity: 1;
      /* pointer-events: all; */
      z-index: 1;

      h3{
        transform: translateX(0px);
      }
    }
  }
`


const StyledAccountNav = styled.nav`
  background-color: #cbcbe2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  li{
    display: flex;
  }
  
  
  button{
    flex-grow: 1;
    width: 100%;
    text-align: left;
    height: auto;
    align-self: stretch;
    padding: 2em 1em;
    text-transform: uppercase;
    font-size: 1.2rem;
    transition: all .3s;

    &.active{
      background-color: var(--c-3);
      color: var(--c-txt-rev);
    }

    svg {
      font-size: 1.6rem;
      float: right;
      margin-left: 1em;
    }
  }
`