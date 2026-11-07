'use client';

import { useState, useEffect } from 'react';
import { Product, Order, OrderStatus } from '@/lib/types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '@/lib/data';

const PRODUCTS_STORAGE_KEY = 'evergrow_products_v1';
const ORDERS_STORAGE_KEY = 'evergrow_orders_v1';

export function getStoredProducts(): Product[] {
  if (typeof window === 'undefined') return INITIAL_PRODUCTS;
  try {
    const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // fallback
  }
  return INITIAL_PRODUCTS;
}

export function saveStoredProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch {
    // ignore
  }
}

export function getStoredOrders(): Order[] {
  if (typeof window === 'undefined') return INITIAL_ORDERS;
  try {
    const data = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch {
    // fallback
  }
  return INITIAL_ORDERS;
}

export function saveStoredOrders(orders: Order[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // ignore
  }
}

export function addOrderToStore(order: Order): void {
  const currentOrders = getStoredOrders();
  const updatedOrders = [order, ...currentOrders];
  saveStoredOrders(updatedOrders);

  // Decrement stock for ordered items
  const currentProducts = getStoredProducts();
  const updatedProducts = currentProducts.map((p) => {
    const orderedItem = order.items.find((item) => item.product_id === p.id);
    if (orderedItem) {
      return { ...p, stock: Math.max(0, p.stock - orderedItem.quantity) };
    }
    return p;
  });
  saveStoredProducts(updatedProducts);
}

export function useProductsStore() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProducts(getStoredProducts());
    setOrders(getStoredOrders());
    setIsLoaded(true);
  }, []);

  const addProduct = (product: Omit<Product, 'id' | 'created_at'>) => {
    const newProduct: Product = {
      ...product,
      id: `p-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    const updated = [newProduct, ...products];
    setProducts(updated);
    saveStoredProducts(updated);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p));
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    setOrders(updated);
    saveStoredOrders(updated);
  };

  return {
    products,
    orders,
    isLoaded,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
  };
}
