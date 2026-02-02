import { Order, OrderItem } from './types';

export function validateOrder(order: Order): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // BUG: Missing validation for negative quantities
  // This should check: item.quantity > 0
  for (const item of order.items) {
    if (!item.product_id) {
      errors.push('Product ID is required');
    }
    // TODO: Add quantity validation here
  }

  // BUG: Missing validation for shipping address
  // This should check that shipping is not null/undefined
  if (!order.shipping.street) {
    errors.push('Shipping street is required');
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
