import { useState } from "react";
import "./SellerAC.css";
import backImg from "./assets/rb_3002.png";
import toast from "react-hot-toast";

const SellerAC = () => {
    const initialFormData = {
        storeName: "",
        vendorName: "",
        storeEmail: "",
        upiId: "",
        telephone: "",
        termsAccepted: false,
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === "checkbox" ? checked : value,
        });
    };

    const handleVendorClick = (e) => {
        e.preventDefault();

        const { storeName, vendorName, storeEmail, upiId, telephone, termsAccepted } = formData;

        // Validation checks
        if (!storeName || !vendorName || !storeEmail || !upiId || !telephone) {
            toast.error("Please fill out all required fields.");
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!emailRegex.test(storeEmail)) {
            toast.error("Email must be a valid @gmail.com address.");
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(telephone)) {
            toast.error("Phone number must be exactly 10 digits.");
            return;
        }

        const upiRegex = /@/;
        if (!upiRegex.test(upiId)) {
            toast.error("UPI ID must contain '@'.");
            return;
        }

        if (!termsAccepted) {
            toast.error("You must accept the terms and conditions.");
            return;
        }

        // Simulate sending data and resetting the form
        toast.success("Your details have been submitted to Admin.");
        setFormData(initialFormData); // Reset form to initial values
    };

    return (
        <div className="main-seller">
            <div className="form-container">
                <h1>BECOME A SELLER</h1>
                <p>
                    Reach millions of shoppers, grow your ecommerce business and stay
                    profitable.<br />
                    Start to sell today and earn a commission of <strong>90%</strong> on
                    each order of your store.
                </p>
                <form className="sellerForm">
                    <label htmlFor="storeName">
                        Store name <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="storeName"
                        placeholder="Enter your store name"
                        value={formData.storeName}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="vendorName">
                        Vendor name <span className="required">*</span>
                    </label>
                    <input
                        type="text"
                        id="vendorName"
                        placeholder="Enter your name"
                        value={formData.vendorName}
                        onChange={handleInputChange}
                        required
                    />

                    <label htmlFor="storeEmail">
                        Store email <span className="required">*</span>
                    </label>
                    <input
                        type="email"
                        id="storeEmail"
                        placeholder="Enter your store email"
                        value={formData.storeEmail}
                        onChange={handleInputChange}
                        required
                    />

                    <div className="noAndUpi">
                        <label htmlFor="upiId">
                            UPI ID <span className="required">*</span>
                        </label>
                        <label htmlFor="telephone">
                            Phone Number <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="upiId"
                            placeholder="Enter your UPI ID"
                            value={formData.upiId}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            id="telephone"
                            placeholder="Enter your telephone"
                            value={formData.telephone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="terms">
                        <input
                            type="checkbox"
                            id="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="termsAccepted">
                            I’ve read and accept the <a href="#">terms & conditions</a> <span className="required">*</span>
                        </label>
                    </div>
                    <button id="sellerBtn" type="submit" onClick={handleVendorClick}>
                        Become a vendor
                    </button>
                </form>
            </div>
            <div className="img-container">
                <img src={backImg} alt="" />
            </div>
        </div>
    );
};

export default SellerAC;
