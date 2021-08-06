import React, { Component } from "react";
import {TextField, Button} from "@material-ui/core";

export default class Contact extends Component {
    state = {
        name: "",
        message: "",
        email: "",
        sent: false,
        buttonText: "Send Message",
        emailError: false,
    };

    resetForm = () => {
        this.setState({
            name: "",
            message: "",
            email: "",
            subject: "",
            buttonText: "Message Sent",
        });

        setTimeout(() => {
            this.setState({ sent: false });
        }, 3000);
    };

    handleChangeEmail(e) {
        if (
            !e.target.value.match(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
            this.setState({
                email: e.target.value,
            });
            this.setState({ emailError: true });

            if (this.state.email === "") {
                // check if the input is empty
                this.setState({ emailError: false });
            }
        } else {
            this.setState({ email: e.target.value, emailError: false });
        }
    }

    formSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            buttonText: "...sending",
        });

        let data = {
            name: this.state.name,
            emailAddress: this.state.email,
            Message: this.state.message
        };

        console.log(JSON.stringify(data))

        return fetch('https://1a8l4l5kve.execute-api.us-west-2.amazonaws.com/production/submit',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        ).then(this.resetForm())

    };
    render() {
        return (
            <form className="contact-form" onSubmit={(e) => this.formSubmit(e)}>
                <div>
                    <TextField
                        id="outlined-basic"
                        placeholder="Enter your name"
                        label="Name"
                        variant="outlined"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                        required
                        type="text"
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        placeholder="Enter email address"
                        variant="outlined"
                        value={this.state.email}
                        onChange={(e) => this.handleChangeEmail(e)}
                        error={this.state.emailError}
                        required
                        type="email"
                    />
                </div>
                <div>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Message"
                        placeholder="Enter Message"
                        variant="outlined"
                        multiline
                        rowsMax={4}
                        value={this.state.message}
                        onChange={(e) => this.setState({ message: e.target.value })}
                        required
                        type="text"
                    />
                </div>
                <div className="button--container">
                    <Button type="submit" variant="contained">
                        {this.state.buttonText}
                    </Button>
                </div>
            </form>
        );
    }
}