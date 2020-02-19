import React from "react";
import PokemonCard from "./PokemonCard";
import Grid from "@material-ui/core/Grid";
export default function PokemonList({ pokemons }) {
    return (
        <Grid container spacing={3}>
            {pokemons.map(pokemon => {
                if (
                    pokemon.name === "nidoran-f" ||
                    pokemon.name === "nidoran-m" ||
                    pokemon.name === "farfetchd" ||
                    pokemon.name === "mr-mime"
                )
                    return null;
                return (
                    <Grid item xs={12} sm={6} md={3}>
                        <PokemonCard name={pokemon.name || pokemon} />
                    </Grid>
                );
            })}
        </Grid>
    );
}
