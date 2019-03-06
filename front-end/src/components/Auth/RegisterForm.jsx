import React, {Component} from 'react';

import fetcher from '../../data/fetcher'
import config from '../../config/server-config'
import Input from "../Generic/Input";

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        return fetcher.post(config.SERVER_PATH + "/users/register", this.state);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <Input onChange={this.onChange} name="username" label="Username" type="text"/>
                <Input onChange={this.onChange} name="email" label="Email" type="email"/>
                <Input onChange={this.onChange} name="password" label="Password" type="password"/>
                <button type="submit">Register</button>
            </form>
        )
    }
}

export default RegisterForm;