"use client"
import React from 'react';
import { useSession } from '../Apis/AppContext'
import { Button } from '@/components/ui/button';
import { Leaf, Play, Users, Sparkles } from 'lucide-react';
import wellnessHero from '../../public/wellnessPic2.jpg';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import "../globals.css";


const Homepage = () => {
  const navigate = useRouter();
  const { user }:any = useSession();
  const features = [
    {
      icon: Play,
      title: 'Create Sessions',
      description: 'Design personalized meditation and yoga experiences'
    },
    {
      icon: Users,
      title: 'Share & Discover',
      description: 'Connect with a community of wellness enthusiasts'
    },
    {
      icon: Sparkles,
      title: 'Transform Lives',
      description: 'Make a positive impact through mindful practices'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative  overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
                  <div className="w-12 h-12 wellness-gradient rounded-2xl flex items-center justify-center animate-wellness-glow">
                    <Leaf className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">Arvyax Wellness</span>
                </div>
                
                <h1 className="text-3xl lg:text-6xl font-bold text-white leading-tight">
                  Transform Lives Through
                  <span className="bg-gradient-to-r from-[#2fc9a2] to-[#c5a1e0] bg-clip-text text-transparent "> Wellness</span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-lg">
                  Create, share, and discover meditation and yoga sessions that inspire 
                  mindfulness and inner peace in our global wellness community.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  variant="ghost" 
                  size="lg"
                  onClick={() => { user ? navigate.push('/dashboard') : navigate.push('/login')}}
                  className="text-lg px-8 py-4 h-auto text-black wellness-gradient font-extrabold"
                >
                  Start Your Journey
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg"
                  onClick={() => { user ? navigate.push('/dashboard') : navigate.push('/register')}}
                  className="text-lg px-8 py-4 h-auto bg-transparent bg-white  text-black font-extrabold"
                >
                  {user ? "Explore Sessions" : "Register"}
                </Button>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <Image 
                  src={wellnessHero} 
                  alt="Wellness meditation scene" 
                  className="w-full rounded-2xl shadow-lavender animate-float"
                />
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 wellness-gradient rounded-full opacity-20 animate-float" />
              <div className="absolute -bottom-6 -left-6 w-20 h-20 calm-gradient hero-gradient rounded-full opacity-30 animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>

        {/* Background Decorations */}
        <div className="absolute -z-10 top-20 left-10 w-32 h-32 bg-gray-800 rounded-full animate-float opacity-60" />
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-slate-700 rounded-full animate-float opacity-40" style={{ animationDelay: '3s' }} />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Arvyax Wellness?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of wellness enthusiasts creating meaningful connections 
              through shared mindfulness practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-[#1C1C1C] rounded-md p-8 text-center group animate-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="w-16 h-16 wellness-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-wellness-glow">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Begin Your Wellness Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our community today and start creating transformative wellness 
            experiences that inspire peace, mindfulness, and inner growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate.push('/register')}
              className="text-lg px-8 py-4 h-auto text-black"
            >
              Create Account
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              onClick={() => { user ? navigate.push('/dashboard') : navigate.push('/login')}}
              className="text-lg px-8 py-4 h-auto text-white hover:text-black"
            >
              {user ? "Browse Sessions" : "Register"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;