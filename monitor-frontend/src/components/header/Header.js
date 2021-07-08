import React from 'react'
import "./Header.css";


function Table() {
    return (
        <header>
            <div
                id='intro-example'
                className='p-5 text-center bg-image'
                style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/041.jpg')" }}
            >
                <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='text-white'>
                            <h1 className='mb-3'>Monitor</h1>
                            <h5 className='mb-4'>cloud-based sensor monitoring and alert management platform</h5>
                            <a
                                className='btn btn-outline-light btn-lg m-2'
                                href='/chart'
                                role='button'
                                rel='nofollow'
                            // target='_blank'
                            >
                                Charts
                            </a>
                            <a
                                className='btn btn-outline-light btn-lg m-2'
                                href='/table'
                                // target='_blank'
                                role='button'
                            >
                                Tables
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}



export default Table