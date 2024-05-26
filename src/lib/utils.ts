import clsx, { ClassValue } from "clsx";
import { twMerge } from "tw-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function timePassed(date: Date): string {
	const now = new Date();
	const diff = Math.abs(now.getTime() - date.getTime());

	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	if (days > 0) return `${days}d`;

	const hours = Math.floor(diff / (1000 * 60 * 60));
	if (hours > 0) return `${hours}h`;

	const minutes = Math.floor(diff / (1000 * 60));
	if (minutes > 0) return `${minutes}m`;

	return "Just now";
}
