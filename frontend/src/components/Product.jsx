import { Box, Image, HStack, Text, IconButton } from "@chakra-ui/react";
import { Toaster, toaster } from "./ui/toaster";
import { LuPenLine, LuTrash } from "react-icons/lu";
import { useProductStore } from "../store/product";
import UpdateProduct from "./UpdateProduct";

const Product = ({ name, price, image, _id }) => {
  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async () => {
    const { success, message } = await deleteProduct(_id);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
      });
    }
    if (success) {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
      });
    }
  };
  return (
    <Box
      as={"article"}
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.2s"}
      _hover={{ shadow: "xl" }}
      position={"relative"}
      cursor={"pointer"}
    >
      <Toaster />
      <Image
        src={image}
        alt={name}
        w={"full"}
        objectFit={"cover"}
        aspectRatio={"square"}
      />
      <HStack
        p={4}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontWeight={"bold"}>{name}</Text>
        <Text fontWeight={"light"}>${price}</Text>
      </HStack>
      <HStack
        alignItems={"center"}
        position={"absolute"}
        top={2}
        right={2}
        zIndex={2}
      >
        <UpdateProduct {...{ name, price, image, _id }} />
        <IconButton onClick={handleDeleteProduct}>
          <LuTrash />
        </IconButton>
      </HStack>
    </Box>
  );
};

export default Product;
