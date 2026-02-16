import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  readonly label = input.required<string>();
  readonly icon = input.required<string>();
  readonly route = input.required<string>();
}
