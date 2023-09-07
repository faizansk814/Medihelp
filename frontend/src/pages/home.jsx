import { Box, Flex, Text } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function Home() {
    return (
        <div>
            <Navbar /><br />
            <Carousel  showStatus={false} infiniteLoop={true} swipeable={true} autoPlay={true}>
                <div>
                    <img src="https://mercury.akamaized.net/i/8888c916299ab7d5ff8fb36ba1d99f21_200696_0.jpeg" alt="Image 1" />
                </div>
                <div>
                    <img src="https://mercury.akamaized.net/i/1e961d351472f0e6652e2ee4bc738b94_201602_0.jpg" alt="Image 2" />
                </div>
                <div>
                    <img src="https://mercury.akamaized.net/i/438a6543f1dbf1d55fa5438637402841_201575_0.jpg" alt="Image 3" />
                </div>
            </Carousel>
            <Flex align={'center'} justifyContent={'space-around'}>
                <Flex>
                    <img src="https://www.netmeds.com/assets/gloryweb/images/icons/ordermedicinnew.svg" alt=""/>
                    <Box pl={'5'} pt={'3'}>
                        <Text fontWeight={'bold'}>Order Medicine</Text>
                        <Text color={'green.300'}>Save Upto 25%</Text>
                    </Box>
                </Flex>
                <Flex>
                    <img src="https://www.netmeds.com/assets/gloryweb/images/icons/Beautynew.svg" alt="" />
                    <Box pl={'5'} pt={'3'}>
                        <Text fontWeight={'bold'}>Beauty</Text>
                        <Text color={'green.300'}>Save Upto 25%</Text>
                    </Box>
                </Flex>
                <Flex>
                    <img src="https://www.netmeds.com/assets/gloryweb/images/icons/Wellnessnew.svg" alt="" />
                    <Box pl={'5'} pt={'3'}>
                        <Text fontWeight={'bold'}>Wellness</Text>
                        <Text color={'green.300'}>Save Upto 25%</Text>
                    </Box>
                </Flex>
            </Flex>
        </div>
    )
}

export default Home