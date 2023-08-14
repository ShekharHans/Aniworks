import React, { useEffect } from 'react'
import Header from './header'
import { useRouter } from 'next/router'

const AddProduct = () => {
    const router = useRouter()
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            router.push("/login")
        }
    })
    return (
        <>
        <Header/>
        <h1>Add Product</h1>
        </>
    )
}

export default AddProduct