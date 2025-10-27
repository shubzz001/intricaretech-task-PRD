import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Typography
} from '@mui/material';

const ProductList = ({ products, onEdit, onDelete }) => {
    if (!products.length) {
        return (
            <Typography sx={{ mt: 4, textAlign: 'center' }} color="text.secondary">
                No products match your criteria.
            </Typography>
        );
    }

    return (
        <div className='softCard'>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="product table">
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'medium' }}>{product.title}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                        <Button size="small" variant="outlined" onClick={() => onEdit(product)}>Edit</Button>
                                        <Button size="small" variant="contained" color="secondary" onClick={() => onDelete(product.id)}>Delete</Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ProductList;