import { Order, OrderItem } from './types';

export function validateOrder(order: Order): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // FIX: Validate shipping address exists before accessing properties
  if (!order.shipping) {
    errors.push('Shipping address is required');
  } else {
    if (!order.shipping.street) {
      errors.push('Shipping street is required');
    }
    if (!order.shipping.city) {
      errors.push('Shipping city is required');
    }
    if (!order.shipping.zip) {
      errors.push('Shipping zip code is required');
    }
  }

  // FIX: Validate items array exists and is not empty
  if (!order.items || order.items.length === 0) {
    errors.push('Order must contain at least one item');
  } else {
    for (const item of order.items) {
      if (!item.product_id) {
        errors.push('Product ID is required');
      }
      // FIX: Add quantity validation - must be positive integer
      if (typeof item.quantity !== 'number' || item.quantity <= 0) {
        errors.push(`Invalid quantity for product ${item.product_id || 'unknown'}: quantity must be greater than 0`);
      }
      // FIX: Add price validation - must be non-negative
      if (typeof item.price !== 'number' || item.price < 0) {
        errors.push(`Invalid price for product ${item.product_id || 'unknown'}: price must be non-negative`);
      }
    }
  }

  // FIX: Validate user_id exists
  if (!order.user_id) {
    errors.push('User ID is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function calculateTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

export async function createOrder(order: Order): Promise<{ order_id: string; total: number }> {
  const validation = validateOrder(order);

  if (!validation.valid) {
    throw new Error(`Order validation failed: ${validation.errors.join(', ')}`);
  }

  const total = calculateTotal(order.items);
  const order_id = `ORD-${Date.now()}`;

  return { order_id, total };
}
