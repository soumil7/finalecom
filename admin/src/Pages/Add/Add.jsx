import React, { useState } from 'react';
import './Add.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        product: 'Kitchen Products',
    });
    const [image, setImage] = useState(null); // State to handle image file
    const [loading, setLoading] = useState(false);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onImageChangeHandler = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file); // Store the selected image file
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Create FormData and append fields
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('product', data.product);
        if (image) {
            formData.append('image', image); // Append image file
        }

        try {
            const response = await axios.post(`${url}/item/items`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Content type for file upload
                }
            });

            setLoading(false);
            if (response.data.success) {
                toast.success('Product added successfully');
                setData({
                    name: '',
                    description: '',
                    price: '',
                    product: 'Kitchen Products',
                });
                setImage(null); // Reset image after successful upload
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            setLoading(false);
            toast.error('Error while adding product');
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='add'>
            <h2>Add Product</h2>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <label className="add-product-name flex-col">
                    Product Name:
                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name='name'
                        placeholder='Type product name'
                        required
                    />
                </label>

                <label className="add-product-description flex-col">
                    Product Description:
                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows='6'
                        placeholder='Type product description'
                        required
                    ></textarea>
                </label>

                <div className="add-category-price">
                    <label className="add-category flex-col">
                        Product Category:
                        <select
                            onChange={onChangeHandler}
                            name="product"
                            value={data.product}
                        >
                            <option value="Kitchen Products">Kitchen Products</option>
                            <option value="Pooja Products">Pooja Products</option>
                            <option value="Home Decorations">Home Decorations</option>
                            <option value="Fashion Wears">Fashion Wears</option>
                        </select>
                    </label>

                    <label className="add-price flex-col">
                        Product Price:
                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name='price'
                            placeholder='₹0'
                            required
                        />
                    </label>
                </div>

                <label className="add-image flex-col">
                    Product Image:
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={onImageChangeHandler}
                        required
                    />
                </label>

                <button type='submit' className='add-btn' disabled={loading}>
                    {loading ? 'Adding Product...' : 'ADD PRODUCT'}
                </button>
            </form>
        </div>
    );
};

export default Add;
