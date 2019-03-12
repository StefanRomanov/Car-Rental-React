import React from 'react';


const Input = (props) => {
    let className = 'form-control';
    if (props.value !== '') {
        if (props.valid) {
            className = 'form-control is-valid'
        } else {
            className = 'form-control is-invalid'
        }
    }

    return (
        <div className='form-group'>
            <label className='form-control-label' htmlFor={props.name}>{props.label}</label>
            <input
                className={className}
                onChange={props.onChange}
                type={props.type}
                name={props.name}
                id={props.name}
                step={props.step}
                disabled={props.disabled}
                placeholder={props.placeholder}
                value={props.value}
                required={props.required}
                onFocus={props.onfocus}
                onBlur={props.onblur}
            />
        </div>
    )
};

export default Input;