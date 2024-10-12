'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function ProtectedRoute() {
    const router = useRouter()

    useEffect(()=>{
        const token = localStorage.getItem('AuthinticationToken');
        if(!token){
            router.push('/login')
        }
        router.push('/')

    },[])
    return <>
    
    </>
}
