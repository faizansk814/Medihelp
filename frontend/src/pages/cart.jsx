import {
  Box,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartGet, Dec, Incr } from "../redux/userReducer/action";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function Cart() {
  const data = useSelector((store) => store.userReducer.cart);
  const navigate=useNavigate()
  const [buttonState,setButton]=useState(false)
  let sum=0
  for(let i=0;i<data.length;i++){
    sum+=data[i].productid.price*data[i].quantity
  }
  const token = localStorage.getItem("token") || "";
  const dispatch = useDispatch();
  const handleinc=async (id)=>{
    const res=await dispatch(Incr(token,id))
    setButton(!buttonState)
    console.log(res)
    alert(res.msg)
  }
  const handleClick=()=>{
    localStorage.setItem("amount",sum)
    navigate("/payment")
  }
  const handledec=async (id)=>{
    const res=await dispatch(Dec(token,id))
    setButton(!buttonState)
    console.log(res)
    alert(res.msg)

  }
  useEffect(() => {
    dispatch(CartGet(token));
  }, [dispatch, token]);

  useEffect(() => {
    if(buttonState||!buttonState){
      dispatch(CartGet(token))
    }
  }, [dispatch, token,buttonState]);
  return (
    <Box>
      <Flex mx={"auto"} width={"90%"} mt={"20"} gap={"20"}>
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
                      my={"8"}
                      p={"6"}
                      borderWidth={"1px"}
                      borderColor={"gray.300"}
                      rounded={"md"}
                    >
                      <Box
                        mx={"4"}
                        maxW={{ base: "50%", lg: "10%" }}
                        maxH={{ base: "500", lg: "500" }}
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
                      <Box justifyContent={"flex-start"} mx={"6"}>
                        <Box>
                          <Text
                            fontSize={"lg"}
                            fontWeight={"semibold"}
                            textColor={"teal.700"}
                          >
                            {ele.productid.name}
                          </Text>
                          <Text
                            fontSize={"md"}
                            fontWeight={"semibold"}
                            textColor={"teal.400"}
                          >
                            {ele.productid.description}
                          </Text>
                        </Box>
                        <Flex w={"40"} justifyContent={"space-between"}>
                          <Text>MRP {ele.productid.price}</Text>
                          <Text> 48% OFF</Text>
                        </Flex>
                        <Text>Delivery by 14 Sep - 15 Sep</Text>
                        <Flex
                          my={"6"}
                          w={"28"}
                          justifyContent={"space-around"}
                          alignItems={"center"}
                        >
                          <Button onClick={()=>handledec(ele._id)}>-</Button>
                          <Text>{ele.quantity}</Text>
                          <Button onClick={()=>handleinc(ele._id)}>+</Button>
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
            w={"fit-content"}
            rounded={"sm"}
            borderWidth={"1px"}
            borderColor={"gray.300"}
            p={"6"}
          >
            <Box w={"md"}>
              <Text
                textColor="black"
                fontWeight={"semibold"}
                fontSize={"2xl"}
                my={"6"}
              >
                {sum.toFixed(2)}
              </Text>
              <Button
                // onClick={() => navigate("/cartpage")}
                textAlign={"center"}
                bg={"teal.500"}
                textColor={"white"}
                variant="solid"
                size="lg"
                w="100%"
                fontWeight={"semibold"}
                _hover={{ bg: "teal.700" }}
                onClick={handleClick}
              >
                Add Delivery Address
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{ marginLeft: "5px", fontSize: "16px" }}
                />
              </Button>
            </Box>
            <Flex
              p={"2"}
              rounded={"md"}
              shadow={"md"}
              bg={"teal.50"}
              my={"6"}
              w={"md"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Flex justifyContent={"space-between"} w={"40"}>
                <Image src="https://assets.pharmeasy.in/web-assets/images/cartCoupon.svg" />
                <Text
                  fontSize={"lg"}
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
            w={"fit-content"}
            rounded={"sm"}
            borderWidth={"1px"}
            borderColor={"gray.300"}
            p={"6"}
          >
            <Box w={"md"}></Box>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}

export default Cart;
