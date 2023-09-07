import { HStack, Flex, Box, Image, useDisclosure, VStack, IconButton, Collapse, Input,Text } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart,faUser,faUpload } from '@fortawesome/free-solid-svg-icons';


export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure()
    return (
        <Box bg={'teal.400'} color={'white'} pt={'5'} pb={'5'}>
            <Flex align={'center'} justifyContent={{base:'space-between',md:'space-evenly'}}>
                <Box pl={'7'}>
                    <a href="/">
                        <Image src="https://nms-assets.s3-ap-south-1.amazonaws.com/images/cms/aw_rbslider/slides/1663609483_netmeds-new-logo.svg" width={'44'} />
                    </a>
                </Box>
                <Box display={{ base: 'none', md: 'block' }}>
                    <Input bg={'white'} type="text" placeholder="Enter here" border={'2px'} pl={'36'} pr={'36'} color={'black'} />
                </Box>

                <Box display={{ base: 'none', md: 'block' }}>
                    <HStack spacing={'4'}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <Text fontSize={'xl'}>Cart</Text>
                        <FontAwesomeIcon icon={faUpload} />
                        <Text fontSize={'xl'}>Uploads</Text>
                        <FontAwesomeIcon icon={faUser} />
                        <Text fontSize={'xl'}>Signin/Login</Text>
                        <FontAwesomeIcon />
                    </HStack>
                </Box>
                <Box display={{ base: 'block', md: 'none' }}>
                    <IconButton icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} onClick={onToggle} />
                </Box>
            </Flex>
            <Collapse in={isOpen}>
                <VStack spacing={'4'}>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/services">Services</a>
                    <a href="/contact">Contact</a>
                </VStack>
            </Collapse>
            <Flex align={'center'} justifyContent={'space-evenly'} display={{base:'none',md:'flex'}} >
                <Box display={'flex'} cursor="pointer">
                    <Image src="https://www.netmeds.com/assets/gloryweb/images/icons/Wellnessnew.svg" width={'10'} />
                    <Text mt={'3'} ml={'2'}>Medicine</Text>
                </Box>
                <Box display={'flex'} cursor="pointer">
                    <Image src="https://www.netmeds.com/assets/gloryweb/images/icons/Beautynew.svg" width={'10'} />
                    <Text mt={'3'} ml={'2'}>Beauty</Text>
                </Box>
                <Box display={'flex'} cursor="pointer">
                    <Image src="https://www.netmeds.com/assets/gloryweb/images/icons/ordermedicinnew.svg" width={'10'} />
                    <Text mt={'3'} ml={'2'}>Wellness</Text>
                </Box>
            </Flex>
        </Box>
    )
}