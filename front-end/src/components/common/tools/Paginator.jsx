import React from 'react';

const Paginator = (props) => {
    return (
        <div className="d-flex align-self-center justify-content-center mt-3">
            <button className="page-link rounded font-weight-bold" disabled={props.page < 2 || props.totalPages === 0}
                    onClick={props.prevPage}>&lt;</button>
            <input type="text" className="page-link w-5 rounded font-weight-bold text-center"
                   onChange={props.pageChange} value={props.page} disabled={true}/>
            <button className="page-link rounded w-5 font-weight-bold" id="total-pages"
                    disabled>{props.totalPages === 0 ? 1 : props.totalPages}</button>
            <button className="page-link rounded font-weight-bold" disabled={props.page >= props.totalPages || props.totalPages === 0}
                    onClick={props.nextPage}>&gt;</button>
        </div>
    )
};

export default Paginator;