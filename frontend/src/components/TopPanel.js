import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TopPanel({ onFiltersChange }) {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = async () => {
        try {
            const result = await axios.get('http://localhost:8080/venues');
            setVenues(result.data);
        } catch (error) {
            console.log('Fetch Venues Error Occurred!', error);
        }
    };

    const handleFilterChange = (e) => {
        const { id, value } = e.target;
        onFiltersChange(id, value);
    };

    return (
        <div className="bg-light p-3">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="checkInDate" className="mr-2">Check-in Date</label>
                            <input type="date" className="form-control" id="checkInDate" onChange={handleFilterChange} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="checkOutDate" className="mr-2">Check-out Date</label>
                            <input type="date" className="form-control" id="checkOutDate" onChange={handleFilterChange} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label htmlFor="venue" className="mr-2 align-middle">Venue</label>
                            <select id="venue" className="form-control align-middle" onChange={handleFilterChange}>
                                <option value="">Choose...</option>
                                <option value="FAS">FAS</option>
                                <option value="FBS">FBS</option>
                                <option value="FTS">FTS</option>
                                {venues.map((venue, index) => (
                                    <option key={index} value={venue}>{venue}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
