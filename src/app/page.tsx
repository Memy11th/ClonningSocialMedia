'use client'
import { State } from "@/interfaces/State"

import {  useSelector } from "react-redux"

export default function Home() {
  const data = useSelector((state:State)=>state.user.fName)
 
  return <>
  {data}
  </>
}
