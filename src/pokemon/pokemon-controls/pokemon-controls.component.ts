import { NgFor } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { merge, Subscription } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';
import { emitPokemonId } from '../custom-operators/emit-pokemon-id.operator';
import { derivePokemonId } from '../custom-operators/derive-pokemon-id.operator';
import { PokemonButtonDirective } from '../directives/pokemon-button.directive';

@Component({
  selector: 'app-pokemon-controls',
  standalone: true,
  imports: [FormsModule, NgFor, PokemonButtonDirective],
  template: `
    <div class="container">
      <button *ngFor="let delta of [-2, -1, 1, 2]" class="btn" [appPokemonButton]="delta">
        {{ delta < 0 ? delta : '+' + delta }}
      </button>
      <form #f="ngForm" novalidate>
        <input type="number" [(ngModel)]="searchId" [ngModelOptions]="{ updateOn: 'blur' }" 
          name="searchId" id="searchId" />
      </form>
    </div>
  `,
  styles: [`
    :host { 
      display: block;
    }

    .container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      padding: 1rem;
    }

    .btn {
      border-radius: 25%;
      padding: 0.5rem 1rem;
      margin: 0.5rem;
    }

    input[type="number"] {
      padding: 0.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonControlsComponent implements OnDestroy, AfterViewInit {
  @ViewChildren(PokemonButtonDirective)
  btns: QueryList<PokemonButtonDirective>;

  @ViewChild('f', { static: true, read: NgForm })
  myForm!: NgForm;

  searchId = 1;
  pokemonService = inject(PokemonService);
  subscription!: Subscription;

  ngAfterViewInit(): void {
    const btns$ = this.btns.map((btn) => btn.click$); 
    const inputId$ = this.myForm.form.valueChanges.pipe(emitPokemonId());

    this.subscription = merge(...btns$, inputId$)
      .pipe(derivePokemonId())
      .subscribe((pokemonId) => this.pokemonService.updatePokemonId(pokemonId));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
