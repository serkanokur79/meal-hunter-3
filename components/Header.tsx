
'use client';
import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from './ui/button';
import { FileHeart, Moon, Sun, Utensils } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useTheme } from 'next-themes';
// import { useUserStore } from '@/store/useUserStore';

const Header = () => {
  const { setTheme } = useTheme();
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Utensils className="h-6 w-6" />
          <span className="text-xl font-bold">Meal Hunter</span>
        </Link>

        <nav className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <div className="flex flex-row gap-4">
                <Link
                  href="/favorites"
                  className="flex items-center space-x-1 text-sm"
                >
                  <FileHeart className="h-4 w-4" />
                  <span className="hidden sm:inline">My Favorites</span>
                </Link>
            
              <UserButton />  </div>
            </SignedIn>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
