import React, {Component} from 'react';

import services from '../../services'
import Input from "../Generic/Input";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
            repeatPassword: null
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
        services.authService.login(this.state)
            .then(() => {
                this.props.history.push("/login");
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
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
                            <Input onChange={this.onChange} name="username" label="Username" type="text" value={this.state.username}/>
                            <Input onChange={this.onChange} name="email" label="Email" type="email" value={this.state.email}/>
                            <Input onChange={this.onChange} name="password" label="Password" type="password" value={this.state.password}/>
                            <Input onChange={this.onChange} name="repeatPassword" label="Repeat Password" type="password" value={this.state.repeatPassword}/>
                            <hr/>
                            <input type="submit" className="btn btn-primary form-control" value="Register"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default RegisterForm;