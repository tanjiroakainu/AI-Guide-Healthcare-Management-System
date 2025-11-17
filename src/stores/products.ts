import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product, ProductPurchase } from '@/types'

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const purchases = ref<ProductPurchase[]>([])

  const LOW_STOCK_THRESHOLD = 10

  function loadProducts() {
    const stored = localStorage.getItem('products')
    if (stored) {
      products.value = JSON.parse(stored)
      updateProductStatuses()
    } else {
      // Initialize with sample products if no data exists
      initializeSampleProducts()
    }
  }

  function initializeSampleProducts() {
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Paracetamol 500mg',
        description: 'Pain reliever and fever reducer. Effective for headaches, muscle aches, and fever.',
        price: 25.00,
        quantity: 150,
        status: 'in_stock',
        category: 'Medicine',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Ibuprofen 400mg',
        description: 'Anti-inflammatory medication for pain relief, inflammation, and fever reduction.',
        price: 35.00,
        quantity: 120,
        status: 'in_stock',
        category: 'Medicine',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Amoxicillin 500mg',
        description: 'Antibiotic used to treat various bacterial infections.',
        price: 45.00,
        quantity: 8,
        status: 'low_stock',
        category: 'Medicine',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Blood Pressure Monitor',
        description: 'Digital automatic blood pressure monitor with large display and memory function.',
        price: 2500.00,
        quantity: 15,
        status: 'in_stock',
        category: 'Equipment',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Thermometer Digital',
        description: 'Fast and accurate digital thermometer for oral and underarm use.',
        price: 350.00,
        quantity: 5,
        status: 'low_stock',
        category: 'Equipment',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Vitamin C 1000mg',
        description: 'High potency vitamin C supplement to boost immune system and overall health.',
        price: 180.00,
        quantity: 0,
        status: 'out_of_stock',
        category: 'Supplements',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '7',
        name: 'Multivitamin Tablets',
        description: 'Complete daily multivitamin with essential vitamins and minerals for overall wellness.',
        price: 220.00,
        quantity: 85,
        status: 'in_stock',
        category: 'Supplements',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '8',
        name: 'Face Mask (Box of 50)',
        description: 'Disposable surgical face masks for protection against airborne particles.',
        price: 150.00,
        quantity: 12,
        status: 'low_stock',
        category: 'Medical Supplies',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '9',
        name: 'Hand Sanitizer 500ml',
        description: 'Alcohol-based hand sanitizer with 70% ethanol for effective hand hygiene.',
        price: 120.00,
        quantity: 200,
        status: 'in_stock',
        category: 'Medical Supplies',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '10',
        name: 'Glucometer Kit',
        description: 'Complete blood glucose monitoring kit with test strips and lancets included.',
        price: 1800.00,
        quantity: 25,
        status: 'in_stock',
        category: 'Equipment',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]
    
    products.value = sampleProducts
    updateProductStatuses()
    saveProducts()
  }

  function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products.value))
  }

  function updateProductStatuses() {
    products.value.forEach(product => {
      if (product.quantity === 0) {
        product.status = 'out_of_stock'
      } else if (product.quantity <= LOW_STOCK_THRESHOLD) {
        product.status = 'low_stock'
      } else {
        product.status = 'in_stock'
      }
    })
  }

  function addProduct(product: Omit<Product, 'id' | 'status' | 'createdAt' | 'updatedAt'>) {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      status: product.quantity === 0 ? 'out_of_stock' : (product.quantity <= LOW_STOCK_THRESHOLD ? 'low_stock' : 'in_stock'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    products.value.push(newProduct)
    updateProductStatuses()
    saveProducts()
    return newProduct
  }

  function updateProduct(id: string, updates: Partial<Product>) {
    const index = products.value.findIndex(p => p.id === id)
    if (index !== -1) {
      products.value[index] = {
        ...products.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      updateProductStatuses()
      saveProducts()
      return products.value[index]
    }
    return null
  }

  function deleteProduct(id: string) {
    const index = products.value.findIndex(p => p.id === id)
    if (index !== -1) {
      products.value.splice(index, 1)
      updateProductStatuses()
      saveProducts()
      return true
    }
    return false
  }

  function getProductById(id: string) {
    return products.value.find(p => p.id === id)
  }

  function loadPurchases() {
    const stored = localStorage.getItem('productPurchases')
    if (stored) {
      purchases.value = JSON.parse(stored)
    }
  }

  function savePurchases() {
    localStorage.setItem('productPurchases', JSON.stringify(purchases.value))
  }

  function addPurchase(purchase: Omit<ProductPurchase, 'id'>) {
    const newPurchase: ProductPurchase = {
      ...purchase,
      id: Date.now().toString(),
      paymentStatus: purchase.paymentStatus || 'pending'
    }
    purchases.value.push(newPurchase)
    
    // Update product quantity
    const product = getProductById(purchase.productId)
    if (product) {
      product.quantity = Math.max(0, product.quantity - purchase.quantity)
      updateProductStatuses()
      saveProducts()
    }
    
    savePurchases()
    return newPurchase
  }

  function updatePurchasePaymentStatus(id: string, paymentStatus: 'pending' | 'paid' | 'unpaid') {
    const index = purchases.value.findIndex(p => p.id === id)
    if (index !== -1) {
      purchases.value[index].paymentStatus = paymentStatus
      savePurchases()
      return purchases.value[index]
    }
    return null
  }

  function getPurchasesByClient(clientId: string) {
    return purchases.value.filter(p => p.clientId === clientId)
  }

  function getAllPurchases() {
    return purchases.value
  }

  const inStockProducts = computed(() => 
    products.value.filter(p => p.status === 'in_stock')
  )

  const lowStockProducts = computed(() => 
    products.value.filter(p => p.status === 'low_stock')
  )

  const outOfStockProducts = computed(() => 
    products.value.filter(p => p.status === 'out_of_stock')
  )

  loadProducts()
  loadPurchases()

  return {
    products,
    purchases,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    addPurchase,
    updatePurchasePaymentStatus,
    getPurchasesByClient,
    getAllPurchases,
    inStockProducts,
    lowStockProducts,
    outOfStockProducts,
    loadProducts,
    loadPurchases
  }
})

