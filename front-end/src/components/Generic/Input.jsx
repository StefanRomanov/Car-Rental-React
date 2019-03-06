import React, {Component} from 'react';


class Input extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <label  htmlFor={this.props.name}>{this.props.label}</label>
                <input
                    onChange={this.props.onChange}
                    type={this.props.type}
                    name={this.props.name}
                    id={this.props.name}
                    step={this.props.step}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    required={this.props.required}/>
            </div>
        )
    }

}

export default Input;