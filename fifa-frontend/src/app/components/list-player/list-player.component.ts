import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-list-player',
  imports: [NgFor],
  templateUrl: './list-player.component.html',
  styleUrl: './list-player.component.scss'
})
export class ListPlayerComponent {
  lista = [
    {nombre:"Luis", apellido:"caceres"},
    {nombre:"carmen", apellido:"gonzales"},
  ]
}
