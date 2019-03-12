import React, {Component} from 'react';
import toastr from "toastr";

import {authService} from '../../services'
import Input from "../common/Input";
import {loginValidation} from '../../config/formValidator'
import {loginFormHandler} from '../../config/formErrorHandler'
import {UserConsumer} from '../contexts/UserContext'
import {Redirect} from "react-router";


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        let {username, password} = this.state;

        if (!loginFormHandler(username, password)) {
            return;
        }

        authService.login(this.state)
            .then(data => {

                const {updateUser} = this.props;

                window.localStorage.setItem('auth_token', data.Authorization);
                const decoded = authService.decodeToken(data.Authorization);

                console.log(decoded);

                const newUser = {
                    username: decoded.sub,
                    role: decoded.role,
                    isLoggedIn: true
                };

                updateUser(newUser);

            })
            .catch(err => {
                toastr.error(err.message);
            });
    }

    render() {
        if(this.props.user.isLoggedIn){
            return <Redirect to="/"/>
        }

        let {username, password} = this.state;

        let validation = loginValidation(username, password);

        return (
            <div className='container'>
                <div className='row space-top justify-content-center'>
                    <div className='col-md-4 text-center'>
                        <h1>Login</h1>
                    </div>
                </div>
                <hr/>
                <form onSubmit={this.onSubmit}>
                    <div className='row space-top justify-content-center'>
                        <div className='col-md-4'>
                            <Input onChange={this.onChange} name="username" label="Username" type="text"
                                   value={username} valid={validation.validUsername}/>
                            <Input onChange={this.onChange} name="password" label="Password" type="password"
                                   value={password} valid={validation.validPassword}/>
                            <hr/>
                            <input type="submit" className="btn btn-primary form-control" value="Login"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

const LoginWithContext = (props) => {

    return (
        <UserConsumer>
            {
                ({user, updateUser}) =>(
                    <LoginForm {...props} user={user} updateUser={updateUser}/>
                )
            }
        </UserConsumer>
    )

};

export default LoginWithContext;