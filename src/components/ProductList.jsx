import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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

    if (!products.length) {
        return (
            <Typography sx={{ mt: 4, textAlign: 'center' }} color="text.secondary">
                No products match your criteria.
            </Typography>
        );
    }

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
            <TableContainer component={Paper} sx={{ mt: 3, maxHeight: 500, overflow: 'auto' }}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="product table">
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
                        {paginatedProducts.map((product) => (
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
                </Table>
            </TableContainer>
        </div>
    );
};

export default ProductList;