// components/Dashboard.js

import { useEffect, useState } from 'react';
import { getDashboardData } from '../api';

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const userToken = 'your_token_here'; // Retrieve the token from the API response
    const userInfo = {
        token: userToken,
        // Other user information you might want to store
    };

    localStorage.setItem('user-info', JSON.stringify(userInfo));
    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const data = await getDashboardData();
                setDashboardData(data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        }

        fetchDashboardData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {dashboardData ? (
                <pre>{JSON.stringify(dashboardData, null, 2)}</pre>
            ) : (
                <p>Loading dashboard data...</p>
            )}
        </div>
    );
}

export default Dashboard;
