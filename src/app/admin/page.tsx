import Link from 'next/link';
import { Button } from '@mui/material';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Campground Management</h2>
          <div className="space-y-3">
            <Link href="/admin/campgrounds">
              <Button variant="contained" fullWidth>
                Manage Campgrounds
              </Button>
            </Link>
            <Link href="/admin/campgrounds/create">
              <Button variant="outlined" fullWidth>
                Create New Campground
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Booking Management</h2>
          <div className="space-y-3">
            <Link href="/admin/bookings">
              <Button variant="contained" fullWidth>
                Manage All Bookings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}