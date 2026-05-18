import React, { useState } from "react";

const CreateReservation = () => {

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        guests: 1,
        reservation_date: "",
        reservation_time: "",
        special_request: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            const response = await fetch(`${process.env.REACT_APP_API_URL}reservation/`, 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (response.ok) {

                setMessage("Reservation created successfully!");

                setFormData({
                    full_name: "",
                    email: "",
                    phone: "",
                    guests: 1,
                    reservation_date: "",
                    reservation_time: "",
                    special_request: "",
                });

            } else {

                setMessage(
                    JSON.stringify(data)
                );
            }

        } catch (error) {

            console.error(error);

            setMessage(
                "Something went wrong."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">

            <h2>Book a Table</h2>

            {message && (
                <p>{message}</p>
            )}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="full_name"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="guests"
                    placeholder="Guests"
                    min="1"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="date"
                    name="reservation_date"
                    value={formData.reservation_date}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="time"
                    name="reservation_time"
                    value={formData.reservation_time}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <textarea
                    name="special_request"
                    placeholder="Special Request"
                    value={formData.special_request}
                    onChange={handleChange}
                />

                <br /><br />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {
                        loading
                        ? "Booking..."
                        : "Reserve Table"
                    }
                </button>

            </form>

        </div>
    );
};

export default CreateReservation;