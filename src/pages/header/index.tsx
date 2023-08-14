import { useEffect, useState } from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Link from "next/link";
import { useRouter } from "next/router";


function Header() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        const userInfo = localStorage.getItem('user-info');
        setUserLoggedIn(userInfo !== null);
    }, []);
    const router = useRouter()

    function deleteProfile() {
        localStorage.clear();
        router.push("/addProduct")
    }
    function logOut(){
        router.push("/login")
    }
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className="d-flex justify-around px-5" >
                <Navbar.Brand href="/homePage">Navbar</Navbar.Brand>
                <Nav className="me-auto nav_bar_wrapper ">
                    {userLoggedIn ? (
                        <>
                            <Link href="/addProduct" className="pr-4 text-decoration-none text-success-emphasis">Add Product</Link>
                            <Link href="/updateProduct" className="pr-4 text-decoration-none text-success-emphasis">Update Product</Link>
                            <Link href="/dashboard" className="pr-4 text-decoration-none text-success-emphasis">Dashboard</Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="pr-4 text-decoration-none text-success-emphasis">Log In</Link>
                        </>
                    )}
                </Nav>
                {userLoggedIn ?
                    <>
                        <Nav className="pl-3">
                            <NavDropdown title="User Name">
                                <NavDropdown.Item onClick={logOut}>Log Out</NavDropdown.Item>
                                <NavDropdown.Item onClick={deleteProfile}>Delete Profile</NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                    </>
                    : null}
            </Navbar>
        </>
    );
}

export default Header;
