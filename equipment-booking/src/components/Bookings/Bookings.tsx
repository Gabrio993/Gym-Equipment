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
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-slate-800 border-solid rounded-full animate-spin border-t-transparent duration-500">
          <span className="absolute inset-0 flex justify-center items-center text-2xl">😀</span>
        </div>
      </div>
    );
  }
  if (errorBooking) {
    return <p>{errorBooking}</p>;
  }

  return (
    <>
      {/* Visualizzazione delle prenotazioni */}
      <h2 className="text-2xl font-semibold text-slate-800 mb-4 text-center">Prenotazioni</h2>
      <div className="bg-slate-800 text-white p-6 mb-12 rounded-lg shadow-lg max-w-3xl mx-auto">
        {booking.length === 0 ? (
          <p className="text-center text-slate-400">Non ci sono prenotazioni attive.</p>
        ) : (
          <ul className="space-y-4">
            {booking.map((b) => (
              <li key={b.id} className="border-b border-slate-700 pb-4">
                <p className="text-sm flex justify-evenly">
                  <span className="font-semibold">Attrezzatura ID:</span> {b.equipment_id} | <span className="font-semibold">Inizio:</span>{" "}
                  {new Date(b.start_date).toLocaleString()} | <span className="font-semibold">Fine:</span> {new Date(b.end_date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
