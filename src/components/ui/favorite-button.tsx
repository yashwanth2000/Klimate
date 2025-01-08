import { WeatherData } from "@/api/types";
import { useFavorite } from "@/hooks/use-favorite";
import { Button } from "./button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavoriteButtonProps {
  data: WeatherData;
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();
  const isFav = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (isFav) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to favorites`);
    }
  };
  return (
    <Button
      variant={isFav ? "default" : "outline"}
      size={"icon"}
      className={isFav ? "bg-yellow-500 hover:bg-yellow-600" : ""}
      onClick={handleToggleFavorite}
    >
      <Star className={`h-4 w-4 ${isFav ? "fill-current" : ""}`} />
    </Button>
  );
};

export default FavoriteButton;
