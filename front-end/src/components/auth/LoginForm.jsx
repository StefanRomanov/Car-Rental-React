import React, {Component} from 'react';
import toastr from "toastr";
import {Redirect} from "react-router";

import {authService} from '../../services'
import Input from "../common/tools/Input";
import {loginValidation} from '../../util/validation/formValidator'
import {loginFormHandler} from '../../util/validation/formErrorHandler'
import {UserConsumer} from '../../context/UserContext'



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

                if (data.success === false) {
                    toastr.error('Invalid username or password')

                } else {
                    const {updateUser} = this.props;

                    window.localStorage.setItem('auth_token', data.Authorization);
                    const decoded = authService.decodeToken(data.Authorization);

                    const newUser = {
                        username: decoded.sub,
                        role: decoded.role,
                        isLoggedIn: true
                    };

                    toastr.success('Successful login');
                    updateUser(newUser);
                }


            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        if (this.props.user.isLoggedIn) {
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
                ({user, updateUser}) => (
                    <LoginForm {...props} user={user} updateUser={updateUser}/>
                )
            }
        </UserConsumer>
    )

};

export default LoginWithContext;