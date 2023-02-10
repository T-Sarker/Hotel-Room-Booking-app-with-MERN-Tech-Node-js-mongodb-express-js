import axios from 'axios';
import React, { useContext, useState } from 'react'
import { searchContext } from '../../context/SearchContext';
import { AuthContext } from "../../context/AuthContext";
const BookingDetails = (data) => {
    const { user, dispatch } = useContext(AuthContext)
    const [selectedRoom, setselectedRoom] = useState([]);
    const { dates } = useContext(searchContext)
    // console.log(JSON.stringify(data) + ' from modal' + dates + 'is dates');

    // function checkDates(room) {
    //     // console.log(JSON.stringify(room) + ' is rooms');
    //     if (dates.length > 0) {
    //         // curDate =new Date(curDate);
    //         const srtDate = dates[0].startDate;
    //         const endDate = dates[0].endDate;
    //         const isAvailable = room.bookedDates.some((date) => {
    //             console.log(date + ' is the booked date');
    //             const curDate = new Date(date).getTime();

    //             const bookingStartDate = new Date(srtDate).getTime() // use this step to convert your date if its stored in a different format
    //             const bookingEndDate = new Date(endDate).getTime() // use this step to convert your date if its stored in a different format
    //             const res = curDate >= bookingStartDate && curDate <= bookingEndDate;
    //             console.log(res + " is tge result " + bookingEndDate + ' curdate ' + curDate)
    //             return res;

    //         })

    //     }
    // }

    function getDatesInRange() {
        const startDate = new Date(dates[0].startDate);
        const endDate = new Date(dates[0].endDate);

        const gdate = new Date(startDate.getTime());

        // ✅ Exclude start date
        // gdate.setDate(gdate.getTime());

        let datesList = [];

        // ✅ Exclude end date
        while (gdate <= endDate) {
            datesList.push(new Date(gdate).getTime());
            gdate.setDate(gdate.getDate() + 1);
        }
        // console.log(datesList);
        return datesList;
    }
    const allDatesList = getDatesInRange();
    const isAvailable = (room) => {

        console.log(allDatesList);
        const isFound = room.bookedDates.some((date) => {
            var parm = new Date(date).getTime();
            // console.log(date + ' is notavailable dates')
            var x = allDatesList.includes(parm)
            return x;
        })
        // console.log('is common date found ' + isFound);
        return !isFound
    }


    function getTheRoomNumbers(roomId) {
        setselectedRoom((prev) => {
            return ([...prev, roomId]);
        })
        // console.log(selectedRoom + ' is room number')

    }


    // saving the selected dates and the room numbers to update the later dates 
    const saveTheBooking = () => {
        const srtDate = dates[0].startDate;
        const endDate = dates[0].endDate;
        var roomNumbers = selectedRoom;
        const BookedDates = [srtDate, endDate];

        try {
            roomNumbers.forEach(async (roomId) => {
                // console.log(roomId + 'is room id in details');
                const storeBooking = await axios.put(`http://localhost:4000/api/room/rooms/availability/${roomId}`, { dates: BookedDates });

            });
        } catch (error) {
            console.log(error + ' in booking details');
        }

        // axios call to update the roooms

    }


    return (
        <div>
            {console.log(user)}
            <div className="modal fade" id='bookingModal' tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card" >
                                <img src="https://source.unsplash.com/O0uCm1WLnA0/800x800" className="card-img-top" alt="" />
                                <div className="card-body">
                                    <h5 className="card-title">{data.data.name}</h5>
                                    <em className='text-info fw-bold'>{data.data.city}</em>
                                    <p className="card-text">{data.data.address}</p>
                                </div>
                                {/* {JSON.stringify(data.data)} */}
                                <p className='px-3'>{data.data.desc}</p>
                                <h4>Available room types </h4>
                                {data.data.rooms !== undefined && data.data.rooms.length > 0 ? <div className='mx-4'>
                                    {data.data.rooms.map(item => {
                                        return <div className='my-3' key={item._id}>

                                            <h5>{item.title} ${item.price}</h5>
                                            <h6 className='text-danger'>NB: {item.maxPeople}</h6>
                                            <p>{item.details}</p>
                                            <ul className="list-group list-group-flush">

                                                {item.roomNumbers.map(room => {
                                                    return (
                                                        <div className='d-flex'>

                                                            <input type="checkbox" value={room.number} onChange={() => { getTheRoomNumbers(room._id) }} className="list-group-item mx-2" disabled={!isAvailable(room) ? true : false} />{room.number}
                                                        </div>)

                                                })
                                                }
                                            </ul>
                                        </div>
                                    })}
                                </div> : <p>No Rooms Found</p>}
                                {/* <div className="card-body">
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a>
  </div> */}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            {user != null ? <button type="button" className="btn btn-primary" onClick={saveTheBooking}>Book Now</button> : <a href='/login' className="btn btn-primary">Login To Book Now</a>}
                            {/* <button type="button" className="btn btn-primary" onClick={saveTheBooking}>Book Now</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingDetails
