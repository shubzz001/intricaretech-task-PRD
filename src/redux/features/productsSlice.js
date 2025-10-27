import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    getProducts,
    getCategories,
    addProduct,
    updateProduct,
    deleteProduct,
} from '../../api/productApi';

export const fetchInitialData = createAsyncThunk(
    'products/fetchInitialData',
    async (_, { rejectWithValue }) => {
        try {
            const [productsData, categoriesData] = await Promise.all([
                getProducts(),
                getCategories()
            ]);
            return { products: productsData, categories: categoriesData };
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

export const addNewProduct = createAsyncThunk(
    'products/addNewProduct',
    async (product, { rejectWithValue }) => {
        try {
            const newProduct = await addProduct(product);
            return newProduct;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

export const deleteProductById = createAsyncThunk(
    'products/deleteProductById',
    async (id, { rejectWithValue }) => {
        try {
            await deleteProduct(id);
            return id; 
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

export const updateExistingProduct = createAsyncThunk(
    'products/updateExistingProduct',
    async ({ id, productData }, { rejectWithValue }) => {
        try {
            const updatedProduct = await updateProduct(id, productData);
            return updatedProduct;
        } catch (error) {
            return rejectWithValue(error.toString());
        }
    }
);

const initialState = {
    items: [],
    categories: [],
    status: 'idle', 
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitialData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInitialData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.products;
                state.categories = action.payload.categories;
            })
            .addCase(fetchInitialData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addNewProduct.fulfilled, (state, action) => {
                state.items.unshift(action.payload); 
            })
            .addCase(deleteProductById.fulfilled, (state, action) => {
                state.items = state.items.filter((p) => p.id !== action.payload);
            })
            .addCase(updateExistingProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            });
    },
});

export default productsSlice.reducer;