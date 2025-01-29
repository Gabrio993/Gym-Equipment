import { Equipment } from "./equipment";

export interface UseHomeReturn {
  equipment: Equipment[];
  loading: boolean;
  error: string | null;
  calculatedPrice: number;
  notification: { message: string; type: "success" | "error" } | null;
  selectedEquipment: Equipment | null;
  duration: number | null;
  handleDurationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRentClick: (item: Equipment) => void;
  handleBookingConfirm: () => Promise<void>;
  closeBookingModal: () => void;
}
