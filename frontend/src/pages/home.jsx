import {
  Box,
  Flex,
  Text,
  Image,
  Grid,
  Heading,
  Button,
  Divider,
} from "@chakra-ui/react";
import Navbar from "../components/navbar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductData } from "../redux/userReducer/action";
import Footer from "../components/footer";

function Home() {
  const store = useSelector((store) => store.userReducer.data);
  console.log(store);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductData());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <br />
      <Carousel
        showStatus={false}
        infiniteLoop={true}
        swipeable={true}
        autoPlay={true}
        showThumbs={false}
      >
        <div>
          <Image
            src="https://mercury.akamaized.net/i/8888c916299ab7d5ff8fb36ba1d99f21_200696_0.jpeg"
            alt="Image"
          />
        </div>
        <div>
          <Image
            src="https://mercury.akamaized.net/i/1e961d351472f0e6652e2ee4bc738b94_201602_0.jpg"
            alt="Image"
          />
        </div>
        <div>
          <Image
            src="https://mercury.akamaized.net/i/438a6543f1dbf1d55fa5438637402841_201575_0.jpg"
            alt="Image"
          />
        </div>
      </Carousel>
      <Divider my={"6"} borderColor="gray.300" borderWidth="4px" />
      <Grid
        mt={"3"}
        ml={"10"}
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        }}
        gap={"10"}
      >
        <Flex boxShadow={"xl"} rounded={"2xl"}>
          <img
            src="https://www.netmeds.com/assets/gloryweb/images/icons/ordermedicinnew.svg"
            alt=""
          />
          <Box pl={"5"} pt={"3"}>
            <Text fontWeight={"bold"}>Order Medicine</Text>
            <Text color={"green.300"}>Save Upto 25%</Text>
          </Box>
        </Flex>
        <Flex boxShadow={"xl"} rounded={"2xl"}>
          <img
            src="https://www.netmeds.com/assets/gloryweb/images/icons/Beautynew.svg"
            alt=""
          />
          <Box pl={"5"} pt={"3"}>
            <Text fontWeight={"bold"}>Beauty</Text>
            <Text color={"green.300"}>Save Upto 25%</Text>
          </Box>
        </Flex>
        <Flex boxShadow={"xl"} rounded={"2xl"}>
          <img
            src="https://www.netmeds.com/assets/gloryweb/images/icons/Wellnessnew.svg"
            alt=""
          />
          <Box pl={"5"} pt={"3"}>
            <Text fontWeight={"bold"}>Wellness</Text>
            <Text color={"green.300"}>Save Upto 25%</Text>
          </Box>
        </Flex>
      </Grid>
      <Divider my={"6"} borderColor="gray.300" borderWidth="4px" />
      <Grid
        templateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
        }}
        mt={"10"}
      >
        <Box>
          <Image
            src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1692971075_Vitaminsddddd.jpg"
            rounded={"lg"}
          />
        </Box>
        <Box>
          <Image
            src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1692970962_Fitness_Mini-banner_web.jpg"
            rounded={"lg"}
          />
        </Box>
        <Box>
          <Image
            src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1692970993_Ayurvedic_Mini_web.jpg"
            rounded={"lg"}
          />
        </Box>
      </Grid>
      <Divider my={"6"} borderColor="gray.300" borderWidth="4px" />
      <Text
        mt={"10"}
        fontFamily={"cursive"}
        fontSize={"2xl"}
        fontWeight={"bold"}
      >
        Shop By Category
      </Text>
      <Grid
        width={"90%"}
        margin={"auto"}
        mt={"5"}
        templateColumns={{
          base: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
          lg: "repeat(5,1fr)",
        }}
      >
        <Box>
          <Image
            src="https://www.netmeds.com/images/category/prod/thumb/ayush.png"
            rounded={"lg"}
          />
        </Box>
        <Box>
          <Image
            src="https://www.netmeds.com/images/category/prod/thumb/hair_care.png"
            rounded={"lg"}
          />
        </Box>
        <Box>
          <Image
            src="https://www.netmeds.com/images/category/v1/525/thumb/body_care_4.png"
            rounded={"lg"}
          />
        </Box>
        <Box>
          <Image
            src="https://www.netmeds.com/images/category/prod/thumb/treatments.png"
            rounded={"lg"}
          />
        </Box>
        <Box>
          <Image
            src="https://www.netmeds.com/images/category/prod/thumb/cold_and_fever.png"
            rounded={"lg"}
          />
        </Box>
      </Grid>
      <Divider my={"6"} borderColor="gray.300" borderWidth="4px" />
      <Flex
        flexDirection={{ base: "column", md: "column", lg: "row" }}
        justifyContent={"center"}
        gap={"10"}
        rounded={"5"}
        alignItems={"center"}
        shadow={"sm"}
      >
        <Box display={"grid"} gap={"5"}>
          <Flex
            bg={"teal.500"}
            textColor={"white"}
            rounded={"3xl"}
            px={"5"}
            alignItems={"center"}
            justifyContent={"space-between"}
            shadow={"sm"}
          >
            <Box p={"2"}>
              <Heading my={"3"}>MEDITECH Premium</Heading>
              <Text my={"3"}>
                Earn extra HK Cash & Enjoy more discounts and <br /> deals than
                anyone else!
              </Text>
              <Button my={"3"}>Be a Part Now!</Button>
            </Box>
            <Box>
              <Image
                src={
                  "https://static1.hkrtcdn.com/hknext/static/media/common/misc/subscribe.svg"
                }
                alt="error"
              />
            </Box>
          </Flex>
          <Flex
            px={"5"}
            rounded={"3xl"}
            alignItems={"center"}
            justifyContent={"space-between"}
            shadow={"sm"}
            bg={"teal.50"}
          >
            <Box>
              <Heading my={"3"}>Refer & Earn</Heading>
              <Text my={"3"}>
                Tell your friends to shop at
                <br /> HealthKart. They get Rs.200 off
                <br /> when they shop with us the 1st time
                <br /> & you get Rs. 200 off on your next <br /> order.
              </Text>
              <Flex>
                <Text my={"3"}>Refer Now</Text>
                <Image
                  mx={"3"}
                  src="https://static1.hkrtcdn.com/hknext/static/media/common/misc/refer-arrow-go.svg"
                  alt="Error"
                />
              </Flex>
            </Box>
            <Box>
              <Image
                src="https://static1.hkrtcdn.com/hknext/static/media/common/misc/boy-refer.svg"
                alt="Error"
              />
            </Box>
          </Flex>
        </Box>
        <Box>
          <Flex
            rounded={"3xl"}
            bgGradient={"linear(to-r ,#D9F1F1,#20C4A6)"}
            px={"7"}
            alignItems={"center"}
            justifyContent={"space-between"}
            shadow={"sm"}
          >
            <Box>
              <Heading my={"2"}>Instant </Heading>
              <Heading my={"2"}>Assistance</Heading>
              <Text my={"2"}>Wish to seek advise from </Text>
              <Text my={"2"}>nutritionists and dietitians?</Text>
              <Button
                bg={"whitesmoke"}
                p={"5"}
                fontSize={"lg"}
                _hover={{ shadow: "2xl" }}
                mt={"14"}
                mb={"4"}
              >
                Book An Appointment
              </Button>
              <Text my={"2"}>
                * Get your customized nutrition <br />
                and lifestyle plan
              </Text>
            </Box>
            <Box>
              <Image
                w={"full"}
                src="https://static1.hkrtcdn.com/hknext/static/media/common/misc/physician.png"
                alt="Error Doctor Image"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
      <Divider my={"6"} borderColor="gray.300" borderWidth="4px" />
      <Footer/>
    </div>
  );
}

export default Home;
