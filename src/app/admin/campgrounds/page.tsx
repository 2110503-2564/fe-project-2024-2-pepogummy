import { CampgroundItem } from "../../../../interface";
import getCampgrounds from "@/libs/getCampgrounds";
import Link from 'next/link';
import { Button } from '@mui/material';
import CampgroundTable from '@/components/CampgroundTable';

export default async function CampgroundManagement() {
  const campgrounds = await getCampgrounds();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Campground Management</h1>
        <Link href="/admin/campgrounds/create">
          <Button variant="contained" color="primary">
            Create New Campground
          </Button>
        </Link>
      </div>
      
      <CampgroundTable campgrounds={campgrounds.data} />
    </div>
  );
}