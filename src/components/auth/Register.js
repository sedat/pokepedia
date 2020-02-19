import React, { useState } from "react";
import firebase from "./firebase";
import { Link, useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const Register = () => {
    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailErrorHelper, setEmailErrorHelper] = useState("");
    const [passErrorHelper, setPassErrorHelper] = useState("");
    let history = useHistory();

    const handleSubmit = async e => {
        if (email !== "" && password.length >= 6) {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .catch(err => {
                    setEmailError(true);
                    setEmailErrorHelper(err.message);
                })
                .then(user => history.push("/home"));
        } else {
            if (email === "") {
                setEmailError(true);
                setEmailErrorHelper("Email cannot be empty!");
            }
            if (password.length < 6) {
                setPasswordError(true);
                setPassErrorHelper(
                    "Password cannot be lower than 6 characters!"
                );
            }
        }
    };

    return (
        <div>
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
                            error={emailError}
                            helperText={emailErrorHelper}
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
                            error={passwordError}
                            helperText={passErrorHelper}
                        />
                        <br />
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                        <Link style={{ marginLeft: "50px" }} to="/login">
                            <Button variant="contained" color="secondary">
                                Login
                            </Button>
                        </Link>
                    </CardActions>
                </form>
            </Card>
        </div>
    );
};

export default Register;
