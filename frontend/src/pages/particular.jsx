import React from "react";
import { Box, Image, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ParticularProduct } from "../redux/userReducer/action";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/navbar";

function Particular() {
  const { productid } = useParams();
  console.log(productid);
  const product = useSelector((store) => store.userReducer.product);
  console.log(product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ParticularProduct(productid));
  }, [dispatch, productid]);
  return (
    <>
    <Navbar/>
      <Box
        display="flex"
        flexDirection={{ base: "column", lg: "row" }}
        alignItems={{ base: "center", lg: "center" }}
        justifyContent={{ base: "center", lg: "space-evenly" }}
        p={4}
        rounded="lg"
        bg="white"
        mx="auto"
        mt={"28"}
      >
        {/* Product Image */}
        <Box
          maxW={{ base: "100%", lg: "50%" }}
          height={{ base: "auto", lg: "500px" }}
          display="flex"
          boxShadow={"md"}
          alignItems="center"
          justifyContent="center"
          overflow="hidden"
          rounded="lg"
        >
          <Image
            src={product.image}
            alt={product.name}
            maxH="100%"
            objectFit="cover"
          />
        </Box>

        {/* Product Information */}
        <VStack
          spacing={4}
          w={"xl"}
          align={{ base: "center", lg: "flex-start" }}
          mt={{ base: 4, lg: 0 }}
          ml={{ base: 0, lg: 4 }}
        >
          <Text fontSize="2xl" fontWeight="semibold" color="gray.800">
            {product.name}
          </Text>
          <Text fontSize="lg" color="gray.600">
            {product.description}
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            ${product.price}
          </Text>

          {/* Add to Cart Button */}
          <Button colorScheme="blue" variant="solid" size="lg" w="100%">
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ marginRight: "10px" }}
            />
            Add to Cart
          </Button>
        </VStack>
      </Box>
    </>
  );
}

export default Particular;
