// ordersData.ts
export const inProgressOrders = [
  {
    pharmacy: "Greenleaf Pharmacy",
    subOrderId: "31245-A",
    items: [
      "Amoxil (amoxicillin) 250mg Tablets x 2",
      "Emzor Paracetamol 500mg Tablets",
      "Funbact-A Antifungal Cream",
    ],
    status: "Out for Delivery",
  },
  {
    pharmacy: "PharmC Stores",
    subOrderId: "31245-B",
    items: ["Bond Panadol Syrup 20mL x 5", "Emzor Paracetamol 500mg Tablets"],
    status: "Confirmed",
  },
];

export const completedOrders = [
  {
    orderId: "31245",
    title: "Emzor Paracetamol Packet + 4 items",
    date: "April 20, 2025",
    address: "no 2 Adeyemi Allen Avenue, off Johnsons Ikeja, Lagos State.",
    details: [
      { name: "Emzor Paracetamol Packet", qty: 2, price: "16,000" },
      { name: "Flagyl 500mg Tablets", qty: 1, price: "1,000" },
      { name: "Amoxicillion 250mg Tablets", qty: 1, price: "4,000" },
    ],
    total: "37,000",
  },
  // Add more completed orders here
];

export const cancelledOrders = [
  {
    orderId: "31245-C",
    title: "Emzor Paracetamol Packet + 4 items",
    date: "April 20, 2025",
  },
  {
    orderId: "31245-D",
    title: "Amoxicillion 250mg Tablets + 1 item",
    date: "April 20, 2025",
  },
  {
    orderId: "31245-E",
    title: "Funbact-A Tropical Antifungal Cream",
    date: "April 20, 2025",
  },
];
