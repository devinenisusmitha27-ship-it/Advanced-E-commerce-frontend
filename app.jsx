import React, { useState, useMemo } from "react";
import { CartProvider, useCart } from "./CartContext";
import { products as allProducts } from "./data";

function Header({ onSearch }) {
  const { cart } = useCart();
  return (
    <header className="sticky top-0 bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-teal-600">ShopSmart</h1>
      <input
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search..."
        className="border rounded px-3 py-1 w-1/2"
      />
      <div className="relative">
        🛒
        <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
          {cart.length}
        </span>
      </div>
    </header>
  );
}

function ProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <div className="bg-white rounded-lg shadow p-3 flex flex-col hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.title}
        className="rounded mb-3 h-40 object-cover"
      />
      <h2 className="font-semibold text-sm">{product.title}</h2>
      <p className="text-gray-500 text-xs">{product.category}</p>
      <div className="mt-auto flex justify-between items-center">
        <span className="font-bold text-teal-600">₹{product.price}</span>
        <button
          onClick={() => addItem(product)}
          className="bg-teal-500 text-white text-xs px-2 py-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}

function CartDrawer() {
  const { cart, total, updateQty, removeItem, clear } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg"
      >
        View Cart ({cart.length})
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-end">
          <div className="bg-white w-full sm:w-96 h-full p-4 flex flex-col">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <button onClick={() => setOpen(false)}>❌</button>
            </div>

            <div className="flex-1 overflow-auto">
              {cart.length === 0 && (
                <p className="text-center text-gray-500 mt-4">Cart is empty</p>
              )}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      ₹{item.price} × {item.qty}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="border px-2"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="border px-2"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-xs"
                    >
                      ✖
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-3">
              <p className="font-semibold">Total: ₹{total.toFixed(2)}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={clear}
                  className="border rounded px-3 py-1 text-sm"
                >
                  Clear
                </button>
                <button className="bg-teal-600 text-white rounded px-3 py-1 text-sm flex-1">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return allProducts.filter((p) =>
      (p.title + p.category).toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <CartProvider>
      <Header onSearch={setQuery} />
      <main className="max-w-6xl mx-auto p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </main>
      <CartDrawer />
    </CartProvider>
  );
}
