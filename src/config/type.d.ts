export interface User {

    name:          string
    email:         String    
    image?:        String
    cart:          String[]  
    watchlist:     String[]  
    purchase?:     []
    address:       String[] 
    Order:         Order[]
}