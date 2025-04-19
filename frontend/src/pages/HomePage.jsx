import { useEffect } from "react";
import Product from "../components/Product";
import { useProductStore } from "../store/product";
import { Button, Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { products, getAllProducts } = useProductStore();
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);
  const noProducts = products.length === 0;
  return (
    <Container
      maxW={"container.xl"}
      py={12}
    >
      <>
        {noProducts && (
          <VStack spaceY={2}>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              You have no products
            </Text>
            <Link to={"/create"}>
              <Button>Add your first product</Button>
            </Link>
          </VStack>
        )}
        {!noProducts && (
          <VStack spaceY={8}>
            <Text
              fontSize={"xl"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              Your products
            </Text>
            <SimpleGrid
              columns={{
                base: 1,
                md: 3,
                lg: 4,
              }}
              w={"full"}
              gap={4}
            >
              {products.map((product, i) => (
                <Product
                  key={i}
                  {...product}
                />
              ))}
            </SimpleGrid>
          </VStack>
        )}
      </>
    </Container>
  );
};

export default HomePage;
