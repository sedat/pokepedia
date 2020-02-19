import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PokeSprite from "react-poke-sprites";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import firebase from "./auth/firebase";
import { AuthContext } from "./auth/Auth";
import { getPokemon } from "../api/client";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexFlow: "row wrap"
    },
    sprite: {
        display: "flex",
        justifyContent: "center",
        "& img": {
            height: "100px"
        }
    },
    moreInfo: {
        display: "flex",
        flexFlow: "row wrap"
    },
    table: { flexBasis: "0 0 50%" }
});

export default function PokemonCard(props) {
    const { currentUser } = useContext(AuthContext);
    const history = useHistory();
    const classes = useStyles();
    const [pokemon, setPokemon] = useState(props.pokemon);
    const [clicked, setClicked] = useState(false);
    const [desc, setDesc] = useState("");

    const [favState, setFavState] = useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    useEffect(() => {
        if (pokemon == null) {
            getPokemon
                .get(`/pokemon/${props.match.params.name}`)
                .then(res => setPokemon(res.data));
        }
    }, [pokemon]);

    useEffect(() => {
        if (pokemon) {
            const returnDesc = () => {
                return axios.get(pokemon.species.url).then(res => {
                    const desc = res.data.flavor_text_entries.find(
                        data => data.language.name === "en"
                    );

                    setDesc(desc.flavor_text);
                });
            };
            returnDesc();
        }
        if (currentUser && Object.keys(currentUser).length !== 0 && pokemon) {
            firebase
                .firestore()
                .collection("pokepedia")
                .where("email", "==", currentUser.email)
                .limit(1)
                .get()
                .then(snapshot => {
                    const doc = snapshot.docs[0];
                    if (doc) {
                        doc.data().pokemons.forEach(poke => {
                            if (poke === pokemon.name) {
                                setFavState(true);
                                return;
                            }
                        });
                    }
                });
        }
    }, [pokemon, currentUser]);

    const handleChangePage = (_event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <React.Fragment>
            {pokemon ? (
                <div>
                    <Card>
                        <CardContent className={classes.pokeContent}>
                            <div className={classes.sprite}>
                                <PokeSprite pokemon={pokemon.name} />
                            </div>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                {pokemon.name}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {desc}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={favState}
                                onClick={() => {
                                    if (!(currentUser && currentUser.email)) {
                                        history.push("/login");
                                    } else {
                                        if (!clicked) {
                                            setClicked(true);
                                            firebase
                                                .firestore()
                                                .collection("pokepedia")
                                                .where(
                                                    "email",
                                                    "==",
                                                    currentUser.email
                                                )
                                                .limit(1)
                                                .get()
                                                .then(snapshot => {
                                                    if (
                                                        snapshot.docs.length > 0
                                                    ) {
                                                        const doc =
                                                            snapshot.docs[0];
                                                        const docRef = doc.ref;
                                                        let data = {
                                                            email:
                                                                currentUser.email,
                                                            pokemons: [
                                                                ...doc.data()
                                                                    .pokemons,
                                                                pokemon.name
                                                            ]
                                                        };
                                                        docRef
                                                            .update(data)
                                                            .then(res => {
                                                                setFavState(
                                                                    true
                                                                );
                                                            });
                                                    } else {
                                                        firebase
                                                            .firestore()
                                                            .collection(
                                                                "pokepedia"
                                                            )
                                                            .add({
                                                                email:
                                                                    currentUser.email,
                                                                pokemons: [
                                                                    pokemon.name
                                                                ]
                                                            })
                                                            .then(ref => {
                                                                console.log(
                                                                    "Added document with ID: ",
                                                                    ref.id
                                                                );
                                                            });
                                                    }
                                                });
                                        }
                                    }
                                }}
                            >
                                {favState ? "Favorited" : "Favorite"}
                            </Button>
                            {favState ? (
                                <Button
                                    style={{ marginLeft: "5px" }}
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        firebase
                                            .firestore()
                                            .collection("pokepedia")
                                            .where(
                                                "email",
                                                "==",
                                                currentUser.email
                                            )
                                            .limit(1)
                                            .get()
                                            .then(snapshot => {
                                                if (snapshot.docs) {
                                                    const doc =
                                                        snapshot.docs[0];
                                                    const docRef = doc.ref;
                                                    const newPokemons = doc
                                                        .data()
                                                        .pokemons.filter(
                                                            p =>
                                                                p !==
                                                                pokemon.name
                                                        );
                                                    let data = {
                                                        email:
                                                            currentUser.email,
                                                        pokemons: newPokemons
                                                    };
                                                    docRef
                                                        .update(data)
                                                        .then(res => {
                                                            setFavState(false);
                                                        });
                                                }
                                            });
                                    }}
                                >
                                    Unfavorite
                                </Button>
                            ) : null}
                        </CardActions>
                    </Card>
                    <div className={classes.moreInfo}>
                        <TableContainer
                            className={classes.table}
                            component={Paper}
                        >
                            <Table size="small" aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <b>Stat</b>
                                        </TableCell>
                                        <TableCell>
                                            <b>Value</b>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pokemon.stats.map(row => (
                                        <TableRow key={row.name}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.stat.name}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {row.base_stat}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableContainer
                            className={classes.table}
                            component={Paper}
                        >
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <b>Moves</b>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pokemon.moves
                                        .slice(
                                            rowsPerPage * page,
                                            rowsPerPage * (page + 1)
                                        )
                                        .map((row, ind) => (
                                            <TableRow key={row.move.name}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {row.move.name}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                labelRowsPerPage=""
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={pokemon.moves.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        </TableContainer>
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    );
}
