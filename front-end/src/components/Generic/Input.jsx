import React, {Component} from 'react';


class Input extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className='form-group'>
                <label className='form-control-label'  htmlFor={this.props.name}>{this.props.label}</label>
                <input
                    className='form-control'
                    onChange={this.props.onChange}
                    type={this.props.type}
                    name={this.props.name}
                    id={this.props.name}
                    step={this.props.step}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    required={this.props.required}
                    onFocus={this.props.onfocus}
                    onBlur={this.props.onblur}
                />
            </div>
        )
    }

}

export default Input;