// cred - https://github.com/carlos815/3rd-shop-backend/blob/main/mutations/addToCart.ts

import { graphql } from '@keystone-6/core';
import { Context } from '.keystone/types';
// import { relationship } from '@keystone-6/core/fields';
import stripeConfig from '../lib/stripe';
import { BaseSchemaMeta } from '@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema';
import { Ticket } from '../types';
import { mailCheckoutReceipt } from '../lib/mail';

const IMG_PLACEHOLD = process.env.FRONTEND_URL + '/assets/product-placeholder.png'
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS || 'no_admin_email@m.lan'

export const checkoutTicket = (base: BaseSchemaMeta) => graphql.field({
  type: base.object('Ticket'),

  args: { 
    token: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    eventId: graphql.arg({ type: graphql.nonNull(graphql.String) }),
    quantity: graphql.arg({ type: graphql.nonNull(graphql.Int) }),
  },

  // 1. Make sure they are signed in
  async resolve(source, { token, eventId, quantity }, context: Context) {
    //check if the user is logged in. If not, return an error
    const session = context.session;
    console.log('+++++ checkout Ticket session ++++ ');
    // console.log(session);

    if (!session.itemId) {
      throw new Error('You must be logged in to create ticket. :/ ');
    }

    //Query the current user
    const user = await context.query.User.findOne({
      where: { id: session.itemId },
      query:
        `
          id
          name
          email
        `,
    })
    // console.log('===== FOUND USER')
    // console.log({ user })
    // if(!resolvedData.event?.connect) throw new Error("NO EVENT Connect ID FOUND");
        
      const event = await context.query.Event.findOne({
        where: { id: eventId}
      })
      if(!event) throw new Error("No Event Found");
      console.log({event});

    
    // 2. calc the total price for their order
    // const totalOrder = user.cart.reduce((accumulator: number, cartItem: CartItem) => {
    //   const amountCartItem = cartItem.quantity * cartItem.product.price
    //   return accumulator + amountCartItem
    // }, 0)
    const totalOrder = quantity * event.price

    // 3. create the charge with the stripe library

    const charge = await stripeConfig.paymentIntents.create({
      amount: totalOrder,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    }).catch((err: any) => {
      console.log(err);
      throw new Error(err.message);
    });
    // console.log(charge)
    // console.log('CHARGE MADE')


    //Create an order based on the cart item
    const ticketItems = Array.from({ length: quantity }, (_, index) => ({
      event: { connect: { id: eventId }},
      holder: { connect: { id: user.id }},
      cost: event.price,
    }));

    console.log({ ticketItems });



    const now = new Date
    const order = await context.db.Order.createOne({
      data: {
        total: charge.amount,
        ticketItems: { create: ticketItems },
        user: { connect: { id: user.id } },
        charge: charge.id,

        createdAt: now.toISOString(),
      },
    })

    //Clean up! Delete all cart items
    // await context.db.CartItem.deleteMany({
    //   where: user.cart.map((cartItem: CartItem) => { return { id: cartItem.id } })
    // })

    // mailCheckoutReceipt(
    //   order.id, 
    //   [user.email, ADMIN_EMAIL_ADDRESS],
    //   user.name,
    //   ADMIN_EMAIL_ADDRESS,
    //   ticketItems,
    //   now.toISOString(),
    //   totalOrder,
    // )

    return order
  }
})


function handleMail(){

}