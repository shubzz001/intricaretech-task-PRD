import { CgAdd, CgList, CgMenuGridR, CgChevronLeft, CgChevronRight, CgBox } from 'react-icons/cg';

const Sidebar = ({ activeView, setActiveView, isSidebarOpen, setIsSidebarOpen }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: <CgMenuGridR /> },
        { id: 'productList', label: 'Show Products', icon: <CgList /> },
        { id: 'addProduct', label: 'Add Product', icon: <CgAdd /> },
    ];

    return (
        <nav className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
            <div className="sidebar-header">
                <h2 className="sidebar-title">
                    <CgBox />
                </h2>
                <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <CgChevronLeft /> : <CgChevronRight />}
                </button>
            </div>
            <ul className="sidebar-nav">
                {navItems.map(item => (
                    <li
                        key={item.id}
                        className={`nav-item ${activeView === item.id ? 'active' : ''}`}
                        onClick={() => setActiveView(item.id)}
                    >
                        <span className="nav-icon">{item.icon}</span>
                        <span className="nav-label">{item.label}</span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;