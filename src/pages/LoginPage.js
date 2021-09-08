import React, {Component} from "react";
import Input from '../components/Input'
import {withTranslation} from "react-i18next";
import {login} from '../api/apiCall'

class LoginPage extends Component {

    state = {
        username: null,
        password: null
    }

    onChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    onClickLogin = event => {
        event.preventDefault();
        const {username, password} = this.state
        const creds = {
            username: username,
            password: password
         }
        login(creds);
    }


    render() {
        const {t} = this.props
        return (
            <div className="container">
                <h1 style={{textAlign: "center"}}>{t('Login')}</h1>
                <Input name="username" label={t('Username')} onChange={this.onChange} type="text"/>
                <Input name="password" label={t('Password')} onChange={this.onChange} type="password"/>
                <div className="text-center">
                    <button className="btn btn-success" onClick={this.onClickLogin}>{t('Login')}</button>
                </div>

            </div>

        )
    }
}

export default withTranslation()(LoginPage);