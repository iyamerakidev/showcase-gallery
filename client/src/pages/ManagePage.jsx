import ProductForm from "../components/ProductForm";
import ProductGrid from "../components/ProductGrid";

function ManagePage({
  products,
  editingProduct,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <ProductForm
          key={editingProduct?._id || "new"}
          editingProduct={editingProduct}
          onSubmit={onSave}
          onCancel={onCancel}
        />

        <section>
          <h2 className="mb-5 text-2xl font-bold text-slate-900">
            Manage Products{" "}
            <span className="text-indigo-600">({products.length})</span>
          </h2>

          <ProductGrid
            products={products}
            showActions
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </section>
      </div>
    </main>
  );
}

export default ManagePage;
