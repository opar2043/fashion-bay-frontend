import React, { useState } from "react";
import { X, Upload, Plus } from "lucide-react";
import useAxios from "../../Hooks/useAxios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const img_api_key =
  "https://api.imgbb.com/1/upload?key=188918a9c4dee4bd0453f7ec15042a27";

const AddProducts = () => {
  const axiosSecure = useAxios();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    price: "",
    preprice: "",
    category: "",
    size: [],
    color: [],
    materials: [],
    fit: "",
    tags: [],
    subcategory: "",
    audience: ["Women"],
    images: [],
    featuredImageIndex: 0,
    isTrending: false,
    isLimitedEdition: false,
    isOnSale: false,
    reviews: [],
  });

  const [postedData, setPostedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newSize, setNewSize] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newMaterial, setNewMaterial] = useState("");

  const options = {
    materials: [
      "Cotton",
      "Polyester",
      "Lace",
      "Silk",
      "Linen",
      "Crepe",
      "Chiffon",
      "Satin",
      "Elastane",
      "PU Leather",
    ],
    tags: [
      "trending",
      "new",
      "sale",
      "bestseller",
      "limited",
      "event",
      "casual",
      "office",
      "comfy",
      "summer",
    ],
    fit: [
      "Relaxed",
      "Tailored",
      "Slim",
      "Modest",
      "Flowy",
      "Regular",
      "Wide Leg",
    ],
    subcategory: [
      "Maxi Dress",
      "Slip Dress",
      "Shirt",
      "Abaya",
      "Co-ord",
      "Trousers",
      "Jacket",
      "Bag",
    ],
    colors: [
      "Black",
      "White",
      "Brown",
      "Navy",
      "Emerald",
      "Dusty Pink",
      "Champagne",
      "Stone",
      "Mocha",
      "Beige",
    ],
    sizes: ["SM", "S", "M", "L", "XL", "XXL"],
    categories: [
      "New in",
      "Abayas",
      "Tops /shirts",
      "Dresses",
      "Co Ords",
      "Lounge wear",
      "Trousers",
      "Outerwear",
      "Accessories",
      "Best sellers",
      "Sale",
      "Limited edition ❤",
      "Trending now",
    ],
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "file") return;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      setUploading(true);
      const loadingId = toast.loading("Uploading image(s)...");

      const uploadedUrls = [];

      for (const file of files) {
        const isImg = /image\/(png|jpe?g|gif|webp|bmp|svg\+xml)$/i.test(
          file.type
        );
        if (!isImg) {
          toast.error(`Skipped non-image file: ${file.name}`);
          continue;
        }

        const data = new FormData();
        data.append("image", file);

        const res = await fetch(img_api_key, { method: "POST", body: data });
        const json = await res.json();

        if (!json?.success) {
          throw new Error(json?.error?.message || "Upload failed.");
        }

        const url = json?.data?.display_url || json?.data?.url;
        uploadedUrls.push(url);
      }

      toast.dismiss(loadingId);

      if (uploadedUrls.length === 0) {
        return toast.error("No valid images uploaded.");
      }

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));

      Swal.fire({
        icon: "success",
        title: "Images Uploaded!",
        text: `${uploadedUrls.length} image(s) uploaded successfully.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: err?.message || "Image upload failed.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAddImageUrl = () => {
    const url = newImageUrl.trim();
    if (!url) {
      Swal.fire({
        icon: "warning",
        title: "Empty URL",
        text: "Please enter a valid image URL.",
      });
      return;
    }

    // Basic URL validation
    if (!url.startsWith("http")) {
      Swal.fire({
        icon: "error",
        title: "Invalid URL",
        text: "Please enter a valid URL starting with http:// or https://",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
    setNewImageUrl("");

    Swal.fire({
      icon: "success",
      title: "Image Added!",
      text: "Image URL added successfully.",
      timer: 300,
      showConfirmButton: false,
    });
  };

  const removeImage = (index) => {
    Swal.fire({
      title: "Remove Image?",
      text: "Are you sure you want to remove this image?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData((prev) => {
          const newImages = prev.images.filter((_, i) => i !== index);
          let newFeatured = prev.featuredImageIndex;

          if (newImages.length === 0) {
            newFeatured = 0;
          } else if (index === prev.featuredImageIndex) {
            newFeatured = 0;
          } else if (index < prev.featuredImageIndex) {
            newFeatured = prev.featuredImageIndex - 1;
          }

          return {
            ...prev,
            images: newImages,
            featuredImageIndex: newFeatured,
          };
        });

        Swal.fire("Removed!", "Image has been removed.", "success");
      }
    });
  };

  const setFeaturedImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      featuredImageIndex: index,
    }));
    Swal.fire({
      icon: "success",
      title: "Main Photo Updated!",
      text: "This image is now set as the main product photo.",
      timer: 300,
      showConfirmButton: false,
    });
  };

  const handleAddSize = () => {
    const value = newSize.trim().toUpperCase();
    if (!value) {
      Swal.fire({
        icon: "warning",
        title: "Empty Size",
        text: "Please enter a size value.",
      });
      return;
    }
    if (formData.size.includes(value)) {
      Swal.fire({
        icon: "info",
        title: "Size Exists",
        text: "This size is already added.",
      });
      setNewSize("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      size: [...prev.size, value],
    }));
    setNewSize("");

    Swal.fire({
      icon: "success",
      title: "Size Added!",
      text: `Size "${value}" added successfully.`,
      timer: 300,
      showConfirmButton: false,
    });
  };

  const handleRemoveSize = (sizeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      size: prev.size.filter((s) => s !== sizeToRemove),
    }));
    Swal.fire(
      "Removed!",
      `Size "${sizeToRemove}" has been removed.`,
      "success"
    );
  };

  const handleAddColor = () => {
    const value = newColor.trim();
    if (!value) {
      Swal.fire({
        icon: "warning",
        title: "Empty Color",
        text: "Please enter a color name.",
      });
      return;
    }
    if (formData.color.includes(value)) {
      Swal.fire({
        icon: "info",
        title: "Color Exists",
        text: "This color is already added.",
      });
      setNewColor("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      color: [...prev.color, value],
    }));
    setNewColor("");

    Swal.fire({
      icon: "success",
      title: "Color Added!",
      text: `Color "${value}" added successfully.`,
      timer: 500,
      showConfirmButton: false,
    });
  };

  const handleRemoveColor = (colorToRemove) => {
    setFormData((prev) => ({
      ...prev,
      color: prev.color.filter((c) => c !== colorToRemove),
    }));
    Swal.fire(
      "Removed!",
      `Color "${colorToRemove}" has been removed.`,
      "success"
    );
  };

  const handleAddMaterial = () => {
    const value = newMaterial.trim();
    if (!value) {
      Swal.fire({
        icon: "warning",
        title: "Empty Material",
        text: "Please enter a material name.",
      });
      return;
    }
    if (formData.materials.includes(value)) {
      Swal.fire({
        icon: "info",
        title: "Material Exists",
        text: "This material is already added.",
      });
      setNewMaterial("");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      materials: [...prev.materials, value],
    }));
    setNewMaterial("");

    Swal.fire({
      icon: "success",
      title: "Material Added!",
      text: `Material "${value}" added successfully.`,
      timer: 300,
      showConfirmButton: false,
    });
  };

  const handleRemoveMaterial = (materialToRemove) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((m) => m !== materialToRemove),
    }));
    Swal.fire(
      "Removed!",
      `Material "${materialToRemove}" has been removed.`,
      "success"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in name, price and category.",
      });
      return;
    }

    if (!formData.images.length) {
      Swal.fire({
        icon: "error",
        title: "No Images",
        text: "Please upload at least one product photo.",
      });
      return;
    }

    const dataToSend = {
      ...formData,
      id: `product-${Date.now()}`,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      price: parseFloat(formData.price),
      rating: 0,
      reviews_count: 0,
      featured_image:
        formData.images[formData.featuredImageIndex] || formData.images[0],
    };

    try {
      setLoading(true);

      // Show loading Swal
      Swal.fire({
        title: "Adding Product...",
        text: "Please wait while we save your product.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await axiosSecure.post("/products", dataToSend);

      if (res.data.insertedId || res.status === 200 || res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Product Added!",
          text: "Product has been added successfully.",
          showConfirmButton: false,
          timer: 2000,
        });

        setPostedData(dataToSend);

        // Reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          preprice: "",
          code: "",
          category: "",
          size: [],
          color: [],
          materials: [],
          fit: "",
          tags: [],
          subcategory: "",
          audience: ["Women"],
          images: [],
          featuredImageIndex: 0,
          isTrending: false,
          isLimitedEdition: false,
          isOnSale: false,
          reviews: [],
        });

        setNewSize("");
        setNewImageUrl("");
        setNewColor("");
        setNewMaterial("");

        // Clear file input(s)
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach((input) => {
          input.value = "";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Failed to add product. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong. Please check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">
            Add New Product
          </h1>
          <p className="text-sm text-slate-500">
            Create and manage your product inventory.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 md:p-6 space-y-6"
        >
          {/* Product Details */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
              Product Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700/20 bg-white text-slate-900 placeholder:text-slate-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Product Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="Enter product code"
                  step="0.01"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700/20 bg-white text-slate-900 placeholder:text-slate-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Offer Price (GBP) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter Offer price"
                  step="0.01"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700/20 bg-white text-slate-900 placeholder:text-slate-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Previous Price *
                </label>
                <input
                  type="number"
                  name="preprice"
                  value={formData.preprice}
                  onChange={handleChange}
                  placeholder="Enter Previous price"
                  step="0.01"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700/20 bg-white text-slate-900 placeholder:text-slate-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the product, fabric, fit, styling tips..."
                rows={3}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700/20 bg-white text-slate-900 placeholder:text-slate-500"
              />
            </div>
          </section>

          {/* Classification */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
              Classification
            </h2>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700/20 bg-white text-slate-900"
                required
              >
                <option value="">Select category</option>
                {options.categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Sizes (array)
              </label>

              <div className="flex flex-wrap gap-2 mb-2">
                {options.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleMultiSelect("size", s)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border transition ${
                      formData.size.includes(s)
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  placeholder="Add custom size (e.g. 38, FREE)"
                  className="w-full sm:flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700/20 bg-white text-slate-900 placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium rounded-md border border-slate-300 text-slate-800 hover:bg-slate-50"
                >
                  <Plus size={14} />
                  Add size
                </button>
              </div>

              {formData.size.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.size.map((size) => (
                    <span
                      key={size}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border border-slate-200 bg-slate-50 text-slate-700"
                    >
                      {size}
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(size)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Colors *
              </label>

              <div className="flex flex-wrap gap-2 mb-2">
                {options.colors.map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => handleMultiSelect("color", col)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border transition ${
                      formData.color.includes(col)
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Add custom color (e.g. Midnight Blue, Burgundy)"
                  className="w-full sm:flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700/20 bg-white text-slate-900 placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium rounded-md border border-slate-300 text-slate-800 hover:bg-slate-50"
                >
                  <Plus size={14} />
                  Add color
                </button>
              </div>

              {formData.color.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.color.map((color) => (
                    <span
                      key={color}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border border-slate-200 bg-slate-50 text-slate-700"
                    >
                      {color}
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(color)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Attributes */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
              Attributes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Subcategory *
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700/20 bg-white text-slate-900"
                >
                  <option value="">Select subcategory</option>
                  {options.subcategory.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Fit *
                </label>
                <select
                  name="fit"
                  value={formData.fit}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700/20 bg-white text-slate-900"
                >
                  <option value="">Select fit</option>
                  {options.fit.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              {/* Materials */}
              <div className="space-y-2 md:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Materials *
                </label>

                <div className="flex flex-wrap gap-2 mb-2">
                  {options.materials.map((mat) => (
                    <button
                      key={mat}
                      type="button"
                      onClick={() => handleMultiSelect("materials", mat)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition ${
                        formData.materials.includes(mat)
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    placeholder="Add custom material (e.g. Cashmere, Velvet)"
                    className="w-full sm:flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700/20 bg-white text-slate-900 placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddMaterial}
                    className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium rounded-md border border-slate-300 text-slate-800 hover:bg-slate-50"
                  >
                    <Plus size={14} />
                    Add material
                  </button>
                </div>

                {formData.materials.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {formData.materials.map((material) => (
                      <span
                        key={material}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border border-slate-200 bg-slate-50 text-slate-700"
                      >
                        {material}
                        <button
                          type="button"
                          onClick={() => handleRemoveMaterial(material)}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {options.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleMultiSelect("tags", tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition ${
                      formData.tags.includes(tag)
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Images */}
          <section className="space-y-4">
            <h2 className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
              Images (array) & main photo
            </h2>

            <div className="space-y-3">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Upload images
              </label>
              <label className="flex items-center justify-center w-full px-4 py-6 border border-dashed border-slate-300 rounded-md cursor-pointer hover:bg-slate-50 transition">
                <div className="text-center">
                  <Upload className="w-7 h-7 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-700">
                    Click to upload
                  </p>
                  <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
                  {uploading && (
                    <p className="mt-1 text-xs text-slate-500">
                      Uploading image(s)...
                    </p>
                  )}
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Or paste an image URL"
                  className="w-full sm:flex-1 px-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:border-slate-700 focus:ring-1 focus:ring-slate-700/20 bg-white text-slate-900 placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium rounded-md border border-slate-300 text-slate-800 hover:bg-slate-50"
                >
                  <Plus size={14} />
                  Add image
                </button>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                  {formData.images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`relative group border rounded-md overflow-hidden bg-slate-50 ${
                        idx === formData.featuredImageIndex
                          ? "border-slate-900"
                          : "border-slate-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Product image ${idx + 1}`}
                        className="w-full h-28 object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex justify-between items-center px-2 py-1 bg-black/40 text-[10px] text-white">
                        <button
                          type="button"
                          onClick={() => setFeaturedImage(idx)}
                          className="px-2 py-0.5 rounded-full border border-white/70 text-[10px] font-medium"
                        >
                          {idx === formData.featuredImageIndex
                            ? "Main photo"
                            : "Set as main"}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="p-1 rounded-full bg-white/90 text-slate-700 shadow-sm"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Status */}
          <section className="space-y-3">
            <h2 className="text-sm font-semibold text-slate-700 tracking-wide uppercase">
              Status
            </h2>

            <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-slate-800"
              />
              <span>Mark as trending</span>
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="isLimitedEdition"
                checked={formData.isLimitedEdition}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-slate-800"
              />
              <span>Limited edition</span>
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                name="isOnSale"
                checked={formData.isOnSale}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-slate-800"
              />
              <span>On sale</span>
            </label>
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 text-sm font-medium rounded-md bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition"
            disabled={loading || uploading}
          >
            <Plus size={18} />
            {loading || uploading ? "Processing..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
