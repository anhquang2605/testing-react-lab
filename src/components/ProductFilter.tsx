'use client';

import { useState } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: '1', name: 'Wireless Gaming Mouse', price: 29.99 },
  { id: '2', name: 'Mechanical Keyboard', price: 79.99 },
  { id: '3', name: 'Gaming Headset', price: 49.99 },
  { id: '4', name: 'USB Microphone', price: 39.99 },
];

export default function ProductFilter() {
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <h1>Products</h1>

      <label htmlFor="product-search">Search products</label>

      <input
        id="product-search"
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search products..."
      />

      <ul>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <li key={product.id}>
              {product.name} - ${product.price.toFixed(2)}
            </li>
          ))
        ) : (
          <li>No products found.</li>
        )}
      </ul>
    </section>
  );
}