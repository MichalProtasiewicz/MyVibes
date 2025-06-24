import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardActionArea,
} from '@mui/material';
import { Link } from 'react-router-dom';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FavoriteButton from './FavoriteButton';
import type { SpotifySearchItem } from '../types/spotify.ts';

interface SearchCardProps {
  item: SpotifySearchItem;
}

const CardElement: React.FC<SearchCardProps> = ({ item }) => {
  const imgs = item.type === 'track' ? item.album.images : item.images;
  const thumb = imgs?.[imgs.length - 2]?.url;

  const subtitle =
    (item.type === 'track' || item.type === 'album') && item.artists
      ? item.artists.map((a) => a.name).join(', ')
      : null;

  return (
    <Card className="w-[320px] relative">
      <FavoriteButton item={item} />
      <CardActionArea component={Link} to={`/details/${item.type}/${item.id}`}>
        {thumb && (
          <CardMedia
            component="img"
            className="w-full h-[320px]"
            image={thumb}
            alt={item.name}
          />
        )}
        <CardContent>
          <Typography variant="h6" gutterBottom noWrap>
            {item.name}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="textSecondary" noWrap>
              {subtitle}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions className="justify-end">
        <Button
          size="small"
          endIcon={<OpenInNewIcon />}
          href={item.external_urls.spotify}
          target="_blank"
        >
          Spotify
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardElement;
