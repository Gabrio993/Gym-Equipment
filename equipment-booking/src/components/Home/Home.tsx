import { useEffect, useState } from "react";
import { fetchEquipment, bookEquipment } from "../../services/api"; // API services
import { Equipment } from "../../types/equipment"; // Interface

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
        setLoading(false); // Remove loading state
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
    return <p>Caricamento in corso...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="app-container">
        <h1 className="app-title">Attrezzature disponibili</h1>
        <div className="equipment-list">
          {equipment.map((item) => (
            <div className="equipment-card" key={item.id}>
              <img className="equipment-image" src={item.image} alt={item.name} />
              <h3 className="equipment-name">{item.name}</h3>
              <p className="equipment-claim">{item.claim}</p>
              <p className="equipment-price">
                Prezzo: <strong>{item.pricePerMinute} €/min</strong>
              </p>
              <button className="equipment-rent-button" onClick={() => handleRentClick(item)}>
                Noleggia
              </button>
            </div>
          ))}
        </div>

        {/* Modale di prenotazione */}
        {selectedEquipment && ( // this condition works similar to an if. if(selectedEqipment){do something}
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>
                Prenotazione - {selectedEquipment.name}
                <div className="icon" dangerouslySetInnerHTML={{ __html: selectedEquipment.icon }}></div>
              </h2>
              <p>
                Prezzo per minuto: <strong>{selectedEquipment.pricePerMinute} €</strong>
              </p>
              <label>
                Durata (minuti):
                <input type="number" min="0" max="20" value={duration} onChange={handleDurationChange} />
              </label>
              <p>
                Prezzo totale stimato: <strong>{calculatedPrice.toFixed(2)} €</strong>
              </p>
              <div className="modal-actions">
                <button className="modal-close-button" onClick={closeBookingModal}>
                  Chiudi
                </button>
                <button className="modal-confirm-button" onClick={handleBookingConfirm} disabled={!duration || duration <= 0}>
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
