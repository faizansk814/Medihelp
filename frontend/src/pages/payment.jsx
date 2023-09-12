import {
  Box,
  Button,
  GridItem,
  Heading,
  Input,
  Text,
  Grid,
  VStack,
  Flex,
  Tooltip,
  Textarea,
  Image,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartGet } from "../redux/userReducer/action";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Payment() {
  const navigate = useNavigate();
  const data = useSelector((store) => store.userReducer.cart);
  const [toggle, setToggle] = useState(false);
  const dispatch=useDispatch()
  const token = localStorage.getItem("token") || "";
  const amount = localStorage.getItem("amount") || 0;
  const handleOprnrazorPay = (data) => {
    const options = {
      key: "rzp_test_hcSytdmvy1pCRt",
      amount: Number(data.amount),
      currency: data.currency,
      order_id: data.id,
      name: "Pharmeasy CLONE", //
      description: "MY WEBSITE", //
      handler: function (response) {
        console.log(response, "56");
        axios
          .post(
            "https://medhelp.onrender.com/payment/verify",
            { response: response },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res, "37");
            // your orders
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleClick = () => {
    const amount = localStorage.getItem("amount") || 0;
    const _data = { amount: amount };
    axios
      .post(`https://medhelp.onrender.com/payment/orders`, _data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        handleOprnrazorPay(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    dispatch(CartGet(token));
  }, [dispatch, token]);
  return (
    <Box>
      <Navbar/>
      <Flex mx={"auto"} justifyContent={"center"} my={"36"}>
        <Grid
          p={"6"}
          width={"70%"}
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={8}
        >
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <VStack spacing={4} align="stretch">
              <Heading as="h1" size="lg">
                Payment Details
              </Heading>
              <Box>
                <Text>Name:</Text>
                <Input type="text" placeholder="Enter your Name" width="100%" />
              </Box>
              <Box>
                <Text>Email:</Text>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  width="100%"
                />
              </Box>
              <Box>
                <Text>Phone Number:</Text>
                <Input
                  onChange={() => setToggle(true)}
                  type="tel"
                  placeholder="Enter your phone number"
                  width="100%"
                />
              </Box>
              <Box>
                <Text>Address:</Text>
                <Textarea
                  onChange={() => setToggle(true)}
                  type="text"
                  placeholder="Enter your address"
                  width="100%"
                  isRequired
                />
              </Box>
              <Tooltip
                label="First Add Address And Mobile Number To Proceed"
                aria-label="Pay Now Razorpay"
              >
                <Button
                  isDisabled={!toggle}
                  onClick={handleClick}
                  colorScheme="teal"
                  size="lg"
                  width="100%"
                >
                  Pay Now
                </Button>
              </Tooltip>
            </VStack>
          </GridItem>

          <GridItem shadow={"md"} px={"10"} colSpan={{ base: 1, md: 1 }}>
            <VStack spacing={4}>
              <Button colorScheme="teal" size="md" width="100%">
                Order Summary
              </Button>
              <Box>
                <Text fontSize={"xl"} fontWeight={"bold"} color={"gray.900"}>
                  Total Items: {data.length}
                </Text>
              </Box>
              <Box>
                <Text fontSize={"2xl"} fontWeight={"bold"} color={"gray.900"}>
                  Total Amount to be Paid: ₹ {Number(amount).toFixed(2)}
                </Text>
              </Box>
              <Box>
                {data.map((ele, ind) => {
                  return (
                    <Box
                      key={ind}
                      width={{ base: "100%", md: "auto", lg: "100%" }}
                      borderWidth="1px"
                      borderColor="gray.300"
                      borderRadius="lg"
                      p="2"
                      mb="4"
                      display="flex"
                      flexDirection={{ base: "column", md: "row" }}
                      alignItems={{
                        base: "flex-start",
                        md: "center",
                        lg: "center",
                      }}
                    >
                      <Box
                        maxW={{ base: "100%", md: "150px" }}
                        alignSelf="flex-start"
                        mb={{ base: "4", md: "0" }}
                      >
                        <Image
                          alignItems={"center"}
                          w={"full"}
                          maxH={"12"}
                          src={ele.productid.image}
                          alt={ele.productid.name}
                          borderRadius="md"
                        />
                      </Box>
                      <Flex
                        flex="1"
                        flexDirection="row"
                        justifyContent="space-between"
                        ml={{ base: "0", md: "4" }}
                      >
                        <Box>
                          <Text fontSize="lg" fontWeight="semibold" mb="2">
                            {ele.productid.name}
                          </Text>
                          <Text fontSize="md" mb="2">
                            Quantity: {ele.quantity}
                          </Text>
                        </Box>
                        <Text fontSize="md" color="teal.700">
                          Price: {ele.productid.price}
                        </Text>
                      </Flex>
                    </Box>
                  );
                })}
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Flex>
      <Divider my={"6"} borderColor="gray.300" borderWidth="4px" />
      <Footer/>
    </Box>
  );
}

export default Payment;
