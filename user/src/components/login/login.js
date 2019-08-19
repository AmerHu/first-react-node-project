import React from "react";
import loginImg from "../../login.svg";

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: []
        }
    }

    showValidationError(elm, msg) {
        this.state((prevState => ({errors: [...prevState, {elm, msg}]})))
    }

    submitLogin(e) {
        //Check for all input fields and show errors if empty (you can implement other cases!)
        if (this.state.email == "") {
            this.showValidationError("email", "Email Cannot be empty!");
        }
        if (this.state.password == "") {
            this.showValidationError("password", "Password Cannot be empty!");
        }
    }

    clearValidationError(elm) {
            this.setState((prevState) => {
                let newArr = [];
                //Add all elements from the prev array to the new one that has a different element
                for (let err of prevState.errors) {
                    if (elm != err.elm) {
                        newArr.push(err);
                    }
                }
                return {errors: newArr};
            });
        }


    onEmailChange(e) {
        this.setState({email: e.target.value});
        this.clearValidationError("email");
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value});
        this.clearValidationError("password");
    }

    render() {
        let passwordErr = null,
            emailErr = null;
        for (let err of this.state.errors) {
            //Assign the validation error message
            if (err.elm == "password") {
                passwordErr = err.msg;
            }
            if (err.elm == "email") {
                emailErr = err.msg;
            }
            //No (else if or else) statements cause we need to check for all possible elements
        }
        return <div className="base-container" ref={this.props.containerRef}>
            <div className="header">Login</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} alt=""/>
                </div>
                <div className="form">
                    <div className="form-group">
                        <input type="email" name="email" placeholder="Email" onChange={this.onEmailChange.bind(this)}/>
                        <small className="danger-error">{emailErr ? emailErr : ""}</small>
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" placeholder="Password"
                               onChange={this.onPasswordChange.bind(this)}/>
                        <small className="danger-error">{passwordErr ? passwordErr : ""}</small>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button className="btn" type="button" onChange={this.submitLogin.bind(this)}>
                    login
                </button>
            </div>
        </div>
    }
}