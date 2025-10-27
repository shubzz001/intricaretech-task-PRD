import React from 'react';
import { CgAdd, CgList, CgMenuGridR, CgChevronLeft, CgChevronRight, CgBox } from 'react-icons/cg';
import { useTheme, useMediaQuery, IconButton } from '@mui/material';

const Sidebar = ({ activeView, setActiveView, isSidebarOpen, setIsSidebarOpen, isMobile }) => {
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <CgMenuGridR /> },
        { id: 'productList', label: 'Show Products', icon: <CgList /> },
        { id: 'addProduct', label: 'Add Product', icon: <CgAdd /> },
    ];

    const widthOpen = 220;
    const widthCollapsed = 64;

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
            }}
        >
            <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 12 }}>
                <h2 className="sidebar-title" style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                    <CgBox />
                    {isSidebarOpen && !isSm && <span style={{ fontSize: 16 }}>IntricareTech</span>}
                </h2>
                <IconButton
                    size="small"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    aria-label="toggle sidebar"
                    sx={{ color: 'inherit' }}
                >
                    {isSidebarOpen ? <CgChevronLeft /> : <CgChevronRight />}
                </IconButton>
            </div>
            <ul className="sidebar-nav" style={{ listStyle: 'none', padding: 8, margin: 0 }}>
                {navItems.map(item => (
                    <li
                        key={item.id}
                        className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                        onClick={() => {
                            setActiveView(item.id);
                            if (isMobile) setIsSidebarOpen(false);
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '10px 12px',
                            cursor: 'pointer',
                            borderRadius: 8,
                        }}
                    >
                        <span className="nav-icon" style={{ fontSize: 20 }}>{item.icon}</span>
                        {isSidebarOpen && <span className="nav-label" style={{ fontSize: 14 }}>{item.label}</span>}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;