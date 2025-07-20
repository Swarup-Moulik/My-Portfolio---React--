import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export const PortfolioContext = createContext();

const PortfolioContextProvider = (props) => {
    const navigate = useNavigate();
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [portfolio, setPortfolio] = useState({});
    const [user, setUser] = useState(localStorage.getItem('user') || '');
    const [loading, setLoading] = useState(false);
    const getPortfolio = async (userIdParam) => {
        try {
            setLoading(true);
            const config = token
                ? { headers: { token } } // include token only if available
                : {};
            const response = await axios.get(`${backendURL}/api/portfolio/list/${userIdParam}`, config);
            if (response.data.success) {
                setPortfolio(response.data.portfolios?.user || response.data.portfolios); // handle both structures
            } else {
                setPortfolio(null);
                toast.error(response.data.message || "Portfolio not found");
            }
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error("Portfolio not found");
                setPortfolio(null);
            } else {
                toast.error("Something went wrong");
            }
            console.error("getPortfolio error:", error);
        } finally {
            setLoading(false); // ✅ end loading
        }
    };
    const handleUpdate = async (field, value, files = {}) => {
        if (!value) return toast.error(`Please enter a value for ${field}`);

        const formData = new FormData();
        formData.append('userId', user);
        formData.append('field', field);
        if (field === "cv") {
            if (!value) return toast.error("No CV file selected");
            formData.append("cv", value); // File object
        }
        else if (field === "projects") {
            try {
                formData.append("value", JSON.stringify(value)); // value should be an array with one project object
            } catch (err) {
                return toast.error("Invalid project data");
            }

            if (files.image) {
                formData.append("image", files.image); // File object
            } else {
                return toast.error("Project image is required");
            }
        }
        else {
            // Generic fields like skills, description, git etc.
            if (typeof value === 'object') {
                formData.append("value", JSON.stringify(value));
            } else {
                formData.append("value", value);
            }
        }
        try {
            await axios.put(`${backendURL}/api/edit/update-field`, formData, { headers: { token } });
            toast.success(`${field} updated successfully`);
            await getPortfolio(user);
        } catch (err) {
            toast.error(`Failed to update ${field}`);
        }
    };
    const handleUpdateAll = async (formObj) => {
        const updates = Object.entries(formObj).filter(([_, val]) => val?.trim());
        if (updates.length === 0) {
            return toast.error("Please enter at least one value to update");
        }
        try {
            for (const [field, value] of updates) {
                const formData = new FormData();
                formData.append('userId', user);
                formData.append('field', field);
                formData.append('value', JSON.stringify(value));
                await axios.put(`${backendURL}/api/edit/update-field`, formData, { headers: { token } });
            }
            toast.success("Updated all filled fields successfully");
            await getPortfolio(user);
        } catch (err) {
            toast.error("Failed to update one or more fields");
        }
    };
    const handleRemoveItem = async (type, value) => {
        if (!["skills", "projects"].includes(type)) {
            return toast.error(`Invalid type: ${type}`);
        }
        try {
            const res = await axios.post(`${backendURL}/api/edit/remove`, {
                userId: user,
                type,
                value,
            }, {
                headers: { token }
            });

            if (res.data.success) {
                toast.success(`Removed ${type}: ${value}`);
                await getPortfolio(user);
            } else {
                toast.error(`Failed to remove ${type}: ${value}`);
            }
        } catch (err) {
            console.error(err);
            toast.error(`Error removing ${type}`);
        }
    };
    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This is irreversible.")) return;

        try {
            await axios.delete(`${backendURL}/api/portfolio/delete-account/${user}`, {
                headers: { token },
            });

            toast.success("Account deleted successfully");
            localStorage.removeItem('token'); // optional
            navigate('/register'); // redirect home or login
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete account");
        }
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        }
    }, [token]);
    const port = portfolio;
    const value = {
        navigate, backendURL, token, setToken, port, setPortfolio, getPortfolio, user, setUser, portfolio, loading,
        handleUpdate, handleUpdateAll, handleRemoveItem, handleDeleteAccount

    }
    return (
        <PortfolioContext.Provider value={value}>
            {props.children}
        </PortfolioContext.Provider>
    )
}

export default PortfolioContextProvider
