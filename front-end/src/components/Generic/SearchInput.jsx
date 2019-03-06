import React, {Component} from 'react';


class SearchInput extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        alert("Searching...")
    }

    render() {
        return (
            <div className="search">
                <label htmlFor="search">Search</label>
                <input type="text" id="search" placeholder="search"/>
                <button onClick={this.onClick}>Search</button>
            </div>
        )
    }

}

export default SearchInput;