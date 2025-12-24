export interface Order {
    id: string;
    orderNumber: string;
    userId: string;
    totalAmount: number;
    status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
    createdAt: string;
}
    