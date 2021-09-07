import React from "react";
import {signup} from '../api/apiCall'
import Input from '../components/Input'

class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors: {}
    }

    onChange = event => {
        const {name, value} = event.target;
        const errors = {...this.state.errors};
        errors[name] = undefined;

        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = "Password mismatch";
            } else if (name === 'passwordRepeat' && value !== this.state.password) {
                errors.passwordRepeat = 'Password mismatch'
            } else {
                errors.passwordRepeat = undefined
            }
        }

        this.setState({
            [name]: value,
            errors
        })

    }


    onClickSignUp = async event => {
        event.preventDefault()
        const {username, displayName, password} = this.state
        const body = {
            username,
            displayName,
            password
        }


        this.setState({pendingApiCall: true})
        try {
            const response = await signup(body)
        } catch (error) {
            this.setState({errors: error.response.data.validationErrors})
        }
        this.setState({pendingApiCall: false})
    }

    render() {
        const {pendingApiCall} = this.state;
        const {username, displayName, password, passwordRepeat} = this.state.errors;
        return (
            <div className="container">
                <form>

                    <div className="text-center">
                        <h1>SignUp</h1>
                    </div>
                    <br/>

                    <Input name="username" label="Username" error={username} onChange={this.onChange} type="text"/>
                    <Input name="displayName" label="DisplayName" error={displayName} onChange={this.onChange}
                           type="text"/>
                    <Input name="password" label="Password" error={password} onChange={this.onChange} type="password"/>
                    <Input name="passwordRepeat" label="Password Repeat" error={passwordRepeat} onChange={this.onChange}
                           type="password"/>


                    <div className="text-center">
                        <button className="btn btn-success text-center" onClick={this.onClickSignUp}
                                disabled={pendingApiCall || passwordRepeat!==undefined}>
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            Sign Up
                        </button>
                    </div>
                </form>

            </div>

        )
    }


}

export default UserSignupPage