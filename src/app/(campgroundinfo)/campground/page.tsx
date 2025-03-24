import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default function CampgroundPage() {
  const campgrounds =  getCampgrounds();
  return (
    <>
    <div>
    <h1 style={{ marginTop: '32px' }} className="text-center text-3xl">Select your campground</h1>
    </div>
    
    <Suspense fallback={ <p className="text-center">Loading... <LinearProgress/></p> }>
            <CampgroundCatalog campgroundsJson={campgrounds}/>                
    </Suspense>
    </>
  )
}
