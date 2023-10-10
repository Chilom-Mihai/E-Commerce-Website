import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AlsoLikeItem } from './also-like.model';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'full-stack-eshop-app-also-like',
  templateUrl: './also-like.component.html',
  styleUrls: ['./also-like.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class AlsoLikeComponent {
  @Input() alsoLikeItem!: AlsoLikeItem;
}
