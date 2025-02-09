// import { useState } from "react";
// import PropTypes from "prop-types";
// import './RatingsAndReviews.css';
// import { CiStar } from "react-icons/ci";
// import { FaStar } from "react-icons/fa6";

// const RatingsAndReviews = ({ user }) => {
//   const [reviewText, setReviewText] = useState("");
//   const [currentRating, setCurrentRating] = useState(0);
//   const [savedReview, setSavedReview] = useState({
//     text: "",
//     timestamp: "",
//     rating: 0,
//   });
//   const [editing, setEditing] = useState(false); // Tracks visibility of the review section

//   const handleToggleReviewSection = () => {
//     setEditing((prev) => !prev); // Toggles the editing state
//     if (editing) {
//       setReviewText("");
//       setCurrentRating(0);
//     }
//   };

//   const handleSaveReview = () => {
//     if (reviewText.trim() !== "") {
//       setSavedReview({
//         text: reviewText,
//         timestamp: new Date().toLocaleString(),
//         rating: currentRating,
//       });
//       setReviewText("");
//       setCurrentRating(0);
//       setEditing(false);
//     }
//   };

//   const handleEditReview = () => {
//     setReviewText(savedReview.text);
//     setCurrentRating(savedReview.rating);
//     setEditing(true);
//   };

//   const handleDeleteReview = () => {
//     setSavedReview({
//       text: "",
//       timestamp: "",
//       rating: 0,
//     });
//     setReviewText("");
//     setCurrentRating(0);
//     setEditing(false);
//   };

//   return (
//     <div className="review-section">
//       <div className="write-review">
//         <i className="pencil" onClick={handleToggleReviewSection}>
//           ✏️
//         </i>
//         <span>Write the Review</span>
//       </div>
//       {editing && (
//         <>
//           <textarea
//             placeholder="Write your review here..."
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//           />
//           <div className="stars">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span
//                 key={star}
//                 className={`star ${currentRating >= star ? "active" : ""}`}
//                 onClick={() => setCurrentRating(star)}
//               >
//                 <CiStar />
//               </span>
//             ))}
//           </div>
//           <button onClick={handleSaveReview}>Save the Review</button>
//         </>
//       )}
//       {savedReview.text && (
//         <div className="user-review">
//           <img src={user.photoURL || "user-placeholder.png"} alt="User" />
//           <div>
//             <div className="name">{user.displayName || "Anonymous"}</div>
//             <div className="stars">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <span
//                   key={star}
//                   className={`star ${savedReview.rating >= star ? "active" : ""}`}
//                 >
//                   <FaStar />
//                 </span>
//               ))}
//             </div>
//             <div className="comment">{savedReview.text}</div>
//             <small className="timestamp">{savedReview.timestamp}</small>
//           </div>
//           <div className="review-actions">
//             <button className="edit" onClick={handleEditReview}>
//               Edit
//             </button>
//             <button className="delete" onClick={handleDeleteReview}>
//               Delete
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Prop validation
// RatingsAndReviews.propTypes = {
//   user: PropTypes.shape({
//     photoURL: PropTypes.string,
//     displayName: PropTypes.string,
//   }),
// };

// // Default props
// RatingsAndReviews.defaultProps = {
//   user: {
//     photoURL: "user-placeholder.png",
//     displayName: "Anonymous",
//   },
// };

// export default RatingsAndReviews;


import { useState, useEffect } from "react";
import './RatingsAndReviews.css'
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { HiPencilAlt } from "react-icons/hi";
import { FaStar } from "react-icons/fa6";
import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { useAuth } from "../authContext/AuthContext";
import Avatar from "../Navbar/Avatar";
import "aos/dist/aos.css";
import AOS from "aos";


const RatingsAndReviews = () => {
    const { user, loading } = useAuth();
    const [reviewText, setReviewText] = useState("");
    const [currentRating, setCurrentRating] = useState(0);
    const [savedReview, setSavedReview] = useState({
        text: "",
        timestamp: "",
        rating: 0,
    });
    useEffect(() => {
        AOS.init({
            duration: 250,
            easing: "ease",
            once: true,
        });
    }, []);
    const [editing, setEditing] = useState(false);

    const handleToggleReviewSection = () => {
        setEditing((prev) => !prev);
        if (editing) {
            setReviewText("");
            setCurrentRating(0);
        }
    };

    const handleSaveReview = () => {
        if (!reviewText.trim()) {
            toast.error("Please write a review before saving!", {
                duration: 3000,
            });
            return;
        }
        if (currentRating === 0) {
            toast.error("Please select a rating before saving!", {
                duration: 3000,
            });
            return;
        }

        if (savedReview.text) {
            toast.success("Your review has been updated successfully!", {
                duration: 3000,
            });
        } else {
            toast.success("Your review has been saved successfully!", {
                duration: 3000,
            });
        }

        setSavedReview({
            text: reviewText,
            timestamp: new Date().toLocaleString(),
            rating: currentRating,
        });
        setReviewText("");
        setCurrentRating(0);
        setEditing(false);
    };

    const handleEditReview = () => {
        setReviewText(savedReview.text);
        setCurrentRating(savedReview.rating);
        setEditing(true);
    };

    const handleDeleteReview = () => {
        setSavedReview({
            text: "",
            timestamp: "",
            rating: 0,
        });
        setReviewText("");
        setCurrentRating(0);
        setEditing(false);
        toast.success("Your review has been deleted successfully!");
    };

    return (
        <div className="review-section"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-anchor-placement="center-bottom">
            <div className="write-review">
                <i className="pencil" onClick={handleToggleReviewSection}>
                    <HiPencilAlt />
                </i>
                <span>Write the Review</span>
            </div>
            {editing && (
                <>
                    <textarea
                        placeholder="Write your review here..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${currentRating >= star ? "active" : ""}`}
                                onClick={() => setCurrentRating(star)}
                            >
                                <FaStar />
                            </span>
                        ))}
                    </div>
                    <button onClick={handleSaveReview} className="rating-save-btn">Save the Review</button>
                </>
            )}
            {savedReview.text && (
                <div className="user-review">
                    {loading ? (
                        <span>Loading...</span>
                    ) : user ? (
                        user.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="User Icon"
                                className="user-img"
                            />
                        ) : (
                            <Avatar name={user.displayName || user.email} />
                        )
                    ) : (
                        <span></span>
                    )}
                    <div className="user-rating">
                    <div className="name">{user ? user.displayName || "Anonymous" : "Anonymous"}</div>
                        <div className="stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${savedReview.rating >= star ? "active" : ""}`}
                                >
                                    <FaStar />
                                </span>
                            ))}
                        </div>
                        <div className="comment">{savedReview.text}</div>
                        <small className="timestamp">{savedReview.timestamp}</small>
                    </div>
                    <div className="review-actions">
                        <p className="review-edit icon-wrapper" onClick={handleEditReview}>
                            <BiSolidPencil />
                            <span className="tooltip">Edit</span>
                        </p>
                        <p className="review-delete icon-wrapper" onClick={handleDeleteReview}>
                            <MdOutlineDelete />
                            <span className="tooltip">Delete</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

// Prop validation
RatingsAndReviews.propTypes = {
    user: PropTypes.shape({
        photoURL: PropTypes.string,
        displayName: PropTypes.string,
    }),
};

// Default props
RatingsAndReviews.defaultProps = {
    user: {
        photoURL: "user-placeholder.png",
        displayName: "Anonymous",
    },
};

export default RatingsAndReviews;
