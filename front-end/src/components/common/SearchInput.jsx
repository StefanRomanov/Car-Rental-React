import React, {Component} from 'react';


class SearchInput extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        alert("Searching...")
    }

    render() {
        return (
                <form onSubmit={this.onSubmit}>
                    <div className="form-row col-lg-12 justify-content-center">
                        <div className="my-3 col-lg-6">
                            <label className="sr-only" htmlFor="search">Name</label>
                            <input type="text" className="form-control" id="search" placeholder="Search"/>
                        </div>
                        <div className="col-auto my-3">
                            <button type="submit" className="btn btn-primary">Search</button>
                        </div>
                    </div>
                </form>

        )
    }

}

export default SearchInput;