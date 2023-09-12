import {
  Box,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
  Flex,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartGet, Dec, Delete, Incr } from "../redux/userReducer/action";
import { faChevronRight,faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Cart() {
  const data = useSelector((store) => store.userReducer.cart);
  const navigate = useNavigate();
  const [buttonState, setButton] = useState(false);
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].productid.price * data[i].quantity;
  }
  const token = localStorage.getItem("token") || "";
  const dispatch = useDispatch();
  const handleinc = async (id) => {
    const res = await dispatch(Incr(token, id));
    setButton(!buttonState);
    console.log(res);
  };
  const handledelete=async (id)=>{
    const res = await dispatch(Delete(token, id));
    setButton(!buttonState);
    console.log(res);
  }
  const handleClick = () => {
    localStorage.setItem("amount", sum);
    navigate("/payment");
  };
  const handledec = async (id) => {
    const res = await dispatch(Dec(token, id));
    setButton(!buttonState);
    console.log(res);
  };
  useEffect(() => {
    dispatch(CartGet(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (buttonState || !buttonState) {
      dispatch(CartGet(token));
    }
  }, [dispatch, token, buttonState]);
  return (
    <Box>
      <Navbar/>
      <Flex
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        mx={"auto"}
        width={"90%"}
        mt={"20"}
        gap={"20"}
      >
        <Box width={"70%"}>
          <Box>
            <Heading textColor={"teal.800"} fontSize={"2xl"}>
              {data.length} Items in your Cart
            </Heading>
            <Box>
              {data.map((ele, i) => {
                return (
                  <Box key={i}>
                    <Flex
                      flexDir={{ base: "column", lg: "row" }}
                      my={"8"}
                      p={"6"}
                      borderWidth={"1px"}
                      borderColor={"gray.300"}
                      rounded={"md"}
                    >
                      <Box
                        mx={"4"}
                        maxW={{ base: "100%", lg: "10%" }}
                        maxH={{ base: "auto", lg: "500px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        overflow="hidden"
                        rounded="lg"
                      >
                        <Image
                          src={ele.productid.image}
                          alt={ele.productid.name}
                          maxH="100%"
                          objectFit="cover"
                        />
                      </Box>
                      <Box
                        justifyContent={"flex-start"}
                        mx={{ base: "0", lg: "6" }}
                      >
                        <Box>
                          <Flex
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Text
                              fontSize={"lg"}
                              fontWeight={"semibold"}
                              textColor={"teal.700"}
                            >
                              {ele.productid.name}
                            </Text>
                            <FontAwesomeIcon
                              cursor={"pointer"}
                              style={{ padding: "4px", color: "teal" }}
                              icon={faTrashCan}
                              onClick={() => handledelete(ele._id)}
                            />
                          </Flex>

                          <Text
                            fontSize={"md"}
                            fontWeight={"semibold"}
                            textColor={"teal.400"}
                            display={{ base: "none", lg: "block" }}
                          >
                            {ele.productid.description}
                          </Text>
                        </Box>
                        <Flex
                          w={{ base: "100%", lg: "40%" }}
                          justifyContent={"space-between"}
                        >
                          <Text>MRP {ele.productid.price}</Text>
                          <Text>48% OFF</Text>
                        </Flex>
                        <Text>Delivery by 14 Sep - 15 Sep</Text>
                        <Flex my={"6"} w={"100%"} alignItems={"center"}>
                          <Button
                            variant={"solid"}
                            _hover={{ bg: "teal.700" }}
                            size={"sm"}
                            textColor={"white"}
                            bg={"teal.400"}
                            onClick={() => handledec(ele._id)}
                          >
                            -
                          </Button>
                          <Text fontWeight={"bold"} px={"2"}>
                            {ele.quantity}
                          </Text>
                          <Button
                            _hover={{ bg: "teal.700" }}
                            size={"sm"}
                            textColor={"white"}
                            bg={"teal.400"}
                            onClick={() => handleinc(ele._id)}
                          >
                            +
                          </Button>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        <VStack border={"1px"}>
          <Box
            w={{ base: "100%", md: "fit-content" }}
            rounded={"sm"}
            borderWidth={"1px"}
            borderColor={"gray.300"}
            p={{ base: "4", md: "6" }}
          >
            <Box w={{ base: "100%", md: "md" }}>
              <Text
                textColor="black"
                fontWeight={"semibold"}
                fontSize={{ base: "lg", md: "2xl" }}
                my={"4"}
              >
                Cart total: ₹ {sum.toFixed(2)}
              </Text>
              <Button
                // onClick={() => navigate("/cartpage")}
                textAlign={"center"}
                bg={"teal.500"}
                textColor={"white"}
                variant="solid"
                size={{ base: "md", md: "lg" }}
                w="100%"
                fontWeight={"semibold"}
                _hover={{ bg: "teal.700" }}
                onClick={handleClick}
              >
                Checkout
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{ marginLeft: "5px", fontSize: "16px" }}
                />
              </Button>
            </Box>
            <Flex
              p={{ base: "2", md: "4" }}
              rounded={"md"}
              shadow={"md"}
              bg={"teal.50"}
              my={"4"}
              w={{ base: "100%", md: "md" }}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex justifyContent={"space-between"} w={"40"}>
                <Image src="https://assets.pharmeasy.in/web-assets/images/cartCoupon.svg" />
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  textColor={"teal.700"}
                  fontWeight={"medium"}
                >
                  Apply Coupon
                </Text>
              </Flex>
              <FontAwesomeIcon icon={faChevronRight} />
            </Flex>
          </Box>
          <Box
            w={{ base: "100%", md: "fit-content" }}
            rounded={"sm"}
            borderWidth={"1px"}
            borderColor={"gray.300"}
            p={{ base: "4", md: "6" }}
          >
            <Box w={{ base: "100%", md: "md" }}> </Box>
          </Box>
        </VStack>
      </Flex>
      <Divider my={"6"} borderColor="gray.300" borderWidth="4px" />
      <Footer/>
    </Box>
  );
}

export default Cart;
