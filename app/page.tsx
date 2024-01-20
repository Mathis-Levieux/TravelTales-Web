import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import Profil from './ui/profil'
import { Suspense } from 'react'

export default function Home() {
  return (
    <>
      <Link href={'/login'}>Login</Link>
      <Link href={'/user'}>Route privée</Link>
    </>
  )
}
