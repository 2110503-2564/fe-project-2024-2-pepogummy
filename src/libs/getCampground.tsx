export default async function getCampground(id: string) {
    const response = await fetch(`http://campgroundbooking.us-east-1.elasticbeanstalk.com/api/v1/campgrounds/${id}`);
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch campground: ${errorData.message || response.statusText}`);
    }
    
    return await response.json();
}