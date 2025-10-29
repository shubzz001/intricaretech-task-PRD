import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Autocomplete } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ onSave, productToEdit, setProductToEdit, categories }) => {
    const initialFormState = { title: '', price: '', description: '', category: null };
    const [product, setProduct] = useState(initialFormState);
    const navigate = useNavigate();

    useEffect(() => {
        if (productToEdit) {
            setProduct(productToEdit);
        } else {
            setProduct(initialFormState); 
        }
    }, [productToEdit]);

    const handleChange = e => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleCategoryChange = (event, newValue) => {
        setProduct({
            ...product,
            category: newValue,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSave(product);
    };

    const handleCancel = () => {
        setProductToEdit(null);
        setProduct(initialFormState);
        navigate('/products'); 
    };

    return (

        <div className='softCard'>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 3,
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    {productToEdit ? 'Edit Product' : 'Add New Product'}
                </Typography>
                <TextField
                    name="title"
                    label="Title"
                    value={product.title}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="price"
                    label="Price"
                    type="number"
                    value={product.price}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="description"
                    label="Description"
                    value={product.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    variant="standard"
                />
                <Autocomplete
                    value={product.category}
                    onChange={handleCategoryChange}
                    options={categories}
                    getOptionLabel={(option) => option || ''}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Category"
                            name="category"
                            fullWidth
                            variant="standard"
                        />
                    )}
                />
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <Button type="submit" variant="contained">{productToEdit ? 'Update Product' : 'Add Product'}</Button>
                    {productToEdit && <Button type="button" onClick={handleCancel} variant="outlined">Cancel</Button>}
                </Box>
            </Box>
        </div>
    );
};

export default ProductForm;
