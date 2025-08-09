import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Trash2, Gift, Clock } from "lucide-react";
import { Friend } from "./BirthdayForm";

interface FriendCardProps {
  friend: Friend;
  daysUntilBirthday: number;
  isToday: boolean;
  onRemove: (id: string) => void;
}

export function FriendCard({ friend, daysUntilBirthday, isToday, onRemove }: FriendCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric'
    });
  };

  const getBirthdayMessage = () => {
    if (isToday) return "🎉 Birthday Today! 🎉";
    if (daysUntilBirthday === 1) return "Tomorrow! 🎈";
    if (daysUntilBirthday <= 7) return `In ${daysUntilBirthday} days 🗓️`;
    return `In ${daysUntilBirthday} days`;
  };

  const getCardVariant = () => {
    if (isToday) return "animate-glow-pulse bg-gradient-party border-primary shadow-party";
    if (daysUntilBirthday <= 7) return "bg-gradient-card border-secondary/50 shadow-card";
    return "bg-card border-border shadow-card";
  };

  return (
    <Card className={`${getCardVariant()} transition-all duration-300 hover:shadow-party hover:scale-105 group`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-lg ${isToday ? 'text-primary-foreground' : 'text-card-foreground'}`}>
            {friend.name}
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemove(friend.id)}
            className={`opacity-0 group-hover:opacity-100 transition-opacity ${
              isToday ? 'text-primary-foreground hover:text-primary-foreground/80' : ''
            }`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Mail className={`w-4 h-4 ${isToday ? 'text-primary-foreground/80' : 'text-muted-foreground'}`} />
          <span className={`text-sm ${isToday ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>
            {friend.email}
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className={`w-4 h-4 ${isToday ? 'text-primary-foreground/80' : 'text-muted-foreground'}`} />
            <span className={`text-sm ${isToday ? 'text-primary-foreground/90' : 'text-foreground'}`}>
              {formatDate(friend.birthday)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isToday ? (
                <Gift className="w-4 h-4 text-primary-foreground animate-bounce-gentle" />
              ) : (
                <Clock className={`w-4 h-4 ${daysUntilBirthday <= 7 ? 'text-secondary' : 'text-muted-foreground'}`} />
              )}
              <Badge 
                variant={isToday ? "secondary" : daysUntilBirthday <= 7 ? "default" : "outline"}
                className={isToday ? "bg-secondary/20 text-primary-foreground border-primary-foreground/20" : ""}
              >
                {getBirthdayMessage()}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}