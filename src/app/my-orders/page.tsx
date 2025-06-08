"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Purchase {
  _id: string;
  productId: string;
  productName: string;
  userEmail: string;
  userName: string;
  createdAt: string;
}

const MyOrdersPage = () => {
  const { data: session, status } = useSession();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetchPurchases();
    } else {
      setLoading(false);
    }
  }, [status]);

  async function fetchPurchases() {
    setLoading(true);
    try {
      const res = await fetch("/api/purchase");
      const data = await res.json();
      setPurchases(data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this order?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/purchase?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPurchases((prev) => prev.filter((order) => order._id !== id));
      } else {
        const err = await res.json();
        alert(err.error || "Failed to delete order");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Something went wrong while deleting");
    }
    setDeletingId(null);
  }

  if (status === "loading" || loading) return <p>Loading...</p>;
  if (status === "unauthenticated") return <p>Please login to see your orders.</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">📦 My Orders</h1>
      {purchases.length === 0 ? (
        <p>You have no purchases yet.</p>
      ) : (
        <table className="table table-bordered table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>Product Name</th>
              <th>Purchase Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((order) => (
              <tr key={order._id}>
                <td>{order.productName}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    disabled={deletingId === order._id}
                    onClick={() => handleDelete(order._id)}
                    className="btn btn-danger btn-sm"
                  >
                    {deletingId === order._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrdersPage;
