import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavigationProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

export function Navigation({ onSearch, searchQuery }: NavigationProps) {
  const [location] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchQuery);
    setIsSearchOpen(false);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/movies", label: "Movies" },
    { href: "/tv-shows", label: "TV Shows" },
    { href: "/genres", label: "Genres" },
    { href: "/my-list", label: "My List" },
  ];

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link href={href}>
      <span className={`px-3 py-2 text-sm font-medium transition-colors duration-300 hover:text-white ${
        location === href ? "text-white" : "text-gray-400"
      }`}>
        {label}
      </span>
    </Link>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <h1 className="text-2xl font-bold netflix-red">КиноStream</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <NavLink key={item.href} {...item} />
              ))}
            </div>
          </div>

          {/* Search and Profile */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <form onSubmit={handleSearchSubmit} className="hidden sm:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search movies..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="bg-card-grey text-white placeholder-gray-400 px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red w-64 border-gray-600"
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden text-gray-400 hover:text-white"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {/* Profile */}
            <div className="w-8 h-8 bg-netflix-red rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden text-gray-400 hover:text-white">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-deep-black border-gray-800">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <span className="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="sm:hidden pb-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search movies..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="bg-card-grey text-white placeholder-gray-400 px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-netflix-red w-full border-gray-600"
                  autoFocus
                />
                <Button
                  type="submit"
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
