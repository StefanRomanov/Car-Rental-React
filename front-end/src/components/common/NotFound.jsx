import React, {Component} from 'react';


class NotFound extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="container mt-3">
                <div className="jumbotron text-center shadow">
                    <h1 className="">404 Page Not Found</h1>
                </div>
            </div>

        )
    }

}

export default NotFound;