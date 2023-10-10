import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout/checkout.controller';
import { ItemsController } from './items/items.controller';
import { StripeService } from './services/stripe.service';


@Module({
    imports: [],
    controllers: [CheckoutController, ItemsController],
    providers: [StripeService],

})
export class AppModule {

}
