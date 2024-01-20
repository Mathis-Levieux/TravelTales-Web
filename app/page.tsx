import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Link href={'/login'}>Login</Link>
      <Link href={'/user'}>Route privée</Link>
    </>
  )
}
