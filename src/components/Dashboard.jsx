import React, { useMemo } from 'react';
import { Box, Typography, Grid, Card, CardContent, Paper, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatCard = ({ title, value }) => (
    <Card sx={{
        background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
        boxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
        borderRadius: '15px',
        textAlign: 'center',
        height: '100%'
    }}>
        <CardContent>
            <Typography color="text.secondary" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h4" component="div">
                {value}
            </Typography>
        </CardContent>
    </Card>
);

const Dashboard = ({ products = [], categories = [], handleAddNewClick }) => {
    const totalProducts = products.length;
    const totalCategories = categories.length;

    const chartData = useMemo(() => {
        if (!products || !categories) return [];
        const counts = {};
        for (const category of categories) {
            counts[category] = 0;
        }
        for (const product of products) {
            if (product.category) {
                counts[product.category] = (counts[product.category] || 0) + 1;
            }
        }
        return Object.entries(counts).map(([name, count]) => ({ name, count }));
    }, [products, categories]);

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 0 }}>
                    Dashboard
                </Typography>
                <Button variant="contained" onClick={handleAddNewClick}>
                    + Add New Product
                </Button>
            </Box>
            <Grid container spacing={3} sx={{ mb: 4 }}>
<<<<<<< HEAD
                <Grid item xs={12} sm={6}>
                    <StatCard title="Total Products" value={totalProducts} />
                </Grid>
                <Grid item xs={12} sm={6}>
=======
                <Grid xs={12} sm={6}>
                    <StatCard title="Total Products" value={totalProducts} />
                </Grid>
                <Grid xs={12} sm={6}>
>>>>>>> cb7e52386daefa1f1d75da5e9e117ae27f2d7c81
                    <StatCard title="Total Categories" value={totalCategories} />
                </Grid>
            </Grid>

            <Paper sx={{ p: 2, background: 'linear-gradient(145deg, #e6e6e6, #ffffff)', boxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff', borderRadius: '15px' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Products per Category
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#0C66E4" name="Product Count" />
                    </BarChart>
                </ResponsiveContainer>
            </Paper>
        </Box>
    );
};

export default Dashboard;