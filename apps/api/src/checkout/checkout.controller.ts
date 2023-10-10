import { Body, Controller, Post } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeService } from '../services/stripe.service';
import { CartItemDTO } from '../dto/cart-item.dto';


@Controller("checkout-session")
export class CheckoutController {
  private stripe: Stripe

  constructor(private readonly stripeService: StripeService) {

  }

  @Post()
  async createCheckoutSession(@Body() cartItemDTO: CartItemDTO) {
    const session = await this.stripeService.createSession(cartItemDTO);
    return session;
  }
}
