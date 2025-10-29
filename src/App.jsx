

import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import SearchBar from './components/SearchFilter';
import ProductDetailModal from './components/ProductDetailModal';
import ToastProvider, { useToast } from './components/ToastProvider';

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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { items: products, categories, status, error } = useSelector((state) => state.products);

    const { showToast } = useToast();

    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('currentUser'));
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        // setIsLoggedIn is already set, so we just ensure user data is loaded
      }
    }, [isLoggedIn]);

    const [activeView, setActiveView] = useState('dashboard');
    const [productToEdit, setProductToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogin = (user) => {
      setCurrentUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      showToast({ message: `Welcome, ${user.username}!`, severity: 'success' });
      setActiveView('dashboard'); // Redirect to dashboard after login
    };

    const handleLogout = () => {
      setCurrentUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem('currentUser');
      showToast({ message: 'Logged out successfully', severity: 'info' });
      navigate('/login'); // Redirect to login page after logout
    };

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
        navigate('/products');
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
      navigate('/add-product');
    };

    const handleAddNewClick = () => {
      setProductToEdit(null);
      // setActiveView('addProduct'); 
      navigate('/add-product');
    };

    const handleRowClick = (product) => {
      setSelectedProduct(product);
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedProduct(null);
    };

    const filteredProducts = useMemo(() => {
      return products
        .filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(p => (selectedCategory ? p.category === selectedCategory : true));
    }, [products, searchTerm, selectedCategory]);

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          <Sidebar
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLogout={handleLogout}
            activeView={activeView}
            setActiveView={setActiveView}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Box component="main" className="main-content" sx={{ flexGrow: 1, p: 3, transition: 'margin-left 0.3s ease', marginLeft: isSidebarOpen ? 0 : '-160px' }}>
            <Container maxWidth="lg">
              <Routes>
                <Route
                  path="/login"
                  element={isLoggedIn ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />}
                />
                <Route
                  path="/register"
                  element={isLoggedIn ? <Navigate to="/" /> : <RegisterPage />}
                />
                <Route
                  path="/"
                  element={
                    isLoggedIn ? (
                      status === 'loading' ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
                      ) : status === 'failed' ? (
                        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
                      ) : (
                        <Dashboard products={products} categories={categories} handleAddNewClick={handleAddNewClick} />
                      )
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/products"
                  element={
                    isLoggedIn ? (
                      status === 'loading' ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
                      ) : status === 'failed' ? (
                        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
                      ) : (
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
                            onRowClick={handleRowClick}
                          />
                        </div>
                      )
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/add-product"
                  element={
                    isLoggedIn ? (
                      <div className="content-container">
                        <ProductForm
                          onSave={handleSaveProduct}
                          productToEdit={productToEdit}
                          setProductToEdit={setProductToEdit}
                          categories={categories}
                        />
                      </div>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              </Routes>
              <ProductDetailModal
                product={selectedProduct}
                open={isModalOpen}
                onClose={handleCloseModal}
              />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <Router>
      <ToastProvider>
        <InnerApp />
      </ToastProvider>
    </Router>
  );
}

export default App;