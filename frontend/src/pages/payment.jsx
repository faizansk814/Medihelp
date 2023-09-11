import { Box, Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const token=localStorage.getItem("token")||""
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
          .post("http://localhost:4031/payment/verify", { response: response },{
            headers:{
                Authorization:`Bearer ${token}`
            }
          })
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
      .post(`http://localhost:4031/payment/orders`, _data,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res.data);
        handleOprnrazorPay(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box>
      <Heading>Pay Now</Heading>
      <Button onClick={handleClick}>Click to make payment</Button>
    </Box>
  );
}

export default Payment;
