import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./AddProduct.css";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const AddProductUI = () => {
  // Form States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [images, setImages] = useState([]); // To store multiple images
  const [brand, setBrand] = useState(""); // To store the selected brand
  const [customBrand, setCustomBrand] = useState(""); // To store custom brand name
  const [submitting, setSubmitting] = useState(false);
  const [icon, setIcon] = useState(null); // State for icon (only for saving the image path)
  const [color, setColor] = useState(""); // Color input field
  const [tags, setTags] = useState([]); // Array to store tags (colors)

  const handleImageChange = (index, e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const newImages = [...images];
      newImages[index] = URL.createObjectURL(selectedFile); // Save image preview URL
      setImages(newImages);

      // Automatically set the first selected image as the icon (image path for saving)
      if (!icon && selectedFile) {
        setIcon(selectedFile); // Set the first image as the icon
      }
    }
  };

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // If the image removed was set as the icon, reset icon to null
    if (images[index] === icon) {
      setIcon(null);
    }
  };

  const handleBrandChange = (e) => {
    const selectedBrand = e.target.value;
    setBrand(selectedBrand);
    if (selectedBrand !== "Other") {
      setCustomBrand(""); // Clear custom brand if another brand is selected
    }
  };

  const handleTagsChange = (e) => {
    setColor(e.target.value); // Update the color input field as user types
  };

  const handleTagAddition = (e) => {
    if (e.key === "Enter" && color.trim() !== "") {
      // If "Enter" is pressed and color is not empty, add the color as a tag
      setTags((prevTags) => [...prevTags, color.trim()]);
      setColor(""); // Clear the input field
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove)); // Remove tag from the list
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();

    // Append each image to the FormData
    images.forEach((image) => {
      if (image) {
        formData.append("images", image);
      }
    });

    // Append the icon (path of the first image selected)
    if (icon) {
      formData.append("icon", icon); // Store the file path as the icon
    }

    formData.append("title", title);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("tags", tags.join(",")); // Pass tags as comma-separated string

    // If "Other" is selected, append the custom brand, otherwise append the selected brand
    const brandToSubmit = brand === "Other" ? customBrand : brand;
    formData.append("brand", brandToSubmit);

    try {
      const response = await axios.post("http://localhost:3001/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Product added successfully!");
      resetForm();
    } catch (error) {
      toast.error("Error adding product. Please try again.");
      console.error("Error adding product:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setCategory("");
    setImages([]);
    setBrand("");
    setCustomBrand("");
    setIcon(null);
    setColor(""); // Reset color input field
    setTags([]); // Reset tags
  };

  const handleImageClick = (index) => {
    // Trigger the file input when the box is clicked
    document.getElementById(`image-${index}`).click();
  };

  return (
    <div>
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/add-products">Add Products</Link>
      </div>
      <div className="addProdContainer">
        <Toaster position="top-right" />
        <h2>Add Products</h2>

        <form onSubmit={handleSubmit} className="form-section">
          <div className="form-fields">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <label htmlFor="images">Image:</label>
            <div className="image-upload-container">
              {Array.from({ length: 4 }).map((_, index) => {
                return (
                  (index < images.length || index === 0) && (
                    <div key={index} className="upload-box" onClick={() => handleImageClick(index)}>
                      <input
                        type="file"
                        id={`image-${index}`}
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, e)}
                        style={{ display: "none" }} // Hide the default input field
                      />
                      {images[index] ? (
                        <>
                          <img src={images[index]} alt={`preview-${index}`} />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="remove-image-button"
                          >
                            <MdOutlineDelete />
                          </button>
                        </>
                      ) : (
                        <span className="add-icon">+</span>
                      )}
                    </div>
                  )
                );
              })}
            </div>

            <label htmlFor="color">Color (Press Enter to Add Tag):</label>
            <input
              type="text"
              id="color"
              value={color}
              onChange={handleTagsChange}
              onKeyDown={handleTagAddition}
              placeholder="Enter color and press Enter"
              className="color-input"
            />

            <div className="tags-container">
              {tags.map((tag, index) => (
                <div key={index} className="tag">
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleTagRemove(tag)}
                    className="remove-tag-button"
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              ))}
            </div>

            <label htmlFor="brand">Brand:</label>
            <select
              id="brand"
              value={brand}
              onChange={handleBrandChange}
              required
            >
              <option value="">Select a brand</option>
              <option value="Brand1">Brand1</option>
              <option value="Brand2">Brand2</option>
              <option value="Brand3">Brand3</option>
              <option value="Brand4">Brand4</option>
              <option value="Other">Other</option>
            </select>

            {brand === "Other" && (
              <div>
                <label htmlFor="customBrand">Enter Custom Brand Name:</label>
                <input
                  type="text"
                  id="customBrand"
                  value={customBrand}
                  onChange={(e) => setCustomBrand(e.target.value)}
                  required
                />
              </div>
            )}

            <button className="addProdBtn" type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductUI;
