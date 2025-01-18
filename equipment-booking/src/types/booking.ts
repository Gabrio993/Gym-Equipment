import { EquipmentBooking } from "./equipment";

export interface useBookingsReturn {
  booking: EquipmentBooking[];
  loadBooking: boolean;
  errorBooking: string | null;
}
