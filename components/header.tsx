import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, SignedOut, SignedIn } from '@clerk/nextjs'
import { Button } from './ui/button'
import { FolderOpen, PenBox } from 'lucide-react'
import UserMenu from './UserMenu'

const Header = () => {
  return (
    <header className='flex justify-between container mx-auto'>
        <nav className='py-6 px-4 flex justify-between items-center'>
            <Link href={'/'}>
                <Image src={'/logo.png'} alt='Reflect logo' width={200} height={60}
                className='h-10 w-auto object-contain'
                />
            </Link>
        </nav>
        <div className='flex items-center gap-4'>
            {/* Log in and other  */}
            <SignedIn>
            <Link href='/dashboard#collections'>
                <Button variant='outline' className='flex items-center gap-2'>
                    <FolderOpen size={18}/>
                    <span className='text-black hidden md:inline'>Collections</span>
                </Button>
            </Link>
            </SignedIn>
            
            <Link href='/journal/write'>
                <Button variant='journal' className='flex items-center gap-2'>
                    <PenBox size={18}/>
                    <span className='hidden md:inline'>Write New</span>
                </Button>
            </Link>

            <SignedOut>
                <SignInButton forceRedirectUrl='/dashboard'>
                    <Button variant='outline'>Login</Button>
                </SignInButton>
            </SignedOut>

            <SignedIn>
                <UserMenu />
            </SignedIn>
        </div>
    </header>
  )
}

export default Header
