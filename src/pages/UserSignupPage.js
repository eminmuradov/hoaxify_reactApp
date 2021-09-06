import React from "react";
import {signup} from '../api/apiCall'

class UserSignupPage extends React.Component {

    state = {
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null,
        pendingApiCall: false,
        errors:{}
    }

    onChange = event => {
        const {name,value}=event.target;
        const errors={...this.state.errors};
        errors[name]=undefined;

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
        try{
            const response=await  signup(body)
        }catch (error){
            console.log(error.response.data)
          this.setState({errors:error.response.data.validationErrors})

        }
        this.setState({pendingApiCall: false})


        // signUp(body).then((response => {
        //     this.setState({pendingApiCall: false})
        // })).catch(error => {
        //     this.setState({pendingApiCall: false})
        // })

    }

    render() {
        const {pendingApiCall}=this.state;
        const {username,displayName,password}=this.state.errors;
        return (
            <div className="container">
                <form>

                    <div className="text-center">
                        <h1>SignUp</h1>
                    </div>`
                    <br/>

                    <div className="form-group">
                        <label>Username</label>
                        <input className={username ? 'form-control is-invalid' : 'form-control'} type="text" name="username" onChange={this.onChange}/>
                        <div className="invalid-feedback">{username}</div>
                    </div>
                    <br/>

                    <div className="form-group">
                        <label>DisplayName</label>
                        <input className={displayName ? 'form-control is-invalid' : 'form-control'} type="text" name="displayName" onChange={this.onChange}/>
                        <div className="invalid-feedback">{displayName}</div>

                    </div>
                    <br/>

                    <div className="form-group">
                        <label>Password</label>
                        <input className={password ? 'form-control is-invalid' : 'form-control'}  type="password" name="password" onChange={this.onChange}/>
                        <div className="invalid-feedback">{password}</div>

                    </div>
                    <br/>

                    <div className="form-group">
                        <label>PasswordRepeat</label>
                        <input className="form-control" type="password" name="passwordRepeat" onChange={this.onChange}/>
                    </div>
                    <br/>

                    <div className="text-center">
                        <button className="btn btn-success text-center" onClick={this.onClickSignUp}
                                disabled={pendingApiCall}>
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