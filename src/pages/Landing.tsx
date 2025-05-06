
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ClipboardList } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="bg-primary/10 mx-auto w-20 h-20 rounded-full flex items-center justify-center">
            <ClipboardList className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Task Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your tasks efficiently. Sign up or login to get started.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/register">Sign Up</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
