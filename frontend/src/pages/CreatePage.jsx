import { useState } from "react";
import { Toaster, toaster } from "../components/ui/toaster";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleCreateProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
      });
    }
    if (success) {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
      });
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <Toaster />
      <VStack spaceY={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          mb={8}
        >
          Create new product
        </Heading>
        <Box w={"full"}>
          <VStack spaceY={4}>
            <Input
              placeholder="iPad 12.9..."
              id="product-name"
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <Input
              placeholder="199.99"
              id="product-price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
            />
            <Input
              placeholder="http://www.unsplash.com/..."
              id="product-image-url"
              type="text"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  image: e.target.value,
                }))
              }
            />
            <Button onClick={handleCreateProduct}>Add product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
