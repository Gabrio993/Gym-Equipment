import { useEffect, useState } from "react";
import { EquipmentBooking } from "../types/equipment";
import { fetchBookings } from "../services/api";
import { useBookingsReturn } from "../types/booking";

/**
 * Custom hook for managing bookings data.
 *
 * This hook fetches all bookings from the API and manages the state of
 * bookings, loading status, and error messages. It filters bookings to
 * show only active ones and updates the state accordingly.
 *
 * @returns {useBookingsReturn} An object containing the following properties:
 * - booking: An array of active EquipmentBooking objects.
 * - loadBooking: A boolean indicating the loading status.
 * - errorBooking: A string or null representing any error messages.
 */

const useBookings = (): useBookingsReturn => {
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
        setErrorBooking("Errore nel caricamento delle prenotazioni!");
        console.log(err);
      } finally {
        setLoadBooking(false);
      }
    };
    getBooking();
  }, []);

  return {
    booking,
    loadBooking,
    errorBooking,
  };
};

export default useBookings;
