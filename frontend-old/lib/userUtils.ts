import { Availability, Booking, DateRange, StringRange, User } from "./types"



export function findEmployeeBusyRanges(employee:User){

  const busyRanges:StringRange[] = []

  employee.gigs?.map((gig:Booking) => {

    const gigRange = {
      start: new Date(gig.start).toString(),
      end: new Date(gig.end).toString(),
    }
    
    busyRanges.push(gigRange)
  })

  employee.availability?.map((avail:Availability) => {
    if(avail.type === 'AVAILABLE') return console.log('date is of type AVAILABLE')
    
    const availRange = {
      start: new Date(avail.start).toString(),
      end: new Date(avail.end).toString(),
    }
    console.table({availRange});
    busyRanges.push(availRange)
  })
  
  // console.log({busyRanges});
  return busyRanges
}