export default async function getCampground(id: string){
    await new Promise((resolve) => setTimeout(resolve, 300));
    const response = await fetch(`http://campgroundbooking.us-east-1.elasticbeanstalk.com/api/v1/campgrounds/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch campground")
    }
    return await response.json();
}
