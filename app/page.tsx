import Link from 'next/link'
import Session from './ui/session'
export default function Home() {

  return (
    <>
      <h1>Home</h1>
      <Link href={'/register'}>Register</Link>
      <Link href={'/login'}>Login</Link>
      <Link href={'/user'}>Route privée</Link>
      {/* <Session /> */}
    </>
  )
}
