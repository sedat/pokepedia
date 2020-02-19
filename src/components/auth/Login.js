import React, { useState } from "react";
import firebase from "./firebase";
import { Link, useHistory } from "react-router-dom";
import { withRouter } from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const Login = () => {
    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);
    const [loginErrorHelper, setLoginErrorHelper] = useState("");
    let history = useHistory();

    const handleSubmit = async e => {
        if (email !== "" && password !== "") {
            const user = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(err => err);
            if (user.user) {
                history.push("/home");
            } else {
                setLoginError(true);
                setLoginErrorHelper(user.message);
            }
        } else {
            if (email === "") {
                setLoginError(true);
                setLoginErrorHelper("Email cannot be empty!");
            }
            if (password.length < 6) {
                setLoginError(true);
                setLoginErrorHelper("Password cannot be empty!");
            }
        }
    };

    return (
        <Card style={{ width: "250px", margin: "10% auto" }}>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        value={email}
                        onChange={e => setMail(e.target.value)}
                        error={loginError}
                    />

                    <br />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        variant="outlined"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={loginError}
                        helperText={loginErrorHelper}
                    />
                    <br />
                </CardContent>
                <CardActions style={{ width: "100%" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                    <Link style={{ marginLeft: "50px" }} to="/register">
                        <Button variant="contained" color="secondary">
                            Register
                        </Button>
                    </Link>
                </CardActions>
            </form>
        </Card>
    );
};

export default withRouter(Login);
