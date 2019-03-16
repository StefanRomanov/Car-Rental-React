import React from 'react'

function withPaging(Component) {
    return class PagingWrapper extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                page: 0,
                totalPages: 0
            };

            this.turnNextPage = this.turnNextPage.bind(this);
            this.turnPreviousPage = this.turnPreviousPage.bind(this);
            this.pageChange = this.pageChange.bind(this);
            this.updatePages = this.updatePages.bind(this);
        }

        turnNextPage() {
            this.setState({
                page: this.state.page + 1
            })
        }

        turnPreviousPage() {
            this.setState({
                page: this.state.page - 1
            })
        }

        pageChange(e) {
            console.log(e.target.value);
            this.setState({
                page: e.target.value
            })
        }

        updatePages(totalPages){
            this.setState({
                totalPages: totalPages,
            })
        }

        render() {
            return <Component {...this.props} paging={this.state} nextPage={this.turnNextPage}
                              prevPage={this.turnPreviousPage} pageChange={this.pageChange} updatePages={this.updatePages}/>
        }
    }
}

export default withPaging;
