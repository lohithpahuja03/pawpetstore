import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserAddress {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

export interface UserOrder {
  id: string;
  orderNumber: string;
  date: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  paymentMethod: string;
  shippingAddress: UserAddress;
}

export interface UserAppointment {
  id: string;
  bookingRef: string;
  serviceName: string;
  petName: string;
  petType: string;
  date: string;
  timeSlot: string;
  clinicName: string;
  status: "Requested" | "Confirmed" | "Completed" | "Cancelled";
  amount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: "CUSTOMER" | "ADMIN";
}

interface AuthState {
  user: UserProfile | null;
  addresses: UserAddress[];
  orders: UserOrder[];
  appointments: UserAppointment[];
  isAuthenticated: boolean;

  // Actions
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addAddress: (address: Omit<UserAddress, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  createOrder: (order: Omit<UserOrder, "id" | "orderNumber" | "date">) => UserOrder;
  bookAppointment: (apt: Omit<UserAppointment, "id" | "bookingRef">) => UserAppointment;
}

const DEFAULT_USER: UserProfile = {
  id: "user-1",
  name: "Lohith Pahuja",
  email: "lohithpahuja03@gmail.com",
  phone: "+91 98765 43210",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  role: "CUSTOMER",
};

const DEFAULT_ADDRESSES: UserAddress[] = [
  {
    id: "addr-1",
    fullName: "Lohith Pahuja",
    phone: "+91 98765 43210",
    addressLine1: "Tower 4, Apt 12B, Palm Meadows",
    addressLine2: "Varthur Road, Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560066",
    isDefault: true,
  },
];

const DEFAULT_ORDERS: UserOrder[] = [
  {
    id: "ord-1",
    orderNumber: "PAW-2026-8941",
    date: "March 28, 2026",
    items: [
      {
        name: "Royal Canin Golden Retriever Adult Kibble (12kg)",
        quantity: 1,
        price: 7850,
        image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "KONG Classic Indestructible Natural Rubber Dog Toy",
        quantity: 2,
        price: 1150,
        image: "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=800&q=80",
      },
    ],
    total: 10150,
    status: "Delivered",
    paymentMethod: "UPI (Google Pay)",
    shippingAddress: DEFAULT_ADDRESSES[0],
  },
];

const DEFAULT_APPOINTMENTS: UserAppointment[] = [
  {
    id: "apt-1",
    bookingRef: "VET-98231",
    serviceName: "Essential Core Immunization & Deworming",
    petName: "Milo",
    petType: "Golden Retriever Puppy",
    date: "April 15, 2026",
    timeSlot: "11:00 AM - 11:30 AM",
    clinicName: "PawPetStore Wellness Center - Indiranagar",
    status: "Confirmed",
    amount: 1499,
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: DEFAULT_USER,
      isAuthenticated: true,
      addresses: DEFAULT_ADDRESSES,
      orders: DEFAULT_ORDERS,
      appointments: DEFAULT_APPOINTMENTS,

      login: (email, name = "Pet Parent") => {
        set({
          isAuthenticated: true,
          user: {
            id: `user-${Date.now()}`,
            name,
            email,
            phone: "+91 98765 00000",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
            role: "CUSTOMER",
          },
        });
      },

      logout: () => set({ isAuthenticated: false, user: null }),

      updateProfile: (profile) => {
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...profile } });
      },

      addAddress: (addressData) => {
        const id = `addr-${Date.now()}`;
        const newAddress: UserAddress = { ...addressData, id };
        set((state) => ({
          addresses: [...state.addresses, newAddress],
        }));
      },

      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        }));
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
      },

      createOrder: (orderData) => {
        const orderNumber = `PAW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const date = new Intl.DateTimeFormat("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).format(new Date());

        const newOrder: UserOrder = {
          ...orderData,
          id: `ord-${Date.now()}`,
          orderNumber,
          date,
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      bookAppointment: (aptData) => {
        const bookingRef = `VET-${Math.floor(10000 + Math.random() * 90000)}`;
        const newApt: UserAppointment = {
          ...aptData,
          id: `apt-${Date.now()}`,
          bookingRef,
        };

        set((state) => ({
          appointments: [newApt, ...state.appointments],
        }));

        return newApt;
      },
    }),
    {
      name: "pawpetstore-auth",
    }
  )
);
