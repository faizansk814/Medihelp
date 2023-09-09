import { Box, Flex, Text, Image, Grid } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { getProductData } from "../redux/userReducer/action";


function Home() {
    const store = useSelector((store) => store.userReducer.data)
    console.log(store)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProductData())
    }, [dispatch])

    return (
        <div>
            <Navbar /><br />
            <Carousel showStatus={false} infiniteLoop={true} swipeable={true} autoPlay={true} showThumbs={false}>
                <div>
                    <Image src="https://mercury.akamaized.net/i/8888c916299ab7d5ff8fb36ba1d99f21_200696_0.jpeg" alt="Image" />
                </div>
                <div>
                    <Image src="https://mercury.akamaized.net/i/1e961d351472f0e6652e2ee4bc738b94_201602_0.jpg" alt="Image" />
                </div>
                <div>
                    <Image src="https://mercury.akamaized.net/i/438a6543f1dbf1d55fa5438637402841_201575_0.jpg" alt="Image" />
                </div>
            </Carousel>

            <Grid mt={'3'} ml={'10'} templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' }} gap={'10'}>
                <Flex boxShadow={'xl'} rounded={'2xl'}>
                    <img src="https://www.netmeds.com/assets/gloryweb/images/icons/ordermedicinnew.svg" alt="" />
                    <Box pl={'5'} pt={'3'}>
                        <Text fontWeight={'bold'}>Order Medicine</Text>
                        <Text color={'green.300'}>Save Upto 25%</Text>
                    </Box>
                </Flex>
                <Flex boxShadow={'xl'} rounded={'2xl'}>
                    <img src="https://www.netmeds.com/assets/gloryweb/images/icons/Beautynew.svg" alt="" />
                    <Box pl={'5'} pt={'3'}>
                        <Text fontWeight={'bold'}>Beauty</Text>
                        <Text color={'green.300'}>Save Upto 25%</Text>
                    </Box>
                </Flex>
                <Flex boxShadow={'xl'} rounded={'2xl'}>
                    <img src="https://www.netmeds.com/assets/gloryweb/images/icons/Wellnessnew.svg" alt="" />
                    <Box pl={'5'} pt={'3'}>
                        <Text fontWeight={'bold'}>Wellness</Text>
                        <Text color={'green.300'}>Save Upto 25%</Text>
                    </Box>
                </Flex>
            </Grid>
            <Grid templateColumns={{ base: 'repeat(1,1fr)', md: 'repeat(2,1fr)', lg: 'repeat(3,1fr)' }} mt={'10'}>
                <Box>
                    <Image src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1692971075_Vitaminsddddd.jpg" rounded={'lg'} />
                </Box>
                <Box>
                    <Image src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1692970962_Fitness_Mini-banner_web.jpg" rounded={'lg'} />
                </Box>
                <Box>
                    <Image src="https://www.netmeds.com/images/cms/aw_rbslider/slides/1692970993_Ayurvedic_Mini_web.jpg" rounded={'lg'} />
                </Box>
            </Grid>
            <Text mt={'10'} fontFamily={'cursive'} fontSize={'2xl'} fontWeight={'bold'}>Shop By Category</Text>
            <Grid width={'90%'} margin={'auto'} mt={'5'} templateColumns={{ base: 'repeat(2,1fr)', md: 'repeat(3,1fr)', lg: 'repeat(5,1fr)' }}>
                <Box>
                    <Image src="https://www.netmeds.com/images/category/prod/thumb/ayush.png" rounded={'lg'} />
                </Box>
                <Box>
                    <Image src="https://www.netmeds.com/images/category/prod/thumb/hair_care.png" rounded={'lg'} />
                </Box>
                <Box>
                    <Image src="https://www.netmeds.com/images/category/v1/525/thumb/body_care_4.png" rounded={'lg'} />
                </Box>
                <Box>
                    <Image src="https://www.netmeds.com/images/category/prod/thumb/treatments.png" rounded={'lg'} />
                </Box>
                <Box>
                    <Image src="https://www.netmeds.com/images/category/prod/thumb/cold_and_fever.png" rounded={'lg'} />
                </Box>
            </Grid>
            <Box>
                <Text>Today's Exclusive</Text>
                <Text>Lightning Deals</Text>
                <Carousel>
                    <div style={{ display: 'flex' }}>

                    </div>
                </Carousel>
            </Box>
        </div>
    )
}

export default Home