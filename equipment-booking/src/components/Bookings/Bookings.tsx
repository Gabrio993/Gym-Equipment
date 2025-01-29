import useBookings from "../../hooks/useBookings";
import useHome from "../../hooks/useHome";
import "./Booking.css";

/**
 * @component
 * Displays a list of active equipment bookings. Integrates data from the
 * useBookings and useHome hooks to fetch and map booking details with
 * corresponding equipment information. Handles the loading and error states
 * during the data fetching process.
 *
 * @returns {JSX.Element} A rendered component that shows a loading
 * spinner, an error message, or the list of active bookings with equipment details.
 */
export default function Bookings(): JSX.Element {
  const { booking: bookingList, loadBooking, errorBooking } = useBookings();
  const { equipment } = useHome();

  const booking = bookingList.map((el) => {
    const equipmentId = el.equipment_id;
    const equipmentItem = equipment.find((e) => e.id === equipmentId);
    return { ...el, equipment: equipmentItem };
  });

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
    return <p className="text-center font-semibold text-3xl mb-96">{errorBooking}</p>;
  }

  return (
    <>
      {/* Show Bookings */}
      <h2 className="text-3xl text-slate-800 mb-4 text-center">Prenotazioni</h2>
      <div className="booking-container bg-slate-800 text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
        {booking.length === 0 ? (
          <p className="text-center text-slate-400">Non ci sono prenotazioni attive.</p>
        ) : (
          <ul className="space-y-4">
            {booking.map((b) => (
              <li key={b.id} className="border-b border-slate-700 pb-4">
                <p className="text-sm flex flex-wrap justify-between gap-2">
                  <span className="font-semibold  ">Attrezzo:</span>
                  <span className="sm:ml-2">{b.equipment_id}</span>
                </p>
                <p className="text-sm flex flex-wrap justify-between gap-2">
                  <span className="font-semibold">Nome:</span>
                  <span className="sm:ml-2">{b.equipment?.name}</span>
                </p>
                <p className="text-sm flex flex-wrap justify-between gap-2">
                  <span className="font-semibold  ">Inizio:</span>
                  <span className="sm:ml-2">{new Date(b.start_date).toLocaleString()}</span>
                </p>
                <p className="text-sm flex flex-wrap justify-between gap-2">
                  <span className="font-semibold">Fine:</span>
                  <span className="sm:ml-2">{new Date(b.end_date).toLocaleString()}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
