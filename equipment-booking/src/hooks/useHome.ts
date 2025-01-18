import { useEffect, useState } from "react";
import { Equipment } from "../types/equipment";
import { bookEquipment, fetchEquipment } from "../services/api";
import { UseHomeReturn } from "../types/home";

/**
 * Custom hook for managing home page state and actions.
 *
 * This hook handles the equipment data fetching, equipment selection, booking confirmation,
 * and user notifications. It manages the state for equipment list, loading status, error messages,
 * selected equipment, booking duration, calculated price, and notifications.
 *
 * It provides functions to handle changes in booking duration, equipment selection, booking confirmation,
 * and modal closure, along with a function to show notifications to the user.
 *
 * @returns {UseHomeReturn}
 **/

const useHome = (): UseHomeReturn => {
  const [equipment, setEquipment] = useState<Equipment[]>([]); // Equipment State
  const [loading, setLoading] = useState<boolean>(true); // Loading State
  const [error, setError] = useState<string | null>(null); // Errors state

  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null); // Selected Equipment for booking
  const [duration, setDuration] = useState<number>(0); // Duration in minutes
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0); // Calculated Price

  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

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
        // alert(`Prenotazione confermata per ${selectedEquipment.name}!`);
        showNotification(`Prenotazione confermata per ${selectedEquipment.name}!`, "success");
        closeBookingModal(); // Close the modal
      } catch (error) {
        console.error(error);
        // alert("Si è verificato un errore durante la prenotazione.");
        showNotification("Si è verificato un errore durante la prenotazione.", "error");
      }
    }
  };

  /**
   * Shows a notification with the given message and type for 3 seconds.
   * The type can be either "success" or "error".
   * @param {string} message - The message to show in the notification.
   * @param {"success" | "error"} type - The type of the notification.
   */
  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return {
    equipment,
    loading,
    error,
    calculatedPrice,
    notification,
    selectedEquipment,
    duration,
    handleDurationChange,
    handleRentClick,
    handleBookingConfirm,
    closeBookingModal,
  };
};
export default useHome;
