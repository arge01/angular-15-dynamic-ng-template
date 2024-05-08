import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';
import { fromEvent, map, Observable } from 'rxjs';
import { POKEMON_ACTION } from '../enums/pokemon.enum';

@Directive({
  selector: '[appPokemonButton]',
  standalone: true,
})
export class PokemonButtonDirective implements OnInit {
  @Input() appPokemonButton = 0;

  private nativeElement = inject(ElementRef<HTMLButtonElement>).nativeElement;
  click$!: Observable<{ value: number; action: POKEMON_ACTION }>;

  ngOnInit(): void {
    this.click$ = fromEvent(this.nativeElement, 'click').pipe(
      map(() => ({ value: this.appPokemonButton, action: POKEMON_ACTION.ADD })),
    );
  }
}