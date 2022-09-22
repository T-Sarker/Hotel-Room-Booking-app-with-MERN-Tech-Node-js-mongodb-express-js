import React from 'react'
import { NavLink } from 'react-router-dom'
import useFetch from '../../hooks/typeFetchAPI'

const HomePropertyByPrice = () => {
    const { dataVal, loading, error } = useFetch('/hotel/all?featured=true&hmin=10&hmax=200&limit=8')

    return (
        <div>
            <div className="cityWiseCount my-5 container">
                <h4 className='text-bold mt-5 mb-3 text-capitalize'>Browse by Price Choice</h4>
                <div className="row">

                    {loading ? 'loading' : <>
                        {dataVal.map((item) => {
                            return (<div className="col-sm-12 col-md-3 my-3 shadow-sm" key={item._id}>
                                <div className="cityItem position-relative">
                                    <img className='rounded  w-100' alt='fff' src="https://wallup.net/wp-content/uploads/2017/11/22/366189-city-street-Manhattan-New_York_City-748x509.jpg" />
                                    <NavLink to={`/hotel/show/${item._id}`}> <h5 className='my-2'>{item.name}</h5></NavLink>
                                    <div className="d-flex justify-content-between">
                                        <p>{item.city}</p>
                                        <p className='mx-4 text-bold'>Starting From {item.cheapestPrice}$</p>
                                    </div>
                                    {item.rating ? (<p><span className="badge bg-dark">5/5</span> Excellent</p>) : ''}
                                </div>
                            </div>)
                        })}
                    </>}

                </div>
            </div>
        </div>
    )
}

export default HomePropertyByPrice