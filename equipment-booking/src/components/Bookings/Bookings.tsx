import { useEffect, useState } from "react";
import { EquipmentBooking } from "../../types/equipment";
import { fetchBookings } from "../../services/api";

/**
 * Fetches all the bookings from the API and shows them in a list.
 * If the API does not return a 200 response, it will show an error.
 * If there are no active bookings, it will show a message.
 * The loading state is shown while the data is being fetched.
 * @returns {JSX.Element}
 */
export default function Bookings(): JSX.Element {
  const [booking, setBooking] = useState<EquipmentBooking[]>([]); // bookingState
  const [loadBooking, setLoadBooking] = useState<boolean>(true); // Loading StateBooking
  const [errorBooking, setErrorBooking] = useState<string | null>(null); // Errors state Booking

  useEffect(() => {
    /**
     * Fetches all the bookings from the API and save them in the state.
     * It will filter the bookings to show only the active ones.
     * If the API does not return a 200 response, it will set an error.
     * In any case, it will remove the loading state at the end.
     */
    const getBooking = async () => {
      try {
        const data = await fetchBookings();
        const now = new Date();
        const activeBookings = data.filter((b) => new Date(b.end_date) > now);
        setBooking(activeBookings);
      } catch (err) {
        setErrorBooking("errore nel caricamento delle prenotazioni");
        console.log(err);
      } finally {
        setLoadBooking(false);
      }
    };
    getBooking();
  }, []);

  if (loadBooking) {
    return <p>Caricamento in corso...</p>;
  }
  if (errorBooking) {
    return <p>{errorBooking}</p>;
  }

  return (
    <>
      {/* Visualizzazione delle prenotazioni */}
      <h2>Prenotazioni</h2>
      <div>
        {booking.length === 0 ? (
          <p>Non ci sono prenotazioni attive.</p>
        ) : (
          <ul>
            {booking.map((b) => (
              <li key={b.id}>
                <p>
                  Attrezzatura ID: {b.equipment_id} | Inizio: {new Date(b.start_date).toLocaleString()} | Fine:{" "}
                  {new Date(b.end_date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
