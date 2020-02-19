import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./Home";
import Nav from "./Navigation";
import PokemonSearch from "./PokemonSearch";
import Container from "@material-ui/core/Container";
import PokemonCardDetail from "./PokemonCardDetail";
import FavoritePokemonList from "./FavoritePokemonList";
import { AuthProvider } from "./auth/Auth";
import PrivateRoute from "./auth/PrivateRoute";
class App extends Component {
    render() {
        return (
            <AuthProvider>
                <Router>
                    <Nav />
                    <Switch>
                        <Container fixed>
                            <Route path="/" exact component={Home} />
                            <Route
                                path="/search"
                                exact
                                component={PokemonSearch}
                            />
                            <Route
                                path="/pokemon/:name"
                                exact
                                component={PokemonCardDetail}
                            />
                            <Route path="/login" exact component={Login} />
                            <PrivateRoute
                                path="/favorites"
                                exact
                                component={FavoritePokemonList}
                            />
                            <Route
                                path="/register"
                                exact
                                component={Register}
                            />
                            <Route path="/home" exact component={Home} />
                        </Container>
                    </Switch>
                </Router>
            </AuthProvider>
        );
    }
}

export default App;
