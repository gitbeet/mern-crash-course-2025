import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields" };
    }
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (!response.ok) {
      return { success: false, message: "Error" };
    }
    // backend returns the product as a successfull response in format {success:boolean,data:Product}
    const data = response.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  getAllProducts: async () => {
    const response = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return { success: false, message: "Error" };
    }
    const data = await response.json();
    set(() => ({ products: data.data }));
  },
  updateProduct: async ({ _id, name, price, image }) => {
    console.log("from update product");
    const response = await fetch(`/api/products/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, image }),
    });
    if (!response.ok) {
      return { success: false, message: `Error: ${response.statusText}` };
    }
    const data = await response.json();
    set((state) => ({
      ...state,
      products: state.products.map((p) =>
        p._id === _id ? { ...p, name, price, image } : p
      ),
    }));
    return data;
  },
  deleteProduct: async (id) => {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { success: false, message: `Error: ${response.statusText}` };
    }
    const data = await response.json();
    set((state) => ({
      ...state,
      products: state.products.filter((p) => p._id !== id),
    }));
    return data;
  },
}));
