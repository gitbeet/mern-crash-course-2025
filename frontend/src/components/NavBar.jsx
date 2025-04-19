import {
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { useColorMode } from "./ui/color-mode";
import { LuMoon, LuPlus, LuSun } from "react-icons/lu";
const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Container
      maxW={1140}
      px={4}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justify={"space-between"}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
        >
          <Link to="/">mernstore</Link>
        </Text>
        <HStack
          spaceX={1}
          alignItems={"center"}
        >
          <Link to="/create">
            <IconButton size={"sm"}>
              <LuPlus />
            </IconButton>
          </Link>
          <IconButton
            onClick={toggleColorMode}
            variant="outline"
            size={"sm"}
          >
            {colorMode === "light" ? <LuSun /> : <LuMoon />}
          </IconButton>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;
