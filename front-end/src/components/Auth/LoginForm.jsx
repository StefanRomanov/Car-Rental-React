import React, {Component} from 'react';

import fetcher from '../../data/fetcher'
import config from '../../config/server-config'
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

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    async onSubmit(e) {
        e.preventDefault();

        this.setState({
            },async () =>{
                try {
                    const result = await fetcher.post(config.SERVER_PATH + "/login", this.state);
                    window.localStorage.setItem('auth_token',result.Authorization);
                    console.log(window.localStorage.getItem('auth_token').split('Bearer ')[1].split('.')[2])
                } catch (e){
                    console.log(e.stack);
                }
            }
        );
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <Input onChange={this.onChange} name="username" label="Username" type="text"/>
                <Input onChange={this.onChange} name="password" label="Password" type="password"/>
                <button type="submit">Login</button>
            </form>
        )
    }

}

export default LoginForm;