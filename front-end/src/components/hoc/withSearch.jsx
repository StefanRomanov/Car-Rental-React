import React from 'react'

function withSearch(Component) {
    return class PagingWrapper extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                searchString: '',
            };

            this.onChange = this.onChange.bind(this)
        }

        onChange(e){
            this.setState({
                searchString: e.target.value
            })
        }

        render() {
            return <Component {...this.props} searchString={this.state.searchString} onSearchChange={this.onChange}/>
        }
    }
}

export default withSearch;
