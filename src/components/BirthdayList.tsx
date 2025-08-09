import { Friend } from "./BirthdayForm";
import { FriendCard } from "./FriendCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, PartyPopper, Calendar } from "lucide-react";

interface BirthdayListProps {
  friends: Friend[];
  onRemoveFriend: (id: string) => void;
}

export function BirthdayList({ friends, onRemoveFriend }: BirthdayListProps) {
  const calculateDaysUntilBirthday = (birthday: string) => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const birthDate = new Date(birthday);
    
    // Set this year's birthday
    let thisYearBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    
    // If this year's birthday has passed, calculate for next year
    if (thisYearBirthday < today) {
      thisYearBirthday = new Date(currentYear + 1, birthDate.getMonth(), birthDate.getDate());
    }
    
    const timeDiff = thisYearBirthday.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const isToday = (birthday: string) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    return today.getMonth() === birthDate.getMonth() && 
           today.getDate() === birthDate.getDate();
  };

  // Sort friends by days until birthday
  const sortedFriends = [...friends].sort((a, b) => {
    const daysA = calculateDaysUntilBirthday(a.birthday);
    const daysB = calculateDaysUntilBirthday(b.birthday);
    return daysA - daysB;
  });

  const todayBirthdays = friends.filter(friend => isToday(friend.birthday));
  const upcomingBirthdays = friends.filter(friend => !isToday(friend.birthday) && calculateDaysUntilBirthday(friend.birthday) <= 7);

  if (friends.length === 0) {
    return (
      <Card className="bg-gradient-card shadow-card border-primary/10">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-xl mb-2 text-muted-foreground">No friends added yet</CardTitle>
            <CardDescription>
              Add your first friend above to start tracking birthdays!
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Today's Birthdays */}
      {todayBirthdays.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <PartyPopper className="w-6 h-6 text-primary animate-bounce-gentle" />
            <h2 className="text-2xl font-bold text-primary">Today's Birthdays!</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {todayBirthdays.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                daysUntilBirthday={0}
                isToday={true}
                onRemove={onRemoveFriend}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Birthdays */}
      {upcomingBirthdays.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-secondary" />
            <h2 className="text-2xl font-bold text-foreground">This Week</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingBirthdays.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                daysUntilBirthday={calculateDaysUntilBirthday(friend.birthday)}
                isToday={false}
                onRemove={onRemoveFriend}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Friends */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6 text-foreground" />
          <h2 className="text-2xl font-bold text-foreground">All Friends ({friends.length})</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedFriends.map((friend) => (
            <FriendCard
              key={friend.id}
              friend={friend}
              daysUntilBirthday={calculateDaysUntilBirthday(friend.birthday)}
              isToday={isToday(friend.birthday)}
              onRemove={onRemoveFriend}
            />
          ))}
        </div>
      </div>
    </div>
  );
}