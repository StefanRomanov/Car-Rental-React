import React from 'react';
import Link from "react-router-dom/es/Link";


const Home = () => {
    return (
        <div className="home">
            <div className='container mt-3'>
                <section className='jumbotron text-center shadow'>
                    <div className='container justify-content-between'>
                        <h1 className='jumbotron-heading'>Welcome to Rento !</h1>
                        <h3 className="mb-4">Easy and fast car renting.</h3>
                        <div className=''>
                            <Link to='/cars/all' className='btn btn-primary mr-3 shadow-sm'>Auto park</Link>
                            <Link to='/cars/available' className='btn btn-secondary ml-3 shadow-sm'>Available
                                cars</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )

};

export default Home;