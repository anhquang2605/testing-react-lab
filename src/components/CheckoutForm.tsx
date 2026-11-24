'use client';

import { useState } from 'react';

interface CheckoutFormProps {
  total: number;
}

interface CheckoutData {
  name: string;
  email: string;
  address: string;
}

export default function CheckoutForm({ total }: CheckoutFormProps) {
  const [form, setForm] = useState<CheckoutData>({
    name: '',
    email: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleFetch = async (data: CheckoutData) => {
    try {
      const response = await fetch  (new URL('/api/checkout', window.location.origin), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          total,
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      setMessage('Order placed successfully!');
    } catch {
      setMessage('Unable to place your order. Please try again.');
    } finally {
      setLoading(false);
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      setMessage('All fields are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMessage('Please enter a valid email.');
      return;
    }

    setLoading(true);
    setMessage('');
    await handleFetch(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Checkout</h1>

      <label htmlFor="name">Customer name</label>
      <input
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />

      <label htmlFor="address">Shipping address</label>
      <input
        id="address"
        name="address"
        value={form.address}
        onChange={handleChange}
      />

      <p>Total: ${total.toFixed(2)}</p>

      <button type="submit" disabled={loading}>
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>

      {message && <p role="status">{message}</p>}
    </form>
  );
}