import React from 'react';
import Link from "react-router-dom/es/Link";

import {UserConsumer} from "../../context/UserContext";


const Home = (props) => {
    return (
        <div className="home">
            <div className='container mt-3'>
                <section className='jumbotron text-center shadow'>
                    <div className='container justify-content-between'>
                        <h1 className='jumbotron-heading font-weight-bold'>Welcome to RentCar !</h1>
                        <h3 className="mb-4">Fast and easy car renting</h3>
                        <div>
                            <Link to='/cars/all' className='btn btn-primary mr-3 shadow-sm'>Car fleet</Link>
                            {
                                props.user.isLoggedIn ?
                                                props.user.role !== 'ADMIN'
                                                    ? (<Link to='/cars/available' className='btn btn-secondary ml-3 shadow-sm'>Available
                                                        cars</Link>)
                                                    : (<Link to='/rents/pending' className='btn btn-secondary ml-3 shadow-sm'>Pending
                                                        rents</Link>)
                                    : ''
                            }
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
};

const HomeWithUserContext = (props) => {

    return (
        <UserConsumer>
            {
                ({user}) => (
                    <Home {...props} user={user}/>
                )
            }
        </UserConsumer>
    )
};

export default HomeWithUserContext;