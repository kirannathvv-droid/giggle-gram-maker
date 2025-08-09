import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";

export interface Friend {
  id: string;
  name: string;
  email: string;
  birthday: string;
}

interface BirthdayFormProps {
  onAddFriend: (friend: Omit<Friend, 'id'>) => void;
}

export function BirthdayForm({ onAddFriend }: BirthdayFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !birthday) {
      toast.error("Please fill in all fields!");
      return;
    }

    onAddFriend({ name, email, birthday });
    setName("");
    setEmail("");
    setBirthday("");
    toast.success(`Added ${name} to your birthday list! 🎉`, {
      description: "You'll be reminded when their special day arrives!"
    });
  };

  return (
    <Card className="bg-gradient-card shadow-card border-primary/10 hover:shadow-party transition-all duration-300">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl bg-gradient-party bg-clip-text text-transparent">
          <Sparkles className="w-6 h-6 text-primary animate-bounce-gentle" />
          Add a Friend
          <Sparkles className="w-6 h-6 text-primary animate-bounce-gentle" />
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Never miss a birthday again! Add your friends and let the celebrations begin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">
              Friend's Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter their name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="transition-all duration-200 focus:shadow-glow"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="their-email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="transition-all duration-200 focus:shadow-glow"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="birthday" className="text-sm font-medium text-foreground">
              Birthday
            </Label>
            <Input
              id="birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="transition-all duration-200 focus:shadow-glow"
            />
          </div>
          
          <Button 
            type="submit" 
            variant="party" 
            className="w-full group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            Add to Birthday List
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}