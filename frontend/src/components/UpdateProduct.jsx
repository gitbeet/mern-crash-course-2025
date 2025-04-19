import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuPenLine } from "react-icons/lu";
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "./ui/toaster";
const UpdateProduct = ({ _id, name, price, image }) => {
  const [open, setOpen] = useState(false);
  const { updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState({
    _id,
    name,
    price,
    image,
  });

  const handleChangeTempFields = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(updatedProduct);
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
      setOpen(false);
    }
  };

  return (
    <>
      <Toaster />
      <Dialog.Root
        lazyMount
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        onExitComplete={() => setUpdatedProduct({ _id, name, price, image })}
      >
        <Dialog.Trigger>
          <IconButton>
            <LuPenLine />
          </IconButton>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>Update Product</Dialog.Header>
              <Dialog.Body>
                <VStack spaceY={2}>
                  <Input
                    type="text"
                    value={updatedProduct.name}
                    name="name"
                    onChange={handleChangeTempFields}
                  />
                  <Input
                    type="number"
                    value={updatedProduct.price}
                    name="price"
                    onChange={handleChangeTempFields}
                  />
                  <Input
                    type="text"
                    value={updatedProduct.image}
                    name="image"
                    onChange={handleChangeTempFields}
                  />
                </VStack>
              </Dialog.Body>
              <Dialog.Footer justifyContent={"center"}>
                <Button onClick={handleUpdateProduct}>Update</Button>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default UpdateProduct;
