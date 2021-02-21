import React, { useState, Suspense } from "react";
import { getPokemon } from "../api/client";
import styles from "../css/Home.module.css";
import PokemonList from "./PokemonList";
import Container from "@material-ui/core/Container";
import InfiniteScroll from "react-infinite-scroller";
import { Button } from "@material-ui/core";
import ScrollToTop from "react-scroll-up";

function Home() {
    const [offset, setOffset] = useState(0);
    const [next, setNext] = useState(true);
    const [pokemons, setPokemons] = useState([]);
    const loader = <div className="loader">Loading ...</div>;
    async function fetchPokemons() {
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=16`;
        const response = await getPokemon.get(url);

        if (response.data.next) {
            let temp = pokemons;
            response.data.results.forEach(pokemon => {
                temp.push(pokemon);
            });
            setPokemons(temp);
            setOffset(offset + 16);
        } else {
            setNext(false);
        }
    }

    return (
        <React.Fragment>
            <section className={styles.landing}>
                <div className={styles.landingLeft}>
                    <h1>Welcome to Pokepedia! </h1>
                    <p>
                        The Greatest Pokemon Encyclopedia Online! With the
                        broadest list of Pokemon and all of their attributes. We
                        even make them come alive inside your browser!!! How
                        great right??
                    </p>
                </div>
                <img src="/pokemon.svg" alt="" style={{maxWidth: 300}} />
            </section>

            <Container style={{ marginTop: "55px" }} maxWidth="lg">
                <ScrollToTop style={{ zIndex: "999" }} showUnder={500}>
                    <Button variant="contained" color="primary">
                        Go Up!
                    </Button>
                </ScrollToTop>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={fetchPokemons}
                    hasMore={next}
                    loader={loader}
                >
                    <Suspense fallback={<div>loading...</div>}>
                        <PokemonList pokemons={pokemons} />{" "}
                    </Suspense>
                </InfiniteScroll>
            </Container>
        </React.Fragment>
    );
}

export default Home;
