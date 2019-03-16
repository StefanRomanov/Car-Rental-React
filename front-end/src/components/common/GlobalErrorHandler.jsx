import React, {Component} from 'react';
import toastr from "toastr";


class GlobalErrorHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            info: null,
        };
    }

    componentDidCatch(error, info) {
        this.setState({
            error: error,
            info: info,
        });
    }

    render() {
        if(this.state.error) {
            toastr.error('Critical error');
            return (
                <div className="container mt-3">
                    <div className="jumbotron text-center shadow">
                        <h1 className="text-danger">Woops something went wrong :(</h1>
                    </div>
                </div>
            )
        } else {
            return this.props.children;
        }
    }
}

export default GlobalErrorHandler;