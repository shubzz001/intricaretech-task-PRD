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

const ProductList = ({ products, onEdit, onDelete, onRowClick }) => {
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
                                hover
                                onClick={() => onRowClick(product)}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    cursor: 'pointer'
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'medium' }}>{product.title}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                        {product.category}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                        <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); onEdit(product); }}>Edit</Button>
                                        <Button size="small" variant="contained" color="secondary" onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}>Delete</Button>
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