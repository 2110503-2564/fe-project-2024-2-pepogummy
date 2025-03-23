import { CampgroundJson } from "../../interface";

export default async function getCampgrounds(): Promise<CampgroundJson> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const response = await fetch("http://campgroundbooking.us-east-1.elasticbeanstalk.com/api/v1/campgrounds");
    if (!response.ok) {
        throw new Error("Failed to fetch Campgrounds")
    }
    const data: CampgroundJson = await response.json();
    return data;
}