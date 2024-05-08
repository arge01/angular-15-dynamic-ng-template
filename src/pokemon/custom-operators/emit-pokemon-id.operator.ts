import { Observable, debounceTime, distinctUntilChanged, filter, map } from "rxjs"
import { POKEMON_ACTION } from "../enums/pokemon.enum"

export const emitPokemonId = (minPokemonId = 1, maxPokemonId = 100) =>
  (source: Observable<any>) => source.pipe(
    debounceTime(300),
    distinctUntilChanged((prev, curr) => prev.searchId === curr.searchId),
    filter((form) => form.searchId >= minPokemonId && form.searchId <= maxPokemonId),
    map((form) => Math.floor(form.searchId)),
    map((value) => ({
      value,
      action: POKEMON_ACTION.OVERWRITE,
    }))
  );
  