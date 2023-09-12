import React from "react";
import {
  Box,
  Image,
  Text,
  Button,
  VStack,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  AddToCart,
  CartGet,
  ParticularProduct,
} from "../redux/userReducer/action";
import {
  faShoppingCart,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Particular() {
  const { productid } = useParams();
  const navigate = useNavigate();
  const data = useSelector((store) => store.userReducer.cart);
  console.log(productid);
  const token = localStorage.getItem("token") || "";
  const product = useSelector((store) => store.userReducer.product);
  const [change, setChange] = useState(false);
  console.log(product);
  const handleClick = async () => {
    console.log("hi");
    const res = await dispatch(AddToCart(productid, token));
    console.log(res);
    if (res.msg === "product added to cart") {
      toast.success(res.msg);
    } else {
      toast.error(res.msg);
    }
    setChange(!change);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ParticularProduct(productid));
    dispatch(CartGet(token));
  }, [dispatch, productid, token]);
  useEffect(() => {
    if (change || !change) {
      dispatch(CartGet(token));
    }
  }, [dispatch, token, change]);
  return (
    <>
      <Navbar />
      <Flex mt={"20"} gap={"20"} mx={"40"}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Box
          w={"8xl"}
          display="flex"
          flexDirection={{ base: "column", lg: "row" }}
          alignItems={{ base: "center", lg: "center" }}
          justifyContent={{ base: "center", lg: "space-evenly" }}
          rounded="lg"
          bg="white"
        >
          <Box
            maxW={{ base: "100%", lg: "40%" }}
            maxH={{ base: "500", lg: "500" }}
            display="flex"
            boxShadow={"md"}
            p={"10"}
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

          <VStack
            spacing={9}
            p={"6"}
            w={"xl"}
            align={{ base: "center", lg: "flex-start" }}
            mt={{ base: 4, lg: 0 }}
            ml={{ base: 0, lg: 4 }}
          >
            <Text fontSize="2xl" fontWeight="semibold" color="teal.800">
              {product.name}
            </Text>
            <Text fontSize="lg" color="gray.600">
              {product.description}
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="teal.600">
              ${product.price}
            </Text>

            <Button
              bg={"teal.400"}
              _hover={{ bg: "teal.600" }}
              variant="solid"
              size="lg"
              w="100%"
              textColor={"white"}
              onClick={handleClick}
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                style={{ marginRight: "10px" }}
              />
              Add to Cart
            </Button>
          </VStack>
        </Box>
        <Box w={"2xl"}>
          <Text textColor={"teal.500"} fontSize={"xl"} my={"6"}>
            {data.length} Items In Carts
          </Text>
          <Button
            onClick={() => {
              navigate("/cart");
            }}
            textAlign={"center"}
            bg={"teal.500"}
            textColor={"white"}
            variant="solid"
            size="lg"
            w="100%"
            fontWeight={"semibold"}
            _hover={{ bg: "teal.700" }}
          >
            Cart Items
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ marginLeft: "5px", fontSize: "18px" }}
            />
          </Button>
        </Box>
      </Flex>
      <Divider my={"6"} borderColor="gray.300" borderWidth="4px" />
      <Footer />
    </>
  );
}

export default Particular;
