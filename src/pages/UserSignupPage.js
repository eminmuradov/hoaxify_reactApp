import React from "react";
import {signup} from '../api/apiCall'
import Input from '../components/Input'
import {withTranslation} from 'react-i18next'

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
        const {t} = this.props
        errors[name] = undefined;

        if (name === 'password' || name === 'passwordRepeat') {
            if (name === 'password' && value !== this.state.passwordRepeat) {
                errors.passwordRepeat = t('Password mismatch');
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
            console.log(response)
        } catch (error) {
            this.setState({errors: error.response.data.validationErrors})
        }
        this.setState({pendingApiCall: false})
    }


    render() {
        const {pendingApiCall} = this.state;
        const {username, displayName, password, passwordRepeat} = this.state.errors;
        const {t} = this.props

        return (

            <div className="container">
                <form>
                    <div className="text-center">
                        <h1>{t('Sign Up')}</h1>
                    </div>
                    <br/>

                    <Input name="username" label={t("Username")} error={username} onChange={this.onChange} type="text"/>
                    <Input name="displayName" label={t("DisplayName")} error={displayName} onChange={this.onChange}
                           type="text"/>
                    <Input name="password" label={t("Password")} error={password} onChange={this.onChange}
                           type="password"/>
                    <Input name="passwordRepeat" label={t("Password Repeat")} error={passwordRepeat}
                           onChange={this.onChange}
                           type="password"/>


                    <div className="text-center">
                        <button className="btn btn-success text-center" onClick={this.onClickSignUp}
                                disabled={pendingApiCall || passwordRepeat !== undefined}>
                            {pendingApiCall && <span className="spinner-border spinner-border-sm"></span>}
                            {t('Sign Up')}
                        </button>
                    </div>
                </form>

            </div>

        )
    }


}

const UserSignupPageWithTranslation = withTranslation()(UserSignupPage)
// HIGHOR ORDER COMPONENT
export default UserSignupPageWithTranslation;