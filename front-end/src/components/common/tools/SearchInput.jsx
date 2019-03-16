import React from 'react';

const SearchInput = (props) => {

        return (
                <form onSubmit={props.onSearchSubmit}>
                    <div className="form-row col-lg-12 justify-content-center">
                        <div className="my-3 col-lg-6">
                            <label className="sr-only" htmlFor="search">Name</label>
                            <input type="text" className="form-control" id="search" onChange={props.onChange}/>
                        </div>
                        <div className="col-auto my-3">
                            <button type="submit" className="btn btn-primary" hidden={props.hidden}>Search</button>
                        </div>
                    </div>
                </form>
        )
};

export default SearchInput;