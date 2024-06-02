/* eslint-disable no-unused-vars */
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProductCard() {
    const [amount, setAmount] = useState(1000);

    // Environment variables
    const backendHostUrl = import.meta.env.VITE_BACKEND_HOST_URL;
    const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

    // Debug: Log environment variables
    console.log('Backend Host URL:', backendHostUrl);
    console.log('Razorpay Key ID:', razorpayKeyId);

    // handlePayment Function
    const handlePayment = async () => {
        try {
            const res = await fetch(`${backendHostUrl}/api/payment/order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    amount
                })
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            console.log(data);
            handlePaymentVerify(data.data);
        } catch (error) {
            console.log('Error in handlePayment:', error);
        }
    };

    // handlePaymentVerify Function
    const handlePaymentVerify = async (data) => {
        const options = {
            key: razorpayKeyId,
            amount: data.amount,
            currency: data.currency,
            name: "Prakash Kumar",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response);
                try {
                    const res = await fetch(`${backendHostUrl}/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                    });

                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const verifyData = await res.json();

                    if (verifyData.message) {
                        toast.success(verifyData.message);
                    }
                } catch (error) {
                    console.log('Error in handlePaymentVerify:', error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <Carousel className="rounded-xl">
            <div className="relative h-full w-full">
                <img
                    src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvczkzLXBtLTI3NTcuanBn.jpg"
                    alt="image 1"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
                    <div className="w-3/4 text-center md:w-2/4">
                        <Typography
                            variant="h1"
                            color="white"
                            className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                        >
                            Payment Gateway for Donation
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            className="mb-12 opacity-80"
                        >
                            Our work goes beyond what you can see; it’s about the profound changes we create in lives and communities. The feeling of renewal and hope we provide touches hearts in ways that words can't fully capture.

                            Donate us to be a part of this transformative journey.
                        </Typography>
                        <div className="flex justify-center gap-2">
                            <Button onClick={handlePayment} size="lg" color="white">
                                Donate Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative h-full w-full">
                <img
                    src="https://wallpapercave.com/wp/wp6351088.jpg"
                    alt="image 2"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
                    <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
                        <Typography
                            variant="h1"
                            color="white"
                            className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                        >
                            Payment Gateway Integration Platform
                        </Typography>
                        <Typography
                            variant="lead"
                            color="white"
                            className="mb-12 opacity-80"
                        >The project involved the development of a sophisticated payment gateway integration page using a tech stack centered around JavaScript, React for the frontend, and Node.js for the backend. The objective was to create a seamless and secure platform for processing payments through the Razorpay API. This required setting up Express for backend logic and creating API routes to handle payment transactions. The frontend was designed using React and styled using Tailwind CSS to ensure an intuitive and visually appealing user interface. JavaScript was extensively used to handle form submissions and communicate with the backend API, ensuring smooth data flow. The project also involved rigorous testing and debugging to ensure the system's reliability and functionality. The use of npm for dependency management, nodemon for development efficiency, and Git for version control contributed to a structured and organized project workflow. The successful deployment of the project demonstrated its ability to handle payment transactions securely and efficiently.
                        </Typography>
                    </div>
                </div>
            </div>
        </Carousel>
    );
}
