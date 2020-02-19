import React, { useContext } from "react";
import styles from "../css/Navigation.module.css";
import firebase from "./auth/firebase";
import { NavLink, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { AuthContext } from "./auth/Auth";
export default function Navigation() {
    const { currentUser } = useContext(AuthContext);
    return (
        <div>
            <header className={styles.header}>
                <NavLink
                    style={{ alignSelf: "center" }}
                    to={{
                        pathname: `/home`
                    }}
                >
                    <img
                        className={styles.logo}
                        src="/pokemon-logo.png"
                        alt=""
                    />
                </NavLink>

                <nav>
                    <ul className={styles.navList}>
                        <li>
                            <a href="/search">Search Pokemon</a>
                        </li>
                        <li>
                            <a href="/favorites">My Pokemons</a>
                        </li>

                        <li>
                            {currentUser != null ? (
                                <React.Fragment>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            firebase
                                                .auth()
                                                .signOut()
                                                .then(function() {
                                                    return <Link to="/home" />;
                                                })
                                                .catch(function(error) {});
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Link to="/login">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                </React.Fragment>
                            )}
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
}
