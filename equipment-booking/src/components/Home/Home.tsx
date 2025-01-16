import { useEffect, useState } from "react";
import { fetchEquipment, bookEquipment } from "../../services/api"; // API services
import { Equipment } from "../../types/equipment"; // Interface
import "./Home.css";

export default function Home() {
  const [equipment, setEquipment] = useState<Equipment[]>([]); // Equipment State
  const [loading, setLoading] = useState<boolean>(true); // Loading State
  const [error, setError] = useState<string | null>(null); // Errors state

  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null); // Selected Equipment for booking
  const [duration, setDuration] = useState<number>(0); // Duration in minutes
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0); // Calculated Price

  useEffect(() => {
    /**
     * Fetches all the equipment from the API and save them in the state.
     * If the API does not return a 200 response, it will set an error.
     * In any case, it will remove the loading state at the end.
     */
    const getEquipment = async () => {
      try {
        const data = await fetchEquipment();
        setEquipment(data); // Save equipment in the state
        console.log(data); // debug
      } catch (err) {
        setError("Impossibile caricare le attrezzature!"); // Errors handling
        console.log(err); // debug
      } finally {
        setTimeout(() => {
          setLoading(false); // Remove loading state after delay to show spinner animation
        }, 1000);
      }
    };
    getEquipment();
  }, []);

  /**
   * Handles the input change event for the duration input field.
   * Updates the duration state and the calculated price state.
   * If the selectedEquipment is not null, it will calculate the new price.
   * @param {React.ChangeEvent<HTMLInputElement>} event input change event
   */
  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "" ? 0 : parseInt(event.target.value, 10); // Value handling
    setDuration(value); // Update The state
    console.log("Duration immesso:", value); // debug
    if (selectedEquipment) {
      setCalculatedPrice(value * selectedEquipment.pricePerMinute);
    }
  };

  /**
   * Handles the click event for renting equipment.
   * Sets the selected equipment and resets the duration and calculated price to zero.
   * @param {Equipment} item - The equipment item that is selected for booking.
   */

  const handleRentClick = (item: Equipment) => {
    setSelectedEquipment(item);
    setDuration(0);
    setCalculatedPrice(0);
  };

  /**
   * Closes the booking modal by clearing the selected equipment.
   */

  const closeBookingModal = () => {
    setSelectedEquipment(null);
  };

  /**
   * Confirms the booking for the selected equipment if a valid duration is set.
   * Attempts to book the equipment and provides user feedback via alerts.
   * Closes the booking modal upon successful booking.
   * Alerts the user if booking fails or if duration is invalid.
   * @async
   * @throws Will alert the user if an error occurs during booking.
   */

  const handleBookingConfirm = async () => {
    if (selectedEquipment && duration > 0) {
      try {
        await bookEquipment(selectedEquipment.id, duration);
        alert(`Prenotazione confermata per ${selectedEquipment.name}!`);
        closeBookingModal(); // Close the modal
      } catch (error) {
        console.error(error);
        alert("Si è verificato un errore durante la prenotazione.");
      }
    } else {
      alert("Inserisci una durata valida per completare la prenotazione.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-slate-800 border-solid rounded-full animate-spin border-t-transparent duration-500">
          <span className="absolute inset-0 flex justify-center items-center text-2xl">😀</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center font-bold text-4xl">{error}</p>;
  }

  return (
    <>
      <div className="app-container w-full p-4">
        <h1 className="app-title text-5xl text-slate-800 mb-4 text-center">Gym Equipment</h1>
        <div className="equipment-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {equipment.map((item) => (
            <div className="equipment-card bg-slate-800 text-white p-4 rounded-lg hover:bg-slate-700 transition-colors" key={item.id}>
              <img className="equipment-image w-full h-48 object-cover rounded-md mb-4" src={item.image} alt={item.name} />
              <h3 className="equipment-name text-xl font-semibold mb-2">{item.name}</h3>
              <p className="equipment-claim text-sm mb-2">{item.claim}</p>
              <p className="equipment-price text-lg">
                Prezzo: <strong>{item.pricePerMinute} €/min</strong>
              </p>
              <button
                className="equipment-rent-button bg-slate-300 text-slate-800 hover:bg-slate-400 w-full py-2 rounded-lg mt-4 transition-colors"
                onClick={() => handleRentClick(item)}
              >
                Noleggia
              </button>
            </div>
          ))}
        </div>

        {/* Modale di prenotazione */}
        {selectedEquipment && ( // this condition works similar to an if. if(selectedEqipment){do something}
          <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">
                Prenotazione - {selectedEquipment.name}
                <div className="flex justify-center" dangerouslySetInnerHTML={{ __html: selectedEquipment.icon }}></div>
              </h2>
              <p className="text-lg mb-4">
                Prezzo per minuto: <strong>{selectedEquipment.pricePerMinute} €</strong>
              </p>
              <label className="block mb-4">
                Durata (minuti):
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={duration}
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
                  className="modal-confirm-button bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-lg transition-colors"
                  onClick={handleBookingConfirm}
                  disabled={!duration || duration <= 0}
                >
                  Conferma
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
