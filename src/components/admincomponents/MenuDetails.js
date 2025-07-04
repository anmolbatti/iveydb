import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { useParams, useNavigate } from "react-router-dom";
import config from '../../config';

function MenuDetails() {
    const { id } = useParams();
    const [menuItems, setMenuItems] = useState([
        { name: '', mainLink: '', subMenus: [{ name: '', link: '' }] } // Initialize with link key
    ]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [addNew, setAddNew] = useState(true);
    const [menuId, setMenuId] = useState();
    const navigate = useNavigate();

    const fetchMenuDetails = async () => {
        try {
            const response = await axios.get(`${config.BASE_URL}/api/admin/get-menu-items/`, { withCredentials: true });
            
            if (response.data.length > 0) {
                setMenuItems(response.data[0].menuData);
                setMenuId(response.data[0]._id);
                setAddNew(false);
            } else {
                setAddNew(true);
            }
        } catch (err) {
            setError('Failed to fetch location details');
        } finally {
            setLoading(false);
        }
    };

    const handleMenuChange = (index, event) => {
        const newMenuItems = menuItems.map((menuItem, menuIndex) => {
            if (index === menuIndex) {
                return { ...menuItem, [event.target.name]: event.target.value };
            }
            return menuItem;
        });
        setMenuItems(newMenuItems);
    };

    const handleSubMenuChange = (menuIndex, subMenuIndex, event) => {
        const newMenuItems = menuItems.map((menuItem, menuItemIndex) => {
            if (menuIndex === menuItemIndex) {
                const newSubMenus = menuItem.subMenus.map((subMenu, subMenuIndexMapped) => {
                    if (subMenuIndex === subMenuIndexMapped) {
                        return { ...subMenu, [event.target.name]: event.target.value }; // Handle name and link
                    }
                    return subMenu;
                });
                return { ...menuItem, subMenus: newSubMenus };
            }
            return menuItem;
        });
        setMenuItems(newMenuItems);
    };

    const addMenuItem = () => {
        setMenuItems([...menuItems, { name: '', mainLink: '', subMenus: [{ name: '', link: '' }] }]); // Add link here
    };

    const removeMenuItem = (index) => {
        const newMenuItems = menuItems.filter((_, menuIndex) => menuIndex !== index);
        setMenuItems(newMenuItems);
    };

    const addSubMenu = (menuIndex) => {
        const newMenuItems = menuItems.map((menuItem, menuItemIndex) => {
            if (menuIndex === menuItemIndex) {
                return {
                    ...menuItem,
                    subMenus: [...menuItem.subMenus, { name: '', link: '' }] // Add link here
                };
            }
            return menuItem;
        });
        setMenuItems(newMenuItems);
    };

    const removeSubMenu = (menuIndex, subMenuIndex) => {
        const newMenuItems = menuItems.map((menuItem, menuItemIndex) => {
            if (menuIndex === menuItemIndex) {
                const newSubMenus = menuItem.subMenus.filter((_, subMenuIndexMapped) => subMenuIndex !== subMenuIndexMapped);
                return { ...menuItem, subMenus: newSubMenus };
            }
            return menuItem;
        });
        setMenuItems(newMenuItems);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const url = addNew 
                ? `${config.BASE_URL}/api/admin/add-menu-item`
                : `${config.BASE_URL}/api/admin/update-menu-item/${menuId}`;
            const response = await axios[addNew ? 'post' : 'put'](url, menuItems);

            if (response.status === 200) {
                const token = localStorage.getItem('token');
                navigate(token ? '/admin/dashboard' : '/admin/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update menu');
        }
    };

    useEffect(() => {
        fetchMenuDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard project_detail_wrap">
            <div className="container">
                <h1 className="dash_title">Dashboard</h1>
                <div className="main-section">
                    <div className="projects">
                        <div className="projects-inner update_menus">
                            <form onSubmit={handleSubmit} className="update_menus_form">
                                <div className="menuItemsFields">
                                    {menuItems.map((menuItem, menuIndex) => (
                                        <div key={menuIndex} className="singleMenu">
                                            <div className="singleMainMenuItem">
                                                <div className="menuInputField">
                                                    <label>Menu Item</label>
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        placeholder="Enter menu item"
                                                        value={menuItem.name}
                                                        onChange={(event) => handleMenuChange(menuIndex, event)}
                                                    />
                                                </div>

                                                <div className="menuInputField">
                                                    <label>Menu Link</label>
                                                    <input
                                                        name="mainLink"
                                                        type="text"
                                                        placeholder="Enter menu Link"
                                                        value={menuItem.mainLink}
                                                        onChange={(event) => handleMenuChange(menuIndex, event)}
                                                    />
                                                </div>

                                                <button type="button" onClick={() => removeMenuItem(menuIndex)}>
                                                    Remove Menu Item
                                                </button>
                                            </div>

                                            <div className="submenuItems">
                                                {menuItem.subMenus.map((subMenu, subMenuIndex) => (
                                                    <div key={subMenuIndex} className="singleSubMenuItem">
                                                        <div className="menuInputField">
                                                            <label>Sub Menu Name</label>
                                                            <input
                                                                name="name"
                                                                type="text"
                                                                placeholder="Enter sub menu item"
                                                                value={subMenu.name}
                                                                onChange={(event) => handleSubMenuChange(menuIndex, subMenuIndex, event)}
                                                            />
                                                        </div>
                                                        <div className="menuInputField">
                                                            <label>Sub Menu Link</label>
                                                            <input
                                                                name="link"
                                                                type="text"
                                                                placeholder="Enter sub menu link"
                                                                value={subMenu.link}
                                                                onChange={(event) => handleSubMenuChange(menuIndex, subMenuIndex, event)}
                                                            />
                                                        </div>
                                                        <button type="button" onClick={() => removeSubMenu(menuIndex, subMenuIndex)}>
                                                            Remove Submenu
                                                        </button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={() => addSubMenu(menuIndex)} className="addSubmenuItemBtn">Add Submenu</button>
                                            </div>
                                            <hr />
                                        </div>
                                    ))}
                                </div>
                                <div className="menuFormButtons">
                                    <button type="button" onClick={addMenuItem}>Add Menu Item</button>
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MenuDetails;
