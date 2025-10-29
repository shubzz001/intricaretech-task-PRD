

import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddBoxIcon from '@mui/icons-material/AddBox';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { CgBox } from 'react-icons/cg';
import { useTheme, useMediaQuery } from '@mui/material';


const Sidebar = ({ activeView, setActiveView, isSidebarOpen, setIsSidebarOpen, isMobile, isLoggedIn, currentUser, onLogout }) => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const handleNavigation = (view) => {
        setActiveView(view);
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    const widthOpen = 220;
    const widthCollapsed = 82;

    return (
        <nav
            className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}
            style={{
                width: isSidebarOpen ? widthOpen : widthCollapsed,
                position: isMobile ? 'fixed' : 'relative',
                zIndex: isMobile ? 1400 : 'auto',
                left: isMobile ? (isSidebarOpen ? 0 : `-${widthOpen}px`) : 0,
                top: 0,
                height: '100vh',
                transition: 'all 0.28s ease',
                overflow: 'hidden',
                background: 'transparent',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Box className="sidebar-header" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: '12px', flexShrink: 0 }}>
                <Typography variant="h6" component="h2" className="sidebar-title" sx={{ display: 'flex', alignItems: 'center', gap: 1, m: 0, opacity: isSidebarOpen ? 1 : 0, transition: 'opacity 0.2s' }}>
                    <CgBox />
                    {isSidebarOpen && !isSm && <span style={{ fontSize: 16 }}>IntricareTech</span>}
                </Typography>
                <IconButton
                    size="small"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    aria-label="toggle sidebar"
                    sx={{ color: 'inherit' }}
                >
                    {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>
            <List sx={{ listStyle: 'none', p: 1, m: 0, flexGrow: 1, overflow: 'auto' }}>
                {isLoggedIn ? (
                    <>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                component={Link} to="/"
                                onClick={() => handleNavigation('dashboard')}
                                selected={activeView === 'dashboard'}
                                className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
                                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: '10px 12px', borderRadius: 2 }}
                            >
                                <ListItemIcon className="nav-icon" sx={{ minWidth: 'auto', fontSize: 20 }}><DashboardIcon /></ListItemIcon>
                                {isSidebarOpen && <ListItemText primary="Dashboard" className="nav-label" sx={{ '& .MuiTypography-root': { fontSize: 14 } }} />}
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                component={Link} to="/products"
                                onClick={() => handleNavigation('productList')}
                                selected={activeView === 'productList'}
                                className={`nav-item ${activeView === 'productList' ? 'active' : ''}`}
                                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: '10px 12px', borderRadius: 2 }}
                            >
                                <ListItemIcon className="nav-icon" sx={{ minWidth: 'auto', fontSize: 20 }}><InventoryIcon /></ListItemIcon>
                                {isSidebarOpen && <ListItemText primary="Products" className="nav-label" sx={{ '& .MuiTypography-root': { fontSize: 14 } }} />}
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                component={Link} to="/add-product"
                                onClick={() => handleNavigation('addProduct')}
                                selected={activeView === 'addProduct'}
                                className={`nav-item ${activeView === 'addProduct' ? 'active' : ''}`}
                                sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: '10px 12px', borderRadius: 2 }}
                            >
                                <ListItemIcon className="nav-icon" sx={{ minWidth: 'auto', fontSize: 20 }}><AddBoxIcon /></ListItemIcon>
                                {isSidebarOpen && <ListItemText primary="Add Product" className="nav-label" sx={{ '& .MuiTypography-root': { fontSize: 14 } }} />}
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton component={Link} to="/login" className="nav-item" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: '10px 12px', borderRadius: 2 }}>
                                <ListItemIcon className="nav-icon" sx={{ minWidth: 'auto', fontSize: 20 }}><LoginIcon /></ListItemIcon>
                                {isSidebarOpen && <ListItemText primary="Login" className="nav-label" sx={{ '& .MuiTypography-root': { fontSize: 14 } }} />}
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton component={Link} to="/register" className="nav-item" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: '10px 12px', borderRadius: 2 }}>
                                <ListItemIcon className="nav-icon" sx={{ minWidth: 'auto', fontSize: 20 }}><PersonAddIcon /></ListItemIcon>
                                {isSidebarOpen && <ListItemText primary="Register" className="nav-label" sx={{ '& .MuiTypography-root': { fontSize: 14 } }} />}
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
            <Box sx={{ mt: 'auto' }}>
                {isLoggedIn && (
                    <List sx={{ p: 1 }}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={onLogout} className="nav-item" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: '10px 12px', borderRadius: 2 }}>
                                <ListItemIcon className="nav-icon" sx={{ minWidth: 'auto', fontSize: 20 }}><LogoutIcon /></ListItemIcon>
                                {isSidebarOpen && <ListItemText primary="Logout" className="nav-label" sx={{ '& .MuiTypography-root': { fontSize: 14 } }} />}
                            </ListItemButton>
                        </ListItem>
                    </List>
                )}
                {isSidebarOpen && currentUser && (
                    <Box sx={{ p: 2, borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Logged in as: <strong>{currentUser.username}</strong>
                        </Typography>
                    </Box>
                )}
            </Box>
        </nav>
    );
};

export default Sidebar;
