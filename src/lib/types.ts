export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  display_order: number;
  image_url: string;
}

export interface ActiveIngredient {
  name: string;
  pct: string;
  role: string;
}

export interface Product {
  id: string;
  slug: string;
  category_id: string;
  name: string;
  subtitle?: string;
  description: string;
  short_description: string;
  price: number;
  compare_at_price?: number | null;
  stock: number;
  sku: string;
  volume: string;
  images: string[];
  active_ingredients: ActiveIngredient[];
  full_inci: string;
  usage_instructions: string[];
  benefits: string[];
  rating: number;
  review_count: number;
  is_featured: boolean;
  badge?: string | null;
  created_at?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount_percent: number;
  discount_amount: number;
  min_order_amount: number;
  is_active: boolean;
  expires_at?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  county: string; // Județ
  postalCode: string;
  country: string;
  phone: string;
}

export interface BillingAddress extends ShippingAddress {
  companyName?: string;
  cui?: string; // Cod Fiscal
  regCom?: string; // Nr. Reg. Comertului
}

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image?: string;
  unit_price: number;
  quantity: number;
  total_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  invoice_series: string;
  invoice_number: number;
  user_id?: string | null;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_intent_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: ShippingAddress;
  billing_address?: BillingAddress;
  subtotal: number;
  discount_amount: number;
  shipping_cost: number;
  tax_amount: number; // 19% TVA
  total: number;
  coupon_code?: string;
  notes?: string;
  invoice_url?: string;
  items: OrderItem[];
  created_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_name: string;
  rating: number;
  comment: string;
  verified_purchase: boolean;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: 'customer' | 'admin';
  created_at?: string;
}

export interface DiagnosticQuizAnswers {
  density: 'sparse' | 'overplucked' | 'asymmetric' | 'thinning';
  history: 'natural' | 'waxed_often' | 'laminated' | 'microbladed';
  sensitivity: 'normal' | 'sensitive' | 'very_sensitive';
  ageGroup: '18-25' | '26-35' | '36-50' | '50+';
}

export interface DiagnosticRecommendation {
  recommendedRoutine: string;
  primaryProductId: string;
  secondaryProductId?: string;
  bundleDiscountCode: string;
  discountPercent: number;
  dailyFrequency: number;
  estimatedBottleLifespanDays: number;
  targetTimelineWeeks: number;
  customProtocol: string[];
}

