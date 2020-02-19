import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import firebase from "./auth/firebase";
import Container from "@material-ui/core/Container";
import PokemonList from "./PokemonList";
function FavoritePokemonList({ user }) {
    const [pokemons, setPokemons] = useState(null);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        if (user.email) {
            firebase
                .firestore()
                .collection("pokepedia")
                .where("email", "==", user ? user.email : "")
                .limit(1)
                .get()
                .then(snapshot => {
                    if (snapshot.docs.length > 0) {
                        setFetching(true);
                        const doc = snapshot.docs[0];
                        if (doc.data().pokemons.length > 0) {
                            setPokemons(doc.data().pokemons);
                        }
                    } else {
                        return;
                    }
                });
        }
    }, [setFetching, user]);

    if (!user) return <Redirect to="/login" />;
    else {
        return pokemons ? (
            <Container style={{ marginTop: "55px" }} maxWidth="lg">
                <PokemonList pokemons={pokemons} />
            </Container>
        ) : (
            <p>
                {fetching
                    ? "Fetching.."
                    : "Hey, poke-master. You don't have any favorite pokemon. Go add them to your list!"}
            </p>
        );
    }
}

export default FavoritePokemonList;
