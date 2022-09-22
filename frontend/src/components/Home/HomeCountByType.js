import React from 'react'
import useFetch from '../../hooks/typeFetchAPI'

const HomeCountByType = () => {
    const { dataVal, loading, error } = useFetch('/hotel/countbytype')

    return (
        <div>
            <div className="cityWiseCount my-5 container">
                <h4 className='text-bold mt-5 mb-3 text-capitalize'>Browse by property types</h4>

                <div className="row">
                    {

                        loading ? 'loading' : (
                            dataVal.map((data) => {
                                return (<>
                                    <div className="col-xs-12 col-sm-6 col-md-2 shadow-sm my-4" key={data.type}>
                                        <div className="cityItem position-relative" key={data.type}>
                                            <img className='rounded  w-100' alt='gg' src="https://wallup.net/wp-content/uploads/2017/11/22/366189-city-street-Manhattan-New_York_City-748x509.jpg" />
                                            <h5 className='my-2'>{data.type}</h5>
                                            <h6 className='my-2'>{data.count} propertie</h6>
                                        </div>
                                    </div>
                                </>)
                            })
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default HomeCountByType