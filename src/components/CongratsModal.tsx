
import React, { useEffect } from 'react';
import { Bell, PartyPopper } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface CongratsModalProps {
  open: boolean;
  onClose: () => void;
}

const CongratsModal: React.FC<CongratsModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2 text-2xl">
            <PartyPopper className="h-6 w-6 text-yellow-500" />
            Congratulations!
            <PartyPopper className="h-6 w-6 text-yellow-500" />
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Bell className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg font-medium">
            Hurray! You've completed all your tasks!
          </p>
          <p className="text-sm text-muted-foreground">
            Time to celebrate or add more tasks to your list.
          </p>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CongratsModal;
