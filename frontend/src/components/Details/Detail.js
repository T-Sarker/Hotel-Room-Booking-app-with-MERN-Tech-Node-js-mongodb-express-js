import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../hooks/typeFetchAPI'
import { NavLink, useParams } from "react-router-dom";
import './details.css'
import { searchContext } from '../../context/SearchContext';
import BookingDetails from './BookingDetails';

const Detail = () => {

    const params = useParams();
    const { dataVal, loading, error } = useFetch(`/hotel/show/${params.id}`);

    //dateNumber is for holding the range between two dates
    const [dateCount, setDateCount] = useState(0)

    //state for changing the images in details sectionn
    const [imagex, setimage] = useState('http://perfectturf.com/wp-content/uploads/2022/02/Photo-Placeholder-800x800-1.png')


    const { dates, options } = useContext(searchContext)
    useEffect(() => {
        console.log(dates.length)
        if (dates.length > 0) {

            const srtDate = dates[0].startDate;
            const endDate = dates[0].endDate;

            console.log(srtDate + " is the dates" + endDate)
            const dateNumber = dateConverter(srtDate, endDate)

            setDateCount(dateNumber)


        }

    }, [])

    function dateConverter(startDate, timeEnd) {
        const newStartDate = new Date(startDate);
        const newEndDate = new Date(timeEnd);
        const one_day = 1000 * 60 * 60 * 24;
        let result
        result = Math.ceil((newEndDate.getTime() - newStartDate.getTime()) / (one_day))
        if (result < 0) { return 0 }
        return result
    }

    function changeImg(imgUrl) {
        setimage(imgUrl)
    }


    return (
        <>
            <div className="container mt-5 pb-5">
                {loading ? ' loading' : <>
                    <div className="detailsWrapper">
                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <img src={`${imagex}`} id="main" className='mainImg w-100' />
                                <div className="detailThumbnails d-flex">
                                    <img src="https://source.unsplash.com/ufFIweqSPd4/800x800" onClick={() => { changeImg('https://source.unsplash.com/ufFIweqSPd4/800x800') }} />
                                    <img src="https://source.unsplash.com/O0uCm1WLnA0/800x800" onClick={() => { changeImg('https://source.unsplash.com/O0uCm1WLnA0/800x800') }} />
                                    <img src="https://source.unsplash.com/pV5ckb2HEVk/800x800" onClick={() => { changeImg('https://source.unsplash.com/pV5ckb2HEVk/800x800') }} />
                                    <img src="https://source.unsplash.com/j9QEFAQqaXc/800x800" onClick={() => { changeImg('https://source.unsplash.com/j9QEFAQqaXc/800x800') }} />
                                    <img src="https://source.unsplash.com/EXkbaeN05lY/800x800" onClick={() => { changeImg('https://source.unsplash.com/EXkbaeN05lY/800x800') }} />
                                    <img src="https://source.unsplash.com/B2mq60Ksrsg/800x800" onClick={() => { changeImg('https://source.unsplash.com/B2mq60Ksrsg/800x800') }} />
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <h2>{dataVal.title} </h2>
                                <p className='badge bg-primary'>{dataVal.city}</p>
                                <small className='float-end'>Excelent <span className='badge rounded-pill bg-success '>{dataVal.rating || 0}</span></small>

                                <div className="details">
                                    <p>{dataVal.desc}</p>
                                </div>

                                <div className="d-flex justify-content-between my-3 shadow-sm">
                                    <b>Type: {dataVal.type}</b>
                                    <b>Name: {dataVal.name}</b>
                                </div>

                                <div className="d-flex justify-content-between my-3 shadow-sm">
                                    <b>Prize</b>
                                    <h5>${dataVal.cheapestPrice} / Night</h5>
                                </div>

                                <div className="d-flex justify-content-between my-3 shadow-sm">
                                    <b>Address</b>
                                    <b>{dataVal.address}</b>
                                </div>

                                <div className="d-flex justify-content-between my-3 shadow-sm">
                                    <b>Distance</b>
                                    <b>{dataVal.distance}</b>
                                </div>



                                <div className='mt-5'>
                                    <h5>Perfect for  <b>{dateCount}</b> Nights</h5>
                                    <div className="w-100">

                                        <ul className="list-group list-group-horizontal">
                                            <li className="list-group-item w-100">Per Night</li>
                                            <li className="list-group-item w-100"><b>{dataVal.cheapestPrice}</b></li>
                                        </ul>


                                        <ul className="list-group list-group-horizontal">
                                            <li className="list-group-item w-100">Number of Rooms</li>
                                            <li className="list-group-item w-100"><b>{options.room}</b></li>
                                        </ul>


                                        <ul className="list-group list-group-horizontal">
                                            <li className="list-group-item w-100">Number of Days</li>
                                            <li className="list-group-item w-100"><b>{dateCount} days</b> {dateCount === 0 && <small className='text-warning fw-semibold'>[Choose Booking Dates]</small>} </li>
                                        </ul>


                                        {dateCount !== 0 && <ul className="list-group list-group-horizontal">
                                            <li className="list-group-item w-100"><b>Total Amount</b></li>
                                            <li className="list-group-item w-100"><b>{dataVal.cheapestPrice * dateCount * options.room} $</b></li>
                                        </ul>}

                                    </div>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <button type='button' className='btn btn-lg btn-primary w-100 mt-5'>BOOK NOW</button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="reviews mb-5">
                        <p className="fs-3 fw-bold my-4">All Reviews</p>

                        {!dataVal.rating ? <>
                            <h4 className='pb-5'>No Review Yet</h4>
                        </> :
                            <>
                                <ol className="list-group list-group-numbered">
                                    <li className="list-group-item d-flex justify-content-between align-items-start">
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">Subheading</div>
                                            Cras justo odio
                                        </div>
                                        <span className="badge bg-primary rounded-pill">14</span>
                                    </li>
                                </ol>
                            </>
                        }

                    </div>
                </>
                }
            </div>
            <BookingDetails />
        </>
    )
}

export default Detail