import express, { json } from "express";
import { connectDb } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

const app = express();
app.use(json());
app.use("/api/products", productRoutes);

app.listen(5000, () => {
  connectDb();
  console.log("Server started on port 5000");
});
