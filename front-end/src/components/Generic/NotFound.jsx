import React, {Component} from 'react';


class NotFound extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="error">
                <h1>404 Not Found :(</h1>
            </div>
        )
    }

}

export default NotFound;