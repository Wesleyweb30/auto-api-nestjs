export class Appointment {
    id: string;
    date: Date;
    customerId: string;
    services: { id: string; name: string; price: number }[];
    totalPrice: number;  
  }