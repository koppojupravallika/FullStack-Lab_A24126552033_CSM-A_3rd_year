// Bus Ticket Booking System


const searchForm = document.getElementById("searchForm");

const busList = document.getElementById("busList");



/* ================================
   SEARCH BUSES
================================ */

searchForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const from = document.getElementById("from").value;

    const to = document.getElementById("to").value;

    const journeyDate =
        document.getElementById("journeyDate").value;


    if (from === to) {

        alert("Starting point and destination cannot be the same.");

        return;

    }


    try {

        const response = await fetch(
            `/buses?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
        );


        const buses = await response.json();


        busList.innerHTML = "";


        if (buses.length === 0) {

            busList.innerHTML = `
                <p>No buses available for this route.</p>
            `;

            return;

        }


        alert("Buses searched successfully!");


        buses.forEach(function(bus) {

            const busCard = document.createElement("div");

            busCard.className = "bus-card";


            busCard.innerHTML = `

                <h3>${bus.busName}</h3>

                <p>
                    <strong>Route:</strong>
                    ${bus.from} → ${bus.to}
                </p>

                <p>
                    <strong>Departure:</strong>
                    ${bus.departure}
                </p>

                <p>
                    <strong>Arrival:</strong>
                    ${bus.arrival}
                </p>

                <p>
                    <strong>Fare:</strong>
                    ₹${bus.fare}
                </p>

                <button class="book-button">
                    Book Now
                </button>

            `;


            const bookButton =
                busCard.querySelector(".book-button");


            bookButton.addEventListener("click", function() {

                bookTicket(
                    bus,
                    from,
                    to,
                    journeyDate
                );

            });


            busList.appendChild(busCard);

        });


    } catch (error) {

        console.log(error);

        alert("Unable to search buses.");

    }

});



/* ================================
   BOOK TICKET
================================ */

async function bookTicket(
    bus,
    from,
    to,
    journeyDate
) {


    const passengerName =
        prompt("Enter passenger name:");


    if (!passengerName) {

        return;

    }


    const bookingData = {

        busId: bus.id,

        busName: bus.busName,

        passengerName: passengerName,

        from: from,

        to: to,

        journeyDate: journeyDate,

        fare: bus.fare

    };


    try {

        const response = await fetch(
            "/book",
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(bookingData)

            }
        );


        const result =
            await response.json();


        alert(result.message);


    } catch (error) {

        console.log(error);

        alert("Booking failed.");

    }

}