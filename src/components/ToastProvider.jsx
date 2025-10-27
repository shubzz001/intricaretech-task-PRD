import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Snackbar, Paper, Alert, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ToastContext = createContext({ showToast: () => { } });
export const useToast = () => useContext(ToastContext);

const getBackground = (severity) => {
    switch (severity) {
        case 'success':
            return 'linear-gradient(145deg, #dff6e6, #b7efcc)'; // soft green
        case 'warning':
            return 'linear-gradient(145deg, #fff4e0, #ffe0b2)'; // soft amber
        case 'error':
        case 'danger':
            return 'linear-gradient(145deg, #ffe6e6, #ff4a4aff)'; // soft red
        case 'primary':
        default:
            return 'linear-gradient(145deg, #e7f0ff, #1d70ffff)'; // soft blue (primary)
    }
};

const ToastProvider = ({ children }) => {
    const [queue, setQueue] = useState([]);
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        if (!current && queue.length) {
            setCurrent(queue[0]);
            setQueue((q) => q.slice(1));
        }
    }, [queue, current]);

    const showToast = useCallback(({ message = '', severity = 'primary', duration = 4000 } = {}) => {
        setQueue((q) => [...q, { key: Date.now() + Math.random(), message, severity, duration }]);
    }, []);

    const handleClose = () => setCurrent(null);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {current && (
                <Snackbar
                    key={current.key}
                    open
                    autoHideDuration={current.duration}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    onClose={handleClose}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            p: 0,
                            background: getBackground(current.severity),
                            boxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
                            borderRadius: 2,
                            minWidth: 280,
                            overflow: 'hidden',
                        }}
                    >
                        <Alert
                            onClose={handleClose}
                            severity={current.severity === 'danger' ? 'error' : current.severity}
                            sx={{
                                m: 0,
                                background: 'transparent',
                                color: 'rgba(0,0,0,0.85)',
                                padding: '10px 12px',
                                alignItems: 'center',
                                boxShadow: 'none',
                                '& .MuiAlert-icon': {
                                    color: 'rgba(0,0,0,0.6)'
                                }
                            }}
                            variant="standard"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={handleClose}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            }
                        >
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {current.message}
                            </Typography>
                        </Alert>
                    </Paper>
                </Snackbar>
            )}
        </ToastContext.Provider>
    );
};

export default ToastProvider;