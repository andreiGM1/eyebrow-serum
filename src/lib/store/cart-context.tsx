'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Coupon } from '@/lib/types';
import { INITIAL_COUPONS } from '@/lib/data';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  taxAmount: number;
  total: number;
  totalItemsCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('evergrow_cart');
      const savedCoupon = localStorage.getItem('evergrow_coupon');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      if (savedCoupon) {
        setAppliedCoupon(JSON.parse(savedCoupon));
      }
    } catch {
      // Fallback
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('evergrow_cart', JSON.stringify(items));
      if (appliedCoupon) {
        localStorage.setItem('evergrow_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('evergrow_coupon');
      }
    } catch {
      // Ignore storage errors
    }
  }, [items, appliedCoupon, isInitialized]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        const newQty = Math.min(product.stock, existing.quantity + quantity);
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { product, quantity: Math.min(product.stock, quantity) }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const clamped = Math.min(item.product.stock, quantity);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = INITIAL_COUPONS.find(
      (c) => c.code.toUpperCase() === cleanCode && c.is_active
    );

    if (!found) {
      return { success: false, message: 'Cod de cupon invalid sau expirat.' };
    }

    if (subtotal < found.min_order_amount) {
      return {
        success: false,
        message: `Acest cupon necesită o comandă minimă de ${found.min_order_amount} RON.`,
      };
    }

    setAppliedCoupon(found);
    return {
      success: true,
      message: `Cuponul ${found.code} (-${found.discount_percent}%) a fost aplicat cu succes!`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const discountAmount = appliedCoupon
    ? appliedCoupon.discount_percent > 0
      ? (subtotal * appliedCoupon.discount_percent) / 100
      : appliedCoupon.discount_amount
    : 0;

  // Free shipping over 200 RON, otherwise 19 RON
  const shippingCost = subtotal === 0 ? 0 : subtotal - discountAmount >= 200 ? 0 : 19.0;

  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  // Romanian TVA is 19% included
  const taxAmount = Number(((total * 19) / 119).toFixed(2));

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingCost,
        taxAmount,
        total,
        totalItemsCount,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

