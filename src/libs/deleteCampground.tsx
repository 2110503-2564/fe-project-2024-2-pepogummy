export default async function deleteCampground(id: string, token: string) {
    const response = await fetch(`http://campgroundbooking.us-east-1.elasticbeanstalk.com/api/v1/venues/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        throw new Error("Failed to delete campground");
    }
    return await response.json();
}