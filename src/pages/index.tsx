
import { Inter } from 'next/font/google'
import HomePage from './homePage'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <HomePage/>
  )
}
