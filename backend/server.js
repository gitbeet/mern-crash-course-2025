import express, { json } from "express";
import { connectDb } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(json());
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server started on port ${PORT}`);
});
