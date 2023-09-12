import {
  HStack,
  Flex,
  Box,
  Image,
  useDisclosure,
  VStack,
  IconButton,
  Collapse,
  Input,
  Text,
  Button,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faUpload,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <Box bg={"teal.400"} color={"white"} pt={"5"} pb={"5"}>
      <Flex
        align={"center"}
        justifyContent={{ base: "space-between", md: "space-evenly" }}
      >
        <Box pl={"7"}>
          <a href="/">
            <Image
              src="https://nms-assets.s3-ap-south-1.amazonaws.com/images/cms/aw_rbslider/slides/1663609483_netmeds-new-logo.svg"
              width={"44"}
            />
          </a>
        </Box>
        <Flex display={{ base: "none", md: "block" }}>
          <Input
            w={"xl"}
            color={"black"}
            rounded={"10"}
            textColor={"black"}
            placeholder="Enter Text Here"
            focusBorderColor="black"
            backgroundColor={"white"}
            py={"6"}
            mr={"2"}
          />
          <FontAwesomeIcon icon={faSearch} color="white" />
        </Flex>

        <Box display={{ base: "none", md: "block" }}>
          <HStack spacing={"4"}>
            <FontAwesomeIcon icon={faShoppingCart} />
            <Link to={'/cart'} fontSize={"xl"}><Text fontSize={"xl"}>Cart</Text></Link>
            <FontAwesomeIcon icon={faUpload} />
            <Link to={'/'} fontSize={"xl"}><Text fontSize={"xl"}>Uploads</Text></Link>
            {token ? (
              <Flex align={"center"}>
                <Text fontSize={"xl"}>{user.username}</Text>
                <Button ml={"2"} onClick={handleLogout}>
                  Logout
                </Button>
              </Flex>
            ) : (
              <Flex align={"center"}>
                <FontAwesomeIcon icon={faUser} />
                <Button
                  ml={"2"}
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Signin/Signup
                </Button>
              </Flex>
            )}
          </HStack>
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onToggle}
          />
        </Box>
      </Flex>
      <Collapse in={isOpen}>
        <VStack spacing={"4"}>
          <a href="/dashboard">Dashboard</a>
          <a href="/cart">cart</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </VStack>
      </Collapse>
      <Box
        display={{ base: "none", md: "block" }}
        my={{ base: "5" }}
        fontSize={"lg"}
      >
        <Flex justifyContent={"space-evenly"} alignItems={"center"}>
          <Button
            onClick={() => {
              navigate("/dashboard");
            }}
            _hover={{
              outline: "2px solid gray",
              outlineWidth: "1px",
            }}
          >
            Shop By Category
          </Button>
          <Link _hover={{ color: "gray" }}>Best Sellers</Link>
          <Link _hover={{ color: "gray" }}>Brands</Link>
          <Link
            _hover={{ color: "gray" }}
            display={{ md: "none", lg: "block", base: "none" }}
          >
            Offer Zone
          </Link>
          <Link _hover={{ color: "gray" }}>Blogs</Link>
          <Link
            _hover={{ color: "gray" }}
            display={{ md: "none", lg: "block", base: "none" }}
          >
            Gift Card
          </Link>
          <Link
            _hover={{ color: "gray" }}
            display={{ md: "none", lg: "block", base: "none" }}
          >
            Customer Support
          </Link>
          <Link
            _hover={{ color: "gray" }}
            display={{ md: "none", lg: "block", base: "none" }}
          >
            Store locator
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}
