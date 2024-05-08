import { Observable, scan, startWith, shareReplay } from "rxjs";
import { POKEMON_ACTION } from "../enums/pokemon.enum";

export const derivePokemonId = (minPokemonId = 1, maxPokemonId = 100) => 
  (source: Observable<{ value: number, action: POKEMON_ACTION }>) => 
    source.pipe(
      scan((acc, { value, action }) => { 
        if (action === POKEMON_ACTION.OVERWRITE) {
          return value;
        } else if (action === POKEMON_ACTION.ADD) {
          const potentialValue = acc + value;
          if (potentialValue >= minPokemonId && potentialValue <= maxPokemonId) {
            return potentialValue;
          } else if (potentialValue < minPokemonId) {
            return minPokemonId;
          }

          return maxPokemonId;
        }

        return acc;
      }, minPokemonId),
      startWith(minPokemonId),
      shareReplay(1),
  );
