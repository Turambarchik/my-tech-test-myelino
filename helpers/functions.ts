
export function getDaysUntil(date: string): number {
  const targetDate = new Date(date);
  const currentDate = new Date();
  const diffInMs = targetDate.getTime() - currentDate.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}