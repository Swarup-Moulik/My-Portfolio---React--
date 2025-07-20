import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a utility function for class names

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(false);
    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    }
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === "dark") {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.add('light');
        }
    }, []);
    return (
        <button onClick={toggleTheme} 
            className={cn(
                "fixed max-sm:hidden top-4 right-5 z-50 p-2 rounded-full transition-colors duration-300",
                "focus:outline-hidden"
        )}>
            {isDark ? <Sun className='w-6 h-6 text-yellow-300' /> : <Moon className='w-6 h-6 text-blue-900' />}
        </button>
    )
}

export default ThemeToggle
