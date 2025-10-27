<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> cb7e52386daefa1f1d75da5e9e117ae27f2d7c81
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
<<<<<<< HEAD
    TableFooter,
    Paper,
    Button,
    Box,
    Typography,
    TablePagination
} from '@mui/material';

const ProductList = ({ products, onEdit, onDelete, onRowClick }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

=======
    Paper,
    Button,
    Box,
    Typography
} from '@mui/material';

const ProductList = ({ products, onEdit, onDelete }) => {
>>>>>>> cb7e52386daefa1f1d75da5e9e117ae27f2d7c81
    if (!products.length) {
        return (
            <Typography sx={{ mt: 4, textAlign: 'center' }} color="text.secondary">
                No products match your criteria.
            </Typography>
        );
    }

<<<<<<< HEAD
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedProducts = products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className='softCard'>
            <TableContainer component={Paper} sx={{ mt: 3, maxHeight: 550, overflow: 'auto' }}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="product table">
=======
    return (
        <div className='softCard'>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
                <Table sx={{ minWidth: 650 }} aria-label="product table">
>>>>>>> cb7e52386daefa1f1d75da5e9e117ae27f2d7c81
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
<<<<<<< HEAD
                        {paginatedProducts.map((product) => (
                            <TableRow
                                key={product.id}
                                hover
                                onClick={() => onRowClick(product)}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    cursor: 'pointer'
                                }}
=======
                        {products.map((product) => (
                            <TableRow
                                key={product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
>>>>>>> cb7e52386daefa1f1d75da5e9e117ae27f2d7c81
                            >
                                <TableCell component="th" scope="row">
                                    {product.id}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'medium' }}>{product.title}</TableCell>
                                <TableCell>${product.price}</TableCell>
<<<<<<< HEAD
                                <TableCell>
                                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                        {product.category}
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                        <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); onEdit(product); }}>Edit</Button>
                                        <Button size="small" variant="contained" color="secondary" onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}>Delete</Button>
=======
                                <TableCell>{product.category}</TableCell>
                                <TableCell align="right">
                                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                        <Button size="small" variant="outlined" onClick={() => onEdit(product)}>Edit</Button>
                                        <Button size="small" variant="contained" color="secondary" onClick={() => onDelete(product.id)}>Delete</Button>
>>>>>>> cb7e52386daefa1f1d75da5e9e117ae27f2d7c81
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
<<<<<<< HEAD
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={5}
                                count={products.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                sx={{
                                    position: 'sticky',
                                    bottom: 0,
                                    bgcolor: 'background.paper',
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
=======
>>>>>>> cb7e52386daefa1f1d75da5e9e117ae27f2d7c81
                </Table>
            </TableContainer>
        </div>
    );
};

export default ProductList;