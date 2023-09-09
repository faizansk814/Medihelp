import { Box, Flex, Grid, Heading, Image, Text, VStack, HStack, Badge, Center, Input, Radio, RadioGroup } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getProductData } from "../redux/userReducer/action"
import Navbar from "../components/navbar"

function Dashboard() {
    const data = useSelector((store) => store.userReducer.data)
    console.log(data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductData())
    }, [dispatch])
    return (
        <>
            <Navbar/>
            <Flex justifyContent={'space-evenly'}>
                <Box w={'48'}>
                    <Box>
                        <Text fontWeight={'semibold'} fontSize={'3xl'}>Filter</Text>
                    </Box>
                    <Box border={'1px'}>
                        <Text fontWeight={'semibold'} fontSize={'2xl'} py={'3'}>Category</Text>
                        <Flex justifyContent={'space-between'} border={'1px'}>
                            <Text>Top Products</Text>
                            <RadioGroup>
                                <Radio value="option1"></Radio>
                            </RadioGroup>
                        </Flex>

                    </Box>
                </Box>
                <Grid
                    templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                    gap={10}
                >
                    {data.map((el, index) => (
                        <Box
                            boxShadow="md"
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            maxWidth="300px"
                            _hover={{ borderColor: 'gray' }}
                        >
                            <Box pos="relative">
                                <Center>
                                    <Image
                                        src={el.image}
                                        alt={el.name}
                                        w="100%"
                                        h="auto"
                                        boxSize="200px" objectFit="cover"
                                        pt={'2'}
                                    />
                                </Center>
                            </Box>
                            <Box p="4">
                                <VStack spacing="1" alignItems="flex-start">
                                    <Heading as="h2" size="md" noOfLines={2}>
                                        {el.name}
                                    </Heading>
                                    <HStack justifyContent="space-between">
                                        <Box>
                                            <Text fontSize="lg" fontWeight="bold" color="teal.500">
                                                {el.price}
                                            </Text>
                                            <Text fontSize="sm" color="gray.500" textDecoration="line-through">
                                                {(el.price * 100 / 48).toFixed(2)}
                                            </Text>
                                        </Box>
                                        <Badge colorScheme="green">48% OFF</Badge>
                                    </HStack>
                                </VStack>
                            </Box>
                        </Box>
                    ))}
                </Grid>
            </Flex>
        </>
    )
}


export default Dashboard