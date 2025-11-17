export type UserRole = 'admin' | 'staff' | 'client'

export interface User {
  id: string
  email: string
  password: string
  role: UserRole
  name: string
}

export interface Appointment {
  id: string
  clientId: string
  clientName: string
  clientEmail: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  paymentMethod?: 'gcash' | 'cash'
  paymentStatus?: 'pending' | 'paid' | 'unpaid'
  notes?: string
  recommendedProducts?: string[] // Array of product IDs
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  category?: string
  createdAt: string
  updatedAt: string
}

export interface ProductPurchase {
  id: string
  clientId: string
  clientName: string
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
  purchaseDate: string
  paymentMethod?: 'gcash' | 'cash'
  paymentStatus?: 'pending' | 'paid' | 'unpaid'
  appointmentId?: string // Link to appointment if recommended
}

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderRole: UserRole
  receiverId?: string
  receiverName?: string
  message: string
  timestamp: string
  updatedAt?: string
  isSystem?: boolean
}

export interface ChatbotChoice {
  id: string
  label: string
  action: string
}

