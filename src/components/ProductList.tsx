
'use client';

import { useEffect, useState } from 'react';
interface Product {
  id: string;
  name: string;
  price: number;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          new URL('/api/products', window.location.origin)
        );

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: Product[] = await response.json();

        setProducts(data);
      } catch {
        setError('Unable to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <section>
      <h1>Products</h1>

      {products.length > 0 ? products.map((product) => (
        <article key={product.id}>
          <h2>{product.name}</h2>
          <p>${product.price.toFixed(2)}</p>
        </article>
      )) : (
        <p>No products available.</p>
      )}
    </section>
  );
}
