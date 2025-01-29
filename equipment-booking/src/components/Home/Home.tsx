import useHome from "../../hooks/useHome";
import "./Home.css";

/**
 * @component
 * Renders the Home component for the gym equipment booking application.
 * It manages the state of equipment, selected equipment, booking duration,
 * calculated price, loading, and error states. It also handles interactions
 * for renting equipment, confirming bookings, and displaying notifications.
 *
 * The component utilizes the useHome hook for state management and provides
 * UI for loading status, error display, equipment listing, booking modal,
 * and notifications.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
export default function Home(): JSX.Element {
  const {
    equipment,
    selectedEquipment,
    duration,
    loading,
    error,
    calculatedPrice,
    notification,
    handleDurationChange,
    handleRentClick,
    handleBookingConfirm,
    closeBookingModal,
  } = useHome();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-slate-800 border-solid rounded-full animate-spin border-t-transparent duration-500">
          <span className="absolute inset-0 flex justify-center items-center text-2xl">
            <img src="/assets/img/gym-dumbbell-svgrepo-com.svg" alt="dumbell-img" />
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center font-semibold text-3xl mb-96">{error}</p>;
  }

  return (
    <>
      <div className="app-container w-full p-4">
        <h1 className="app-title text-3xl font-semibold text-slate-800 mb-4 text-center">Gym Equipment</h1>
        <div className="equipment-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {equipment.map((item) => (
            <div className="equipment-card bg-slate-800 text-white p-4 rounded-lg hover:bg-slate-700 transition-colors" key={item.id}>
              <img className="equipment-image w-full h-44 object-cover rounded-md mb-4" src={item.image} alt={item.name} />
              <h3 className="equipment-name text-xl font-semibold mb-2">{item.name}</h3>
              <p className="equipment-claim text-sm mb-2">{item.claim}</p>
              <p className="equipment-price text-lg">
                Prezzo: <strong>{item.pricePerMinute} €/min</strong>
              </p>
              <button
                className="equipment-rent-button bg-slate-300 text-slate-800 hover:bg-slate-100  w-full py-2 rounded-lg mt-4 transition-colors"
                onClick={() => handleRentClick(item)}
              >
                Noleggia
              </button>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {selectedEquipment && ( // this condition works similar to an if. if(selectedEqipment){do something}
          <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10 p-6">
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">
                Prenotazione - {selectedEquipment.name}
                <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: selectedEquipment.icon }}></div>
              </h2>
              <p className="text-lg mb-4">
                Prezzo per minuto: <strong>{selectedEquipment.pricePerMinute.toFixed(2)} €</strong>
              </p>
              <label className="block mb-4">
                Durata (minuti):
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={duration || ""}
                  onChange={handleDurationChange}
                  className="mt-1 p-2 border border-slate-300 rounded-lg w-full"
                />
              </label>
              <p className="text-lg mb-4">
                Prezzo totale stimato: <strong>{calculatedPrice.toFixed(2)} €</strong>
              </p>
              <div className="modal-actions flex justify-center gap-4">
                <button
                  className="modal-close-button bg-slate-300 text-slate-800 hover:bg-slate-400 py-2 px-4 rounded-lg transition-colors"
                  onClick={closeBookingModal}
                >
                  Chiudi
                </button>
                <button
                  className="modal-confirm-button bg-blue-500 text-white hover:bg-blue-600 disabled:bg-white py-2 px-4 rounded-lg transition-colors"
                  onClick={handleBookingConfirm}
                  disabled={!duration || duration <= 0 || duration > 20}
                >
                  Conferma
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Notifications */}
        {notification && (
          <div
            className={`notification fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </>
  );
}
