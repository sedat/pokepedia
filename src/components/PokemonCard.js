import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PokeSprite from "react-poke-sprites";
import { NavLink } from "react-router-dom";
import { getPokemon } from "../api/client";

const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "10px"
    },

    sprite: {
        width: "70px",
        display: "block",
        marginTop: "15px",
        marginLeft: "auto",
        marginRight: "auto",
        "& img": {
            height: "70px"
        }
    }
});
function PokemonCard({ name }) {
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        getPokemon(`/pokemon/${name}`).then(res => {
            setPokemonData(res.data);
        });
    }, [name]);

    return pokemonData ? (
        <Card className={classes.root}>
            <NavLink
                style={{ width: "100%" }}
                to={{
                    pathname: `/pokemon/${name}`,
                    state: { pokemon: pokemonData }
                }}
            >
                <CardActionArea>
                    <div className={classes.sprite}>
                        <PokeSprite pokemon={name} />
                    </div>

                    <CardContent>
                        <Typography
                            style={{ textAlign: "center" }}
                            gutterBottom
                            variant="h5"
                            component="h2"
                        >
                            {name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </NavLink>
        </Card>
    ) : null;
}

export default PokemonCard;
