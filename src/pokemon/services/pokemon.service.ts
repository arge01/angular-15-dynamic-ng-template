import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly pokemonIdSub = new Subject<number>();
  readonly pokemonId$ = this.pokemonIdSub.asObservable();

  updatePokemonId(id: number) {
    this.pokemonIdSub.next(id);
  }
}
