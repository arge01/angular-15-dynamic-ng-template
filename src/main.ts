import 'zone.js/dist/zone';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { PokemonComponent } from './pokemon/pokemon/pokemon.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [PokemonComponent],
  template: `
    <app-pokemon></app-pokemon>
  `,
})
export class App {}

bootstrapApplication(App, {
  providers: [provideHttpClient()]
});
