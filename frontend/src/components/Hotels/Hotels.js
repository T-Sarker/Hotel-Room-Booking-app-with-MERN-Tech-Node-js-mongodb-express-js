import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { DateRange } from 'react-date-range'
import { format } from 'date-fns'
import './hotel.css'
import useFetch from '../../hooks/typeFetchAPI'
import { searchContext } from '../../context/SearchContext'
const Hotels = () => {
    const location = useLocation()
    const { city, dates, options, dispatch } = useContext(searchContext)

    const [Sdestination, setDestination] = useState(location.state.destination)

    const [date, setDate] = useState(location.state.date)
    const [optionsx, setOptions] = useState(location.state.optionValue)
    const [dateBtn, setDateBtn] = useState(false)

    //getting the min max value
    const [min, setMin] = useState(null)
    const [max, setMax] = useState(null)

    const { dataVal, loading, error, reFetchData } = useFetch(`/hotel/all?city=${Sdestination}&hmin=${min}&hmax=${max}&limit=10`)


    //option hiding or showing
    const DateBtnToggle = () => {
        if (dateBtn === true) {
            setDateBtn(false)
        } else {
            setDateBtn(true)
        }
    }
    //handel the current page search bar




    const optionValues = (name, val) => {

        setOptions((prev) => { // to get the previous value i have to put it inside fat arrow function
            return {
                ...prev, [name]: val
            }
        })
    }
    const searchHandel = (e) => {
        const payload = {
            city: Sdestination,
            dates: date,
            options: optionsx
        }
        dispatch({ type: "NEW_SEARCH", payload: payload });
        reFetchData()
    }
    return (
        <>
            <div className="container mt-5 mb-3 pb-5">
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-3">

                        {/* left site search sidebar */}
                        <div className="bg-darkBlue py-4 px-2">
                            <h4 className='text-white fw-regular'>Search Filters</h4>

                            <form>

                                <div className="my-2">
                                    <label htmlFor="destination" className="form-label text-white fw-regular">Destination</label>
                                    <input type="text" className="form-control" id="destination" placeholder='Which City' onChange={(e) => { setDestination(e.target.value) }} value={Sdestination} />
                                </div>

                                <div className="my-2">
                                    <label htmlFor="inputEmail4" className="form-label text-white fw-regular">Check-In-Dates</label>
                                    {/* <input type="date" className="form-control" id="inputEmail4" /> */}
                                    <p className='text-muted form-control' onClick={DateBtnToggle}> {`${format(date[0].startDate, "dd/MM/yyyy")}`} to {`${format(date[0].endDate, "dd/MM/yyyy")}`}</p>
                                    <DateRange
                                        editableDateInputs={true}
                                        onChange={item => setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        className={dateBtn ? 'd-block' : 'd-none'}
                                    />
                                </div>
                                <h5 className='my-3 text-white fw-regular'>Options</h5>

                                <div className="row mb-3">
                                    <div className="col-sm-12 col-md-7">
                                        <label htmlFor="inputEmail3" className="col-form-label text-white fw-regular">Min-Price/Night</label>
                                    </div>
                                    <div className="col-sm-12 col-md-5">
                                        <input type="number" min={0} className="form-control" id="minPrice" name='minPrice' placeholder='0' onChange={e => { setMin(e.target.value) }} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-12 col-md-7">
                                        <label htmlFor="inputEmail3" className="col-form-label text-white fw-regular">Max-Price/Night</label>
                                    </div>
                                    <div className="col-sm-12 col-md-5">
                                        <input type="number" id="maxPrice" name='maxPrice' className="form-control" placeholder='0' onChange={e => { setMax(e.target.value) }} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-12 col-md-7">
                                        <label htmlFor="adult" className="col-form-label text-white fw-regular">Adult</label>
                                    </div>
                                    <div className="col-sm-12 col-md-5">
                                        <input type="number" min={1} max={100} className="form-control" id="adult" onChange={(e) => { optionValues('adult', e.target.value) }} value={optionsx.adult} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-12 col-md-7">
                                        <label htmlFor="children" className="col-form-label text-white fw-regular">Children</label>
                                    </div>
                                    <div className="col-sm-12 col-md-5">
                                        <input type="number" min={0} max={100} className="form-control" id="children" onChange={(e) => { optionValues('children', e.target.value) }} value={optionsx.children} />
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-sm-12 col-md-7">
                                        <label room="inputEmail3" className="col-form-label text-white fw-regular">Room</label>
                                    </div>
                                    <div className="col-sm-12 col-md-5">
                                        <input type="number" min={1} max={100} className="form-control" id="room" onChange={(e) => { optionValues('room', e.target.value) }} value={optionsx.room} />
                                    </div>
                                </div>
                                <button type='button' className='btn btn-primary' onClick={searchHandel}>Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-8 col-lg-9">
                        <div className="hotelItemWrapper">

                            {loading ? 'loading' : dataVal.map(item => {
                                return <><div className="hotelItem" key={item._id}>
                                    <div className="card mb-3 shadow-sm">
                                        <div className="row g-0">

                                            <div className="col-md-4">
                                                <img src="https://cdn.pixabay.com/photo/2016/11/06/23/51/buildings-1804479__340.jpg" className="img-fluid rounded-start w-100 h-100" alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-6">
                                                            <NavLink to={`/hotel/show/${item._id}`}> <h5 className="card-title me-3 w-100">{item.title}</h5></NavLink>
                                                        </div>
                                                        <div className="col-6 text-end">
                                                            {item.rating &&
                                                                <h6>Excelent <span className="badge bg-primary ms-3">9.8</span></h6>}
                                                        </div>
                                                    </div>
                                                    <p><em>{item.distance} from Distance</em></p>
                                                    <p className="badge rounded-pill bg-success">{item.name}</p>
                                                    <div className="row">
                                                        <div className="col-8">
                                                            <div className="detailsBox overflow-hidden" >
                                                                <p className="card-text">{item.desc.substring(0, 100)}...</p>
                                                                {/* <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> */}
                                                            </div>
                                                        </div>
                                                        <div className="col-4 text-end">
                                                            <div className="detailsBox" >
                                                                <h2>$ {item.cheapestPrice}</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <p className="fw-bold text-success">Free Cancelation</p>
                                                        <p className='text-muted'>Includes texes & fees</p>
                                                    </div>
                                                    <NavLink to={`/hotel/show/${item._id}`} className='d-block btn btn-primary text-uppercase'>See Avaibality</NavLink>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hotels