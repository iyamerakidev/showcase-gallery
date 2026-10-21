
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import GalleryPage from "./pages/GalleryPage";
import ManagePage from "./pages/ManagePage";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./api";

function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("gallery");
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => {
        setError(
          "Could not load products. Please refresh in a minute."
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const saveProduct = async (data) => {
    setError("");

    try {
      if (editingProduct) {
        const updated = await updateProduct(
          editingProduct._id,
          data
        );

        setProducts((prev) =>
          prev.map((product) =>
            product._id === updated._id
              ? updated
              : product
          )
        );

        setEditingProduct(null);
      } else {
        const created = await createProduct(data);

        setProducts((prev) => [created, ...prev]);
      }
    } catch (err) {
      setError(err.message || "Could not save the product.");
      throw err;
    }
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    setError("");

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );

      if (editingProduct?._id === id) {
        setEditingProduct(null);
      }
    } catch (err) {
      setError(err.message || "Could not delete the product.");
    }
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setView("manage");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar view={view} onChangeView={setView} />

      {error && (
        <div className="mx-auto mt-6 max-w-6xl rounded-xl bg-red-50 px-6 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {view === "gallery" ? (
        <GalleryPage
          products={products}
          loading={loading}
        />
      ) : (
        <ManagePage
          products={products}
          editingProduct={editingProduct}
          onSave={saveProduct}
          onCancel={() => setEditingProduct(null)}
          onEdit={startEdit}
          onDelete={removeProduct}
        />
      )}

      <footer className="py-10 text-center text-sm text-slate-400">
        Made by TABILIN - INF 232
      </footer>
    </div>
  );
}

export default App;
