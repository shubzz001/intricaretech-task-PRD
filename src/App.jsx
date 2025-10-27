

import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ThemeProvider, createTheme, CssBaseline, Box, Container,
  Button, CircularProgress, Alert, Typography,
} from '@mui/material';
import './App.css';
import {
  fetchInitialData,
  addNewProduct,
  deleteProductById,
  updateExistingProduct,
} from './redux/features/productsSlice';

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchFilter';
import ToastProvider, { useToast } from './components/ToastProvider';

// Your theme remains the same...
const theme = createTheme({
  palette: {
    primary: {
      main: '#0C66E4',
    },
    secondary: {
      main: '#DE350B',
    },
    background: {
      default: '#F7F8F9',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 2px rgba(9, 30, 66, 0.15)',
        },
      },
    },
  },
})

function App() {
  function InnerApp() {
    const dispatch = useDispatch();
    const { items: products, categories, status, error } = useSelector((state) => state.products);

    const { showToast } = useToast();

    const [activeView, setActiveView] = useState('dashboard');
    const [productToEdit, setProductToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchInitialData());
      }
    }, [status, dispatch]);

    const handleSaveProduct = async (product) => {
      try {
        if (product.id) {
          dispatch(updateExistingProduct({ id: product.id, productData: product }));
          showToast({ message: 'Product updated', severity: 'success' });
        } else {
          dispatch(addNewProduct(product));
          showToast({ message: 'Product added', severity: 'success' });
        }
        setProductToEdit(null);
        setActiveView('productList');
      } catch (err) {
        showToast({ message: 'Failed to save product', severity: 'error' });
        console.error(err);
      }
    };

    const handleDeleteProduct = async (id) => {
      if (window.confirm('Are you sure?')) {
        try {
          dispatch(deleteProductById(id));
          showToast({ message: 'Product deleted', severity: 'danger' });
        } catch (err) {
          showToast({ message: 'Failed to delete product', severity: 'error' });
          console.error(err);
        }
      }
    };

    const handleEditClick = (product) => {
      setProductToEdit(product);
      setActiveView('addProduct');
    };

    const handleAddNewClick = () => {
      setProductToEdit(null);
      setActiveView('addProduct');
    };

    const filteredProducts = useMemo(() => {
      return products
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(p => (selectedCategory ? p.category === selectedCategory : true));
    }, [products, searchTerm, selectedCategory]);

    const renderContent = () => {
      if (status === 'loading') {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
      }

      switch (activeView) {
        case 'productList':
          return (
            <div className="content-container ">
              <div className='softCard'>
                <div className="list-header">
                  <Typography variant="h4" component="h1" gutterBottom>
                    Products
                  </Typography>
                  <Button variant="contained" onClick={handleAddNewClick}>+ Add New Product</Button>
                </div>
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  categories={categories}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
              <ProductList
                products={filteredProducts}
                onEdit={handleEditClick}
                onDelete={handleDeleteProduct}
              />
            </div>
          );
        case 'addProduct':
          return (
            <div className="content-container">
              <ProductForm
                onSave={handleSaveProduct}
                productToEdit={productToEdit}
                setProductToEdit={setProductToEdit}
                categories={categories}
              />
            </div>
          );
        case 'dashboard':
        default:
          return <Dashboard products={products} categories={categories} handleAddNewClick={handleAddNewClick} />;
      }
    };

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <Sidebar
            activeView={activeView}
            setActiveView={setActiveView}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Box component="main" sx={{ flexGrow: 1, p: 3, transition: 'margin-left 0.3s ease', marginLeft: isSidebarOpen ? 0 : '-160px' }}>
            <Container maxWidth="lg">
              {status === 'failed' && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              {renderContent()}
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ToastProvider>
      <InnerApp />
    </ToastProvider>
  );
}

export default App;