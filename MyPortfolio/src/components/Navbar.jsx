import React, { useState, useEffect, useContext } from "react";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";


const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeskMenu, setIsDeskMenu] = useState(false);
    const { navigate, setToken, portfolio } = useContext(PortfolioContext);
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.screenY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const onClickHandler1 = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
    }
    const onClickHandler2 = () => {
        navigate('/register');
        localStorage.removeItem('token');
        setToken('');
    }
    const onClickHandler3 = () => {
        navigate('/editVerify');
        localStorage.removeItem('token');
        setToken('');
    }
    return (
        <nav className={cn("fixed w-full z-40 transition-all duration-300",
            isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
        )}>
            <div className="container flex items-center justify-between">
                <a className="text-xl font-bold text-primary flex items-center" href="#hero">
                    <span className="relative z-10">
                        <span className="text-glow text-foreground">{portfolio?.firstName || 'FirstName'} {portfolio?.lastName || 'LastName'}</span> Portfolio
                    </span>
                </a>
                {/* ---Desktop Navbar--- */}
                <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item, key) => (
                        <a key={key} href={item.href} className="text-foreground/80 hover:text-primary transition-colors duration-300">
                            {item.name}
                        </a>
                    ))}
                    <button
                        onClick={() => setIsDeskMenu((prev) => !prev)}
                        className="p-2 text-foreground z-50"
                        aria-label={isDeskMenu ? "Close menu" : "Open menu"}
                    >
                        {isDeskMenu ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <div className={cn("fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
                        "transition-all duration-300 space-y-8 text-3xl",
                        isDeskMenu ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    )}>
                        <div className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            onClick={onClickHandler3}
                        >
                            Edit Your Portfolio
                        </div>
                        <div className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            onClick={onClickHandler2}
                        >
                            Create Your Own
                        </div>
                         <div className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            onClick={onClickHandler1}
                        >
                            Log Out
                        </div>
                    </div>
                </div>
                {/* ---Mobile Navbar--- */}
                <button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="md:hidden p-2 text-foreground z-50"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className={cn("fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
                    "md:hidden transition-all duration-300",
                    isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                )}>
                    <div className="flex flex-col space-y-8 text-xl">
                        {navItems.map((item, key) => (
                            <a
                                key={key}
                                href={item.href}
                                className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <div className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            onClick={onClickHandler3}
                        >
                            Edit Your Portfolio
                        </div>
                        <div className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            onClick={onClickHandler2}
                        >
                            Create Your Own
                        </div>
                         <div className="text-foreground/80 hover:text-primary transition-colors duration-300"
                            onClick={onClickHandler1}
                        >
                            Log Out
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
