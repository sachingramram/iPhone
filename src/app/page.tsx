"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

type CartItem = {
  product: Product;
  quantity: number;
};

const mockProducts: Product[] = [
  
  {
    id: "1",
    name: "iPhone 14 Pro",
    description: "6.1-inch Super Retina XDR display, A16 Bionic chip",
    price: 999,
    image: "https://www.91-img.com/gallery_images_uploads/4/f/4f8692f6895152a999bc453f3d9049bc34b76ae0.jpg",
  },
  {
    id: "2",
    name: "iPhone 14",
    description: "6.1-inch display, A15 Bionic chip",
    price: 799,
    image: "https://www.91-img.com/gallery_images_uploads/2/5/252ea8359e6d32874ef6dc7fd59c9660138619f6.JPG",
  },
  {
    id: "3",
    name: "iPhone 14 Pro Max",
    description: "6.7-inch display, A16 Bionic chip",
    price: 399,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-pro-max-1.jpg",
  },
  {
    id: "4",
    name: "iPhone 14 Plus",
    description: "6.7-inch display, A15 Bionic chip",
    price: 899,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-plus-1.jpg",
  },
  {
    id: "5",
    name: "iPhone 13",
    description: "6.1-inch display, A15 Bionic chip",
    price: 699,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-5.jpg",
  },
  {
    id: "6",
    name: "iPhone 13 Pro",
    description: "6.1-inch ProMotion display, A15 Bionic chip",
    price: 999,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-01.jpg",
  },
  {
    id: "7",
    name: "iPhone 13 Pro Max",
    description: "6.7-inch display, A15 Bionic chip",
    price: 1099,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-max-1.jpg",
  },
  {
    id: "8",
    name: "iPhone SE (3rd Gen)",
    description: "4.7-inch Retina HD display, A15 Bionic chip",
    price: 429,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-se-2022-1.jpg",
  },
  {
    id: "9",
    name: "iPhone 12",
    description: "6.1-inch display, A14 Bionic chip",
    price: 599,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-r1.jpg",
  },
  {
    id: "10",
    name: "iPhone 11",
    description: "6.1-inch display, A13 Bionic chip",
    price: 499,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-1.jpg",
  },
  {
    id: "11",
    name: "iPhone X",
    description: "5.8-inch OLED display, A11 Bionic chip",
    price: 499,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg",
  },
  {
    id: "12",
    name: "iPhone XR",
    description: "6.1-inch Liquid Retina display, A12 Bionic chip",
    price: 399,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-xr-2.jpg",
  },
  {
    id: "13",
    name: "iPhone XS",
    description: "5.8-inch OLED, A12 Bionic chip",
    price: 999,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-01.jpg",
  },
  {
    id: "14",
    name: "iPhone 15 Pro",
    description: "6.1-inch Super Retina XDR, A17 Pro chip",
    price: 999,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg",
  },
  {
    id: "15",
    name: "iPhone 15 Pro Max",
    description: "6.7-inch Super Retina XDR, A17 Pro chip",
    price: 1199,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg",
  },
  {
    id: "16",
    name: "iPhone 15",
    description: "6.1-inch display, A16 Bionic chip",
    price: 799,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg",
  },
  {
    id: "17",
    name: "iPhone 15 Plus",
    description: "6.7-inch display, A16 Bionic chip",
    price: 899,
    image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-plus-1.jpg",
  },


];

export default function HomePage() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  if (status === "loading") {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!session) {
    return (
      <main className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="mb-4">Welcome to iPhone Store</h1>
        <button className="btn btn-danger mb-3" onClick={() => signIn("google")}>
          Sign in with Google
        </button>
      </main>
    );
  }

  function handleAddToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev;
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  }

  function handleRemoveFromCart(productId: string) {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }

  async function handleBuyNow(product: Product) {
    const res = await fetch("/api/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        productName: product.name,
      }),
    });

    if (res.ok) {
      alert(`🎉 ${product.name} added to your purchases!`);
      setCart((prev) => prev.filter((item) => item.product.id !== product.id));
    } else {
      alert("Something went wrong!");
    }
  }

  async function handleBuyAll() {
    if (cart.length === 0) return;
    try {
      for (const item of cart) {
        const res = await fetch("/api/purchase", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: item.product.id,
            productName: item.product.name,
          }),
        });
        if (!res.ok) throw new Error("Failed to buy " + item.product.name);
      }
      alert("🎉 All items purchased successfully!");
      setCart([]);
      setShowCart(false);
    } catch (err) {
  console.error(err);
  // ya alert(err.message);
  alert("Something went wrong while purchasing all items.");
}
  }

  const isCartNotEmpty = cart.length > 0;

  return (
    <main className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Welcome, {session.user?.name}</h1>
        <Link href="/my-orders" passHref>
          <button className="btn btn-outline-success rounded-pill px-4 py-2 shadow me-2">
            My Orders
          </button>
        </Link>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <button
            className="btn btn-outline-primary position-relative"
            onClick={() => setShowCart(!showCart)}
          >
            🛒 Cart
            {isCartNotEmpty && (
              <span
                className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
                style={{ width: 12, height: 12 }}
              ></span>
            )}
          </button>
        </div>
        <button onClick={() => signOut()} className="btn btn-secondary">
          Logout
        </button>
      </div>

      {/* Products List */}
      <div className="row">
        {mockProducts.map((product) => {
          const inCart = cart.some((item) => item.product.id === product.id);
          return (
            <div key={product.id} className="col-md-6 mb-4">
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ objectFit: "contain", height: "300px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text flex-grow-1">{product.description}</p>
                  <p className="card-text fw-bold">${product.price}</p>
                  <div className="d-flex gap-2">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="btn btn-primary flex-grow-1"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn btn-outline-success flex-grow-1"
                      disabled={inCart}
                    >
                      {inCart ? "In Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowCart(false)}
        >
          <div
            className="modal-dialog modal-dialog-scrollable"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Your Cart</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCart(false)}
                ></button>
              </div>
              <div className="modal-body">
                {cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <ul className="list-group">
                    {cart.map((item) => (
                      <li
                        key={item.product.id}
                        className="list-group-item d-flex align-items-center"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          style={{ width: 60, height: 60, objectFit: "contain" }}
                          className="me-3"
                        />
                        <div className="flex-grow-1">
                          <h6>{item.product.name}</h6>
                          <p className="mb-1">{item.product.description}</p>
                          <p className="mb-1 fw-bold">
                            ${item.product.price.toFixed(2)}
                          </p>
                          <button
                            className="btn btn-sm btn-danger mt-2"
                            onClick={() => handleRemoveFromCart(item.product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowCart(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-success"
                  disabled={cart.length === 0}
                  onClick={handleBuyAll}
                >
                  Buy All Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
