import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#services' },
        { label: 'Expertise', href: '#expertise' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (href) => {
        setMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-[#faf5f0]">
            <style>{`
                :root {
                    --color-primary: #0f172a;
                    --color-accent: #f97316;
                    --color-cream: #faf5f0;
                }
                
                html {
                    scroll-behavior: smooth;
                }
                
                ::selection {
                    background-color: #f97316;
                    color: white;
                }
            `}</style>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    isScrolled 
                        ? 'bg-white/80 backdrop-blur-xl shadow-sm' 
                        : 'bg-transparent'
                }`}
            >
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link 
                            to={createPageUrl('Home')}
                            className="text-xl font-semibold text-[#0f172a] tracking-tight"
                        >
                            Eric Fletcher
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => scrollToSection(link.href)}
                                    className="text-sm text-[#0f172a]/70 hover:text-[#f97316] transition-colors duration-300"
                                >
                                    {link.label}
                                </button>
                            ))}
                            <button
                                onClick={() => scrollToSection('#contact')}
                                className="px-5 py-2.5 bg-[#0f172a] text-white text-sm rounded-full hover:bg-[#f97316] transition-all duration-300"
                            >
                                Let's Talk
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-[#0f172a]"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t border-gray-100"
                        >
                            <div className="px-6 py-4 space-y-4">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.label}
                                        onClick={() => scrollToSection(link.href)}
                                        className="block w-full text-left text-[#0f172a] py-2"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                                <button
                                    onClick={() => scrollToSection('#contact')}
                                    className="w-full px-5 py-3 bg-[#0f172a] text-white rounded-full"
                                >
                                    Let's Talk
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-[#0f172a] text-white py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <p className="text-2xl font-semibold mb-2">Eric Fletcher</p>
                            <p className="text-white/60">CSM, CSPO, SAFe SM, POPM, RTE</p>
                        </div>
                        <div className="flex gap-6">
                            {navLinks.slice(0, 4).map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => scrollToSection(link.href)}
                                    className="text-white/60 hover:text-[#f97316] transition-colors text-sm"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/40 text-sm">
                        © {new Date().getFullYear()} Eric Fletcher. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
