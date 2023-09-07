import { Session } from "next-auth"

export interface User {
    name:          string
    email:         string    
    image?:        string
    cart:          string[]  
    watchlist:     string[]  
    purchase?:     []
    address:       string[] 
    Order:         Order[]
}

export interface SessionType  {
    update: UpdateSession;
    data: Session;
    status: string;
}