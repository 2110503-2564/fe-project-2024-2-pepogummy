import { VenueJson } from "../../interface";

export default async function getVenues(): Promise<VenueJson> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const response = await fetch("https://a08-venue-explorer-backend-2.vercel.app/api/v1/venues");
    if (!response.ok) {
        throw new Error("Failed to fetch venues")
    }
    const data: VenueJson = await response.json();
    return data;
}