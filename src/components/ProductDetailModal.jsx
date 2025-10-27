import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    CardMedia,
} from '@mui/material';

const ProductDetailModal = ({ product, open, onClose }) => {
    if (!product) {
        return null;
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{product.title}</DialogTitle>
            <DialogContent dividers>
                <CardMedia
                    component="img"
                    height="300"
                    image={product.image || 'https://i.dummyjson.com/v2/images/placeholder.jpg'}
                    alt={product.title}
                    sx={{ objectFit: 'contain', mb: 2, borderRadius: 1 }}
                />
                <Typography gutterBottom variant="h6">
                    ${product.price}
                </Typography>
                <Typography gutterBottom variant="subtitle1" color="text.secondary">
                    Category: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProductDetailModal;
