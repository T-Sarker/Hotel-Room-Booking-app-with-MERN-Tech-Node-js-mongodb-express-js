import React, { useContext, useState } from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'

import { FaStreetView, FaBaby, FaHome, FaCalendarAlt } from "react-icons/fa";
import { searchContext } from '../../context/SearchContext';

const HomeSearchBar = () => {
    const navigate = useNavigate();

    // state for showing and hiding option buttons
    const [dateBtn, setDateBtn] = useState(false)
    const [optionBtn, setOptionBtn] = useState(false)

    //react-date-range needs this state management
    const [destination, setDestination] = useState('')
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    // managing option buttons value
    const [optionValue, setOptionValue] = useState({
        adult: 1,
        children: 0,
        room: 1
    })


    //option hiding or showing
    const DateBtnToggle = () => {
        if (dateBtn === true) {
            setDateBtn(false)
        } else {
            setDateBtn(true)
        }
    }

    //option hiding or showing
    const optionBtnToggle = () => {
        if (optionBtn === true) {
            setOptionBtn(false)
        } else {
            setOptionBtn(true)
        }
    }

    //assigning option value
    const handleValue = (name, type) => {
        setOptionValue((prev) => { // to get the previous valu i have to put it inside fat arrow function
            return {
                ...prev, [name]: type === 'dec' ? optionValue[name] - 1 : optionValue[name] + 1
            }
        })
    }

    const { dispatch } = useContext(searchContext)


    //handeling the search button
    const handelSearch = () => {
        const payload = {
            city: destination,
            dates: date,
            options: optionValue
        }
        dispatch({ type: "NEW_SEARCH", payload: payload });
        navigate('/hotel', { state: { destination, date, optionValue } })
    }

    return (
        <div>
            <div className="container">
                <div className="searchbox">
                    <div className="row">
                        <div className="col-sm-12 col-md-3 p-0">
                            <div className="searchboxItem">
                                <input type="text" className="form-control py-3 boder-dark rounded-pill" placeholder='Where are You Going' onChange={(e) => { setDestination(e.target.value) }} />
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-3 p-0">
                            <div className="searchboxItem">
                                <div className='form-control py-3 rounded-pill' onClick={DateBtnToggle}><span className='text-muted'><FaCalendarAlt /> {`${format(date[0].startDate, "dd/MM/yyyy")}`} to {`${format(date[0].endDate, "dd/MM/yyyy")}`}</span></div>
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    className={dateBtn ? 'd-block' : 'd-none'}
                                />
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-4 p-0">
                            <div className="searchboxItem">
                                <div className='form-control py-3 rounded-pill' onClick={optionBtnToggle}><small className='text-muted shadow-text overflow-hidden d-flex justify-content-between'><FaStreetView /> {optionValue.adult} Adult <FaBaby /> {optionValue.children} Baby <FaHome /> {optionValue.room} Rooms</small></div>
                                <div className={optionBtn ? 'numBoxWraper d-block' : 'numBoxWraper d-none'}>
                                    {/* single search number op people box item */}
                                    <div className="optionItem">
                                        <p className='optionTitle text-dark mx-4'>Adult</p>
                                        <div className="d-flex">
                                            <button className='btn btn-outline-dark mx-1' disabled={optionValue.adult <= 1 ? true : false}
                                                onClick={() => { handleValue('adult', 'dec') }}
                                            >-</button>
                                            <span className='btn btn-outline-warning'>{optionValue.adult}</span>
                                            <button className='btn btn-outline-dark mx-1' onClick={() => { handleValue('adult', 'inc') }}>+</button>
                                        </div>
                                    </div>

                                    {/* single search number op people box item */}
                                    <div className="optionItem">
                                        <p className='optionTitle text-dark mx-4'>Children</p>
                                        <div className="d-flex">
                                            <button className='btn btn-outline-dark mx-1' disabled={optionValue.children <= 0 ? true : false}
                                                onClick={() => { handleValue('children', 'dec') }}
                                            >-</button>
                                            <span className='btn btn-outline-warning'>{optionValue.children}</span>
                                            <button className='btn btn-outline-dark mx-1' onClick={() => { handleValue('children', 'inc') }}>+</button>
                                        </div>
                                    </div>

                                    {/* single search number op people box item */}
                                    <div className="optionItem">
                                        <p className='optionTitle text-dark mx-4'>Room</p>
                                        <div className="d-flex">
                                            <button className='btn btn-outline-dark mx-1' disabled={optionValue.room <= 1 ? true : false}
                                                onClick={() => { handleValue('room', 'dec') }}
                                            >-</button>
                                            <span className='btn btn-outline-warning'>{optionValue.room}</span>
                                            <button className='btn btn-outline-dark mx-1' onClick={() => { handleValue('room', 'inc') }}>+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-2 p-0">
                            <button className='form-control py-3 rounded-pill btn-outline-dark w-50' onClick={handelSearch}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeSearchBar