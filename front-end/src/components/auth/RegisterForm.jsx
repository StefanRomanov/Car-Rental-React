import React, {Component} from 'react';
import {withRouter} from "react-router";
import toastr from 'toastr';

import {authService} from '../../services'
import Input from "../common/tools/Input";
import {registerValidation} from '../../util/validation/formValidator'
import {registerHandler} from '../../util/validation/formErrorHandler'

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            repeatPassword: ''
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let {username, email, password, repeatPassword} = this.state;

        if(!registerHandler(username, email, password, repeatPassword)){
            return;
        }

        authService.register(this.state)
            .then(res => {
                if(res.success === false){
                    toastr.error(res.message)
                }
                toastr.success('Successful registration');
                this.props.history.push("/login");
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {

        let {username, email, password, repeatPassword} = this.state;

        const validator = registerValidation(username, email, password, repeatPassword);

        return (
            <div className='container'>
                <div className='row space-top justify-content-center'>
                    <div className='col-md-4 text-center'>
                        <h1>Register</h1>
                    </div>
                </div>
                <hr/>
                <form onSubmit={this.onSubmit}>
                    <div className='row space-top justify-content-center'>
                        <div className='col-md-4'>
                            <Input onChange={this.onChange} name="username" label="Username" type="text"
                                   value={this.state.username} valid={validator.validUsername}/>
                            <Input onChange={this.onChange} name="email" label="Email" type="email"
                                   value={this.state.email} valid={validator.validEmail}/>
                            <Input onChange={this.onChange} name="password" label="Password" type="password"
                                   value={this.state.password} valid={validator.validPassword}/>
                            <Input onChange={this.onChange} name="repeatPassword" label="Repeat Password"
                                   type="password" value={this.state.repeatPassword} valid={validator.validConfirmPassword}/>
                            <hr/>
                            <input type="submit" className="btn btn-primary form-control" value="Register"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(RegisterForm);