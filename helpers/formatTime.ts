import { format } from "date-fns";

export function formatTimeInMS(milliseconds: number): string {
  if (milliseconds <= 0) return "00:00:00";

  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
}

export function formatTime(dateInput: string | Date | number): string {
  if (!dateInput) return "00:00:00";
  return format(new Date(dateInput), "p");
}
