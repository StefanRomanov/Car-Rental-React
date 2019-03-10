import React, {Component} from 'react';

import services from '../../services'
import Input from "../Generic/Input";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
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

        this.setState({}, () => {
            services.authService.login(this.state)
                .then(data => {
                    window.localStorage.setItem('auth_token', data.Authorization);
                })
                .catch(err => {
                    console.log(err);
                })
            }
        );
    }

    render() {
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
                            <Input onChange={this.onChange} name="username" label="Username" type="text"/>
                            <Input onChange={this.onChange} name="password" label="Password" type="password"/>
                            <hr/>
                            <input type="submit" className="btn btn-primary form-control" value="Login"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

export default LoginForm;