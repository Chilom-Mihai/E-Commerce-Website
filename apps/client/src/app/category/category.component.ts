import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CategoryItem } from './category.model';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'full-stack-eshop-app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class CategoryComponent {
  @Input() categoryItem!: CategoryItem;
}
