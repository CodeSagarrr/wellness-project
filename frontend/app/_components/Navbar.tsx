"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSession } from "../Apis/AppContext";
import { 
  Home, 
  BookOpen, 
  PlusCircle, 
  User, 
  LogOut, 
  Leaf,
  Menu,
  X
} from 'lucide-react';
import { useRouter ,  usePathname } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import axios from 'axios';


const Navbar = () => {
  const router = useRouter();
  const location = usePathname();
  const {user , isAuthenticated }:any = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async(e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get("/v1/logout");
      if(response?.status === 200){
        toast.success("User logout");
        router.push("/login")
      }else{
        toast.error(response?.data.message)
      }
    } catch (error : any) {
      console.log("Error from logout function" , error.message)
    }
  }


  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/my-sessions', icon: BookOpen, label: 'My Sessions' },
    { to: '/create-sessions', icon: PlusCircle, label: 'Create Session' },
  ];

  return (
    <nav className=" bg-[#1C1C1C]  border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-semibold text-foreground hover:text-primary transition-colors"
          >
            <div className="w-8 h-8 wellness-gradient rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className='text-white'>Arvyax Wellness</span>
          </Link>

          {isAuthenticated && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {/* Navigation Links */}
                <div className="flex space-x-1 ">
                  {navItems.map(({ to, icon: Icon, label }) => (
                   
                    <Link
                      key={to}
                      href={to}
                      className={ `flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors text-white hover:text-black ${
                          location === to
                            ? 'wellness-gradient text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        }`
                      }
                    >
                      <Icon className="w-5 h-5 " />
                      <span className="text-sm font-medium ">{label}</span>
                    </Link>
                  ))}
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-6">
                  <Button
                    size="icon"
                    className="bg-white text-black w-20 hover:bg-slate-200 "
                  >
                    <User className="w-5 h-5" />
                    {user?.firstname}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="ml-2">Logout</span>
                  </Button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden  flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="rounded-full"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6" />
                  ) : (
                    <Menu className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isAuthenticated && isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-[#1C1C1C]">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  href={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={
                    `flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                      location === to
                        ? 'wellness-gradient text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-base font-medium">{label}</span>
                </Link>
              ))}
              
              {/* Mobile User Actions */}
              <div className="border-t border-border/50 mt-3 pt-3 space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 px-3 py-3 h-auto"
                >
                  <User className="w-5 h-5" />
                  <span className="text-base font-medium">{user?.firstname} ( {user?.email} )</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start space-x-3 px-3 py-3 h-auto text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-base font-medium">Logout</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;