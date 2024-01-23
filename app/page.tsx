import Link from 'next/link'
import Session from './ui/session'
export default function Home() {

  return (
    <>
      <Link href={'/login'}>Login</Link>
      <Link href={'/user'}>Route privée</Link>
      {/* <Session /> */}
    </>
  )
}
