import { useState, useEffect } from "react";
import QRCode from "qrcode"; // Import from the 'qrcode' package
import toast, { Toaster } from "react-hot-toast"; // Import toast notifications
import "./paymentGate.css";
import amazonPay from "./assets/amazon-pay.png";
import bhimPay from "./assets/bhim.jpg";
import famPay from "./assets/fampay.jpg";
import googlePay from "./assets/google-pay.png";
import paytm from "./assets/paytm.jpg";
import phonePay from "./assets/phonepay.jpg";
import { useLocation } from "react-router-dom";
import { TiInfoLarge } from "react-icons/ti";



const PaymentPage = () => {
    const location = useLocation();
    const totalPrice = location.state?.totalPrice || 0;
    const fixedUpiId = "9507966158@fam"; // Fixed UPI ID
    const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120); // Countdown duration in seconds
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState(null);
    const [generationCount, setGenerationCount] = useState(0);

    useEffect(() => {
        // Retrieve generation count from localStorage
        const storedCount = parseInt(localStorage.getItem("generationCount"), 10) || 0;
        const lastResetTime = parseInt(localStorage.getItem("lastResetTime"), 10) || Date.now();

        // Check if 24 hours have passed since the last reset
        if (Date.now() - lastResetTime >= 24 * 60 * 60 * 1000) {
            localStorage.setItem("generationCount", "0");
            localStorage.setItem("lastResetTime", Date.now().toString());
        } else {
            setGenerationCount(storedCount);
        }
    }, []);

    useEffect(() => {
        let countdownInterval;

        if (qrCodeGenerated && timeLeft > 0) {
            countdownInterval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime === 1) {
                        clearInterval(countdownInterval);
                        setQrCodeGenerated(false);
                        toast.error("QR code has expired.");
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(countdownInterval);
    }, [qrCodeGenerated, timeLeft]);

    const generateQR = () => {
        if (qrCodeGenerated) {
            toast.error("Please wait until the current QR code expires.");
            return;
        }

        if (generationCount >= 18) {
            toast.error("You can generate QR codes only 3 times in 24 hours.");
            return;
        }

        setQrCodeGenerated(true);
        setTimeLeft(120); // Reset countdown
        setGenerationCount((prevCount) => prevCount + 1);

        // Update localStorage
        localStorage.setItem("generationCount", (generationCount + 1).toString());
        if (!localStorage.getItem("lastResetTime")) {
            localStorage.setItem("lastResetTime", Date.now().toString());
        }

        const upiString = `upi://pay?pa=${fixedUpiId}&pn=Kunal Sharma&am=${totalPrice}&cu=INR`;

        QRCode.toDataURL(upiString)
            .then((url) => {
                setQrCodeDataUrl(url); // Save the generated QR code URL
                toast.success("QR code generated successfully!");
            })
            .catch((error) => {
                console.error("Error generating QR code", error);
                toast.error("Failed to generate QR code.");
            });
    };

    return (
        <div className="payment-main">
            <Toaster position="top-right" />
            <div className="payment-container">
                <h1>Scan QR Code to Pay</h1>
                <p>Total Amount: ₹{totalPrice}</p>
                <div className="qr-code-container">
                    {qrCodeGenerated ? (
                        // Render the QR code image
                        <img src={qrCodeDataUrl} alt="QR Code" width={256} height={256} />
                    ) : (
                        <span>QR Code will appear here</span>
                    )}
                </div>
                <button className="payment-btn" onClick={generateQR}>
                    {qrCodeGenerated ? "QR Code Active" : "Generate QR Code"}
                </button>

                <div className="info-icon-container">
                    <i className="info-icon"><TiInfoLarge /></i>
                    <div className="warn-tooltip">You can generate the QR code only 3 times within 24 hours.</div>
                </div>
                <div className="countdown">
                    {qrCodeGenerated
                        ? `QR code will expire in ${timeLeft} seconds`
                        : "QR code has expired"}
                </div>
            </div>
            <p className="payment-para">Scan the QR using any UPI app on your phone.</p>
            <div className="suported-apps">
                <div className="payment-icons">
                    <img src={amazonPay} alt="" />
                </div>
                <div className="payment-icons">
                    <img src={bhimPay} alt="" />
                </div>
                <div className="payment-icons">
                    <img src={famPay} alt="" />
                </div>
                <div className="payment-icons">
                    <img src={googlePay} alt="" />
                </div>
                <div className="payment-icons">
                    <img src={paytm} alt="" />
                </div>
                <div className="payment-icons">
                    <img src={phonePay} alt="" />
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;



