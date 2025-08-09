import { useState, useEffect } from "react";
import { BirthdayForm, Friend } from "@/components/BirthdayForm";
import { BirthdayList } from "@/components/BirthdayList";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Sparkles, Calendar, Bell } from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/birthday-hero.jpg";

const Index = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  // Load friends from localStorage on component mount
  useEffect(() => {
    const savedFriends = localStorage.getItem('birthday-friends');
    if (savedFriends) {
      setFriends(JSON.parse(savedFriends));
    }
  }, []);

  // Save friends to localStorage whenever friends array changes
  useEffect(() => {
    localStorage.setItem('birthday-friends', JSON.stringify(friends));
  }, [friends]);

  // Check for today's birthdays on load
  useEffect(() => {
    const checkTodaysBirthdays = () => {
      const today = new Date();
      const todayBirthdays = friends.filter(friend => {
        const birthDate = new Date(friend.birthday);
        return today.getMonth() === birthDate.getMonth() && 
               today.getDate() === birthDate.getDate();
      });

      if (todayBirthdays.length > 0) {
        todayBirthdays.forEach(friend => {
          toast.success(`🎉 It's ${friend.name}'s birthday today!`, {
            description: "Don't forget to wish them a happy birthday! 🎂",
            duration: 5000,
          });
        });
      }
    };

    if (friends.length > 0) {
      checkTodaysBirthdays();
    }
  }, [friends]);

  const addFriend = (newFriend: Omit<Friend, 'id'>) => {
    const friend: Friend = {
      ...newFriend,
      id: crypto.randomUUID(),
    };
    setFriends(prev => [...prev, friend]);
  };

  const removeFriend = (id: string) => {
    setFriends(prev => prev.filter(friend => friend.id !== id));
    toast.success("Friend removed from birthday list", {
      description: "You can always add them back later!"
    });
  };

  const todayCount = friends.filter(friend => {
    const today = new Date();
    const birthDate = new Date(friend.birthday);
    return today.getMonth() === birthDate.getMonth() && 
           today.getDate() === birthDate.getDate();
  }).length;

  const upcomingCount = friends.filter(friend => {
    const today = new Date();
    const birthDate = new Date(friend.birthday);
    const currentYear = today.getFullYear();
    let thisYearBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    
    if (thisYearBirthday < today) {
      thisYearBirthday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
    }
    
    const timeDiff = thisYearBirthday.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysDiff > 0 && daysDiff <= 7;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-party">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        <div className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 flex justify-center">
              <Gift className="w-16 h-16 text-primary-foreground animate-bounce-gentle" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl">
              Birthday Reminder
            </h1>
            <p className="mt-6 text-xl leading-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Never miss a special day again! Keep track of your friends' birthdays and make every celebration count.
            </p>
            <div className="mt-8 flex justify-center gap-6">
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-primary-foreground" />
                    <span className="text-sm font-medium text-primary-foreground">Today</span>
                  </div>
                  <div className="text-2xl font-bold text-primary-foreground">{todayCount}</div>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Bell className="w-5 h-5 text-primary-foreground" />
                    <span className="text-sm font-medium text-primary-foreground">This Week</span>
                  </div>
                  <div className="text-2xl font-bold text-primary-foreground">{upcomingCount}</div>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground/10 border-primary-foreground/20 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                    <span className="text-sm font-medium text-primary-foreground">Total Friends</span>
                  </div>
                  <div className="text-2xl font-bold text-primary-foreground">{friends.length}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Form */}
          <div className="space-y-8">
            <BirthdayForm onAddFriend={addFriend} />
          </div>

          {/* Right Column - List */}
          <div className="space-y-8">
            <BirthdayList friends={friends} onRemoveFriend={removeFriend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;