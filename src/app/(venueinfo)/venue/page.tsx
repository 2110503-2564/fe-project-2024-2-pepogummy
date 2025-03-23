import getVenues from "@/libs/getVenues"
import VenueCatalog from "@/components/VenueCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"

export default function venuePage() {
  const venues =  getVenues();
  return (
    <>
    <h1 className="text-center text-3xl">Select your venue</h1>
    <Suspense fallback={ <p className="text-center">Loading... <LinearProgress/></p> }>
            <VenueCatalog venuesJson={venues}/>                
    </Suspense>
    </>
  )
}
