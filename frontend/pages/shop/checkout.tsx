import styled from "styled-components";
import CartCount from "../../components/ecommerce/CartCount";
import CartItem from "../../components/ecommerce/CartItem";
import { CheckoutForm } from "../../components/ecommerce/CheckoutForm";
import { useUser } from "../../components/menus/Session";
import { calcTotalPrice } from "../../lib/calcTotalPrice";
import moneyFormatter from "../../lib/moneyFormatter";
import { StyledSupreme } from "../../styles/Supreme.styled";
import { CartCount2 } from "../../components/ecommerce/CartCount2";


export default function CheckoutPage() {

  const session = useUser()

  return (
    <div className="container">

    <StyledCheckout>
      <header>
        <h2>
          {session?.name}'s | Cart
        </h2>

        <CartCount2 count={session?.cart.reduce(
          (tally: any, cartItem: any) => tally + cartItem.quantity,
          0
        )} />


      </header>

      {session?.cart.length <= 0 
        ? <p> Cart is empty. </p>
        : (<>
        
          <ul className="items">
            {session?.cart.map((item: any) => <CartItem key={item.id} item={item} />)}
          </ul>

          
          <footer>
            <hr />

            <p className="total"> <strong>Total: </strong> {moneyFormatter(calcTotalPrice(session?.cart))}</p>
            <CheckoutForm />
          </footer>
        </>)}

    </StyledCheckout>
    </div>
  )
}


const StyledCheckout = styled.div`
  backdrop-filter: blur(4px);
  padding: 1rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  max-width: 50em;
  margin-inline: auto;

  .cartCount{
    width: 3em;
    position: absolute;
    top: 1rem;
    right: 0;
  }

  > ul.items {
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: .3rem;

    li {
      background: var(--c-txt-cont);
    }
  }
  
  footer{
    margin-top: auto;
    
    > form {
      margin-left: auto;
    }

    .total{
      text-align: right;
    }
  }
`