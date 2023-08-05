import React, { useState } from 'react';
import './FacilityBooking.css'

const FacilityBooking = () => {
    const [facility, setFacility] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [bookings, setBookings] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();


        let amount = 0;
        if (facility === 'Clubhouse') {
            const startHour = parseInt(startTime.split(':')[0], 10);
            const endHour = parseInt(endTime.split(':')[0], 10);
            if (startHour < 10) {
                amount += (Math.min(10, endHour) - startHour) * 10;
            }
            if (endHour > 16) {
                amount += (Math.min(22, endHour) - Math.max(16, startHour)) * 500;
            }
        } else if (facility === 'Tennis Court') {
            const hours = parseInt(endTime.split(':')[0], 10) - parseInt(startTime.split(':')[0], 10);
            amount += hours * 50;
        }


        const newBooking = {
            facility,
            date,
            startTime,
            endTime,
            amount,
        };

        const conflictingBooking = bookings.find(
            (booking) =>
                booking.facility === facility &&
                booking.date === date &&
                ((startTime >= booking.startTime && startTime < booking.endTime) ||
                    (endTime > booking.startTime && endTime <= booking.endTime) ||
                    (startTime <= booking.startTime && endTime >= booking.endTime))
        );

        if (conflictingBooking) {
            alert('Booking Failed, Already Booked.');
        } else {
            setBookings([...bookings, newBooking]);
        }

        setFacility('');
        setDate('');
        setStartTime('');
        setEndTime('');
    };

    return (
        <div>
            <h2 className='title-heading'>Facility/Common Amentities Booking</h2>
            <div className='form-div'>
                <form onSubmit={handleFormSubmit} >
                    <div className='facility-div'>
                        <select className='select-option' id="facility" value={facility} onChange={(e) => setFacility(e.target.value)}>
                            <option value="">Select Facility</option>
                            <option value="Clubhouse">Clubhouse</option>
                            <option value="Tennis Court">Tennis Court</option>
                        </select>
                    </div>
                    <div className='date-div'>
                        <label htmlFor="date">Date</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    </div>
                    <div className='startTime-div'>
                        <label htmlFor="startTime">Start Time</label>&nbsp;&nbsp;
                        <input type="text" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </div>
                    <div className='endTime-div'>
                        <label htmlFor="endTime">End Time</label>&nbsp;&nbsp;&nbsp;
                        <input type="text" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                    <button className='submit-button' type="submit">Book Facility</button>
                </form>
            </div>
            {bookings.length > 0 && (
                <div className='result-div'>
                    <h3>Your Booking</h3>
                    <ul>
                        {bookings.map((booking, index) => (
                            <li className='result-part' key={index}>
                                {`${booking.facility}, ${booking.date}, ${booking.startTime} to ${booking.endTime} - Rs. ${booking.amount}`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FacilityBooking;