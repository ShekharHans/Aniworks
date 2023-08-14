
import { useState, useEffect } from 'react'; // Import useEffect
import { validateUser } from '../api';
import { useRouter } from 'next/router';
import Header from '../header';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

export default function Login() {

    const [username, setUsername] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [validationResult, setValidationResult] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Try to get the device's IP address
        fetch('https://api.ipify.org?format=json')
            .then((response) => response.json())
            .then((data) => {
                setDeviceId(data.ip); // Use the IP address as the device ID
            })
            .catch((error) => {
                console.error('Error getting IP address:', error);
            });

    }, []);

    const handleValidation = async () => {
        if (!username || !deviceId) {
            // Check if any of the fields is empty
            toast.error('All input fields are required');
            return;
        }
        else if (!username.includes('@')) {
            toast.error('Enter a valid email');
            return;
        }
        else {
            router.push('/otp'); // Change '/otp-page' to the actual page URL
        }
        try {
            const result = await validateUser(username, deviceId);
            setValidationResult(result);

            if (result.status === 'ok') {
                // Store the email in local storage
                localStorage.setItem('userEmail', username);
            }
        } catch (error) {
            console.error('Error validating user:', error);
        }
    };
    useEffect(() => {
        // Store the email in local storage whenever the username changes
        localStorage.setItem('userEmail', username);
    }, [username]); 

    return (
        <>
            <Header />
            <h1 className='d-flex justify-center'>Login Page</h1>
            <div className="col-sm-6 offset-sm-3 flex-column">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                {/* <input
                    className="form-control"
                    type="text"
                    placeholder="Device ID"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    required
                /> */}
                <br />
            </div>
            <div className='d-flex justify-center'>
                <button onClick={handleValidation} className="btn btn-primary">Send Otp</button>
                {validationResult && <pre>{JSON.stringify(validationResult, null, 2)}</pre>}
            </div>
            <ToastContainer />

        </>
    );
}
