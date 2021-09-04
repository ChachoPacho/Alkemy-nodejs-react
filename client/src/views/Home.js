import React from 'react';
import Card from '../components/Card';
import Nav from '../components/Nav';

function Home() {
    return (
        <div className="container pt-2 pb-5">
            <Nav />
            <div className="row justify-content-around">
                <div className="col-md-6">
                    <Card limit="10" />
                </div>
            </div>
        </div>
    )
}

export default Home
