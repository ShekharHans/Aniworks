import React, { useEffect } from 'react'
import Header from './header'
import { useRouter } from 'next/router'

const UpdateProduct = () => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            router.push("/login")
        }
    })
    return (
        <>
            <Header />
            <h1>Update Product</h1>
        </>
    )
}

export default UpdateProduct