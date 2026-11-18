'use client';
import { useState } from 'react';
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isOnSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  return (
    <article>
      <img
        src={product.imageUrl}
        alt={product.name}
      />

      <h2>{product.name}</h2>

      <p>${product.price.toFixed(2)}</p>

      {product.isOnSale? (
        <span>On Sale</span>
      ): <span> Not On Sale</span>}

      <button
        onClick={() => {
          onAddToCart(product.id)
          setAddedToCart(true);
        }}
      >
        {addedToCart ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </article>
  );
}