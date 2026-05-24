import { Component } from '@angular/core'
import { MenuComponent } from '../menu/menu.component'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
