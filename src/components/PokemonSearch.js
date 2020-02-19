import React, { useState } from "react";
import { getPokemon } from "../api/client";
import PokemonCard from "./PokemonCardDetail";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import searchOptions from "../helpers/searchOptions";
const useStyles = makeStyles({
    form: {
        display: "flex",
        justifyContent: "space-around",
        margin: "10px"
    },
    basis: {
        width: "45vw"
    }
});
export default function PokemonSearch(props) {
    const classes = useStyles();
    const [inputValue, setInputValue] = useState("");
    const [pokemon, setPokemon] = useState("");
    const searchPokemon = e => {
        e.preventDefault();

        if (inputValue) {
            getPokemon.get(`/pokemon/${inputValue}`).then(res => {
                setPokemon(res.data);
            });
        }
    };
    return (
        <div>
            <form onSubmit={e => searchPokemon(e)} className={classes.form}>
                <Select
                    options={searchOptions}
                    onChange={e => {
                        setInputValue(e.value);
                        setPokemon("");
                    }}
                    className={classes.basis}
                />
                <Button type="submit" variant="contained" color="primary">
                    Search
                </Button>
            </form>
            {pokemon ? <PokemonCard pokemon={pokemon} /> : null}
        </div>
    );
}
