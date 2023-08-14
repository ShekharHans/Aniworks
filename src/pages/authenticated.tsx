// pages/authenticated.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Dashboard from './dashboard';

function AuthenticatedPage() {
    const router = useRouter();
    // const userInfo = JSON.parse(localStorage.getItem('user-info'));

    useEffect(() => {
        if (!userInfo || !userInfo.token) {
            router.push('/login'); // Redirect to login page if token is not found
        }
    }, [userInfo, router]);

    return (
        <div>
            <h1>Dashboard</h1>
            {userInfo && <Dashboard user-info={userInfo.token} />}
        </div>
    );
}

export default AuthenticatedPage;
