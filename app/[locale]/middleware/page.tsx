'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from "react"

export default function check(){

    const router = useRouter()
    useEffect(()=>{
         router.push("/users", "/users", { shallow: true })
    },[])
}