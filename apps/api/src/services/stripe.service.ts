import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CartItemDTO } from '../dto/cart-item.dto';


@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe("sk_test_51NM4ygFxFveMsZ2fk7F6GAcEVgrMAzCFhLmM9EpXc0q1mi07V1KuxLmThHfEQtYQ27BlR4fiv0NvlJAmadT0kH1u00UaTjQNVu", {
      apiVersion: "2022-11-15"
    })
  }

  async createSession(cartItemDTO: CartItemDTO): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const YOUR_DOMAIN = 'http://localhost:4200';

    try {
      const session = await this.stripe.checkout.sessions.create({
        line_items: cartItemDTO.items.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.product.name,
              images: [item.product.categoryImage.external]

            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity
        })),
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success-page`,
        cancel_url: `${YOUR_DOMAIN}`,
      });

      cartItemDTO.items.map(item => console.log(item.product.categoryImage.external))

      return session;

    } catch (err) {
      throw Error(err);
    }
  }
}