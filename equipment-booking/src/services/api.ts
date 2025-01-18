import { LoginResponse } from "../types/auth";
import { Equipment, EquipmentBooking } from "../types/equipment";

const API_BASE_URL = "https://d3660g9kardf5b.cloudfront.net/api";
// const API_BASE_URL = "https://react-gym-server.onrender.com/api";

/**
 * Fetches all the available equipment from the API.
 * @throws {Error} If the API does not return a 200 response.
 * @returns {Promise<Equipment[]>} A promise that resolves with an array of equipment objects.
 */
export const fetchEquipment = async (): Promise<Equipment[]> => {
  const response = await fetch(`${API_BASE_URL}/equipment`);
  if (!response.ok) {
    throw new Error("Errore nel caricamento delle attrezzature");
  }
  return response.json();
};

/**
 * Fetches all the bookings from the API.
 * @throws {Error} If the API does not return a 200 response.
 * @returns {Promise<EquipmentBooking[]>} A promise that resolves with an array of booking objects.
 */
export const fetchBookings = async (): Promise<EquipmentBooking[]> => {
  const token = localStorage.getItem("authToken");
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(`${API_BASE_URL}/equipment-bookings`, { headers });
  if (!response.ok) {
    throw new Error("Errore nel caricamento delle prenotazioni");
  }
  return response.json();
};

/**
 * Creates a new booking for the specified equipment.
 * @throws {Error} If the API does not return a 200 response.
 * @param {number} equipmentId - The id of the equipment to be booked.
 * @param {number} duration - The duration in minutes of the booking.
 * @returns {Promise<void>} A promise that resolves when the booking is created.
 */
export const bookEquipment = async (equipmentId: number, duration: number): Promise<void> => {
  const token = localStorage.getItem("authToken");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${API_BASE_URL}/equipment/${equipmentId}/book`, {
    method: "POST",
    headers,
    body: JSON.stringify({ duration }), // create an object with the duration and send it
  });

  if (!response.ok) {
    throw new Error("Errore durante la prenotazione. Riprova.");
  }
};

/**
 * Sends a registration request to the API.
 * @param {string} username - The username to be registered.
 * @param {string} password - The password for the new user.
 * @returns {Promise<string>} A promise that resolves with the response from the API.
 */
export const authRegister = async (username: string, password: string): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Errore durante la registrazione");
  }
  const data = await response.text();
  return data;
};

/**
 * Sends a login request to the API.
 * @param {string} username - The username to login with.
 * @param {string} password - The password for the user.
 * @returns {Promise<Response>} A promise that resolves with the response from the API.
 */
export const authLogin = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Errore durante il login");
  }

  return await response.json();
};
