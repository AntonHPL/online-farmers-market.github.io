import { FC } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from '@mui/material';
import { NoPhotography } from "@mui/icons-material";
import { AdCardPropsInterface } from "../types";
import { useNavigate } from 'react-router-dom';

const AdCard: FC<AdCardPropsInterface> = ({ ad }) => {
  const navigate = useNavigate();
  const renderParticularAd = (id: string): void => {
    navigate(`/ad/${id}`)
  };

  return (
    <Card className="ad-card-container">
      <CardActionArea
        className="card-action-area"
        onClick={() => renderParticularAd(ad._id)}
      >
        {ad.images.length && ad.images[0].data ?
          <CardMedia
            component="img"
            alt="1"
            // height="140"
            image={`data:image/png;base64,${ad.images[0].data}`}
          /> :
          <NoPhotography />
        }
      </CardActionArea>
      <CardContent className="card-content">
        <>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            onClick={() => renderParticularAd(ad._id)}
            className="product-title"
          >
            {ad.textInfo.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
          >
            {ad.textInfo.price ? `$${ad.textInfo.price}` : "For free"}
          </Typography>
        </>
        <Typography variant="body2">
          {ad.textInfo.category}, {ad.textInfo.subCategory}
          <br />
          By {ad.textInfo.sellerName} from {ad.textInfo.region}, {ad.textInfo.city}
        </Typography>
      </CardContent>
      <CardActions className="card-actions">
        <Button
          onClick={() => renderParticularAd(ad._id)}
          size="large"
        >
          Learn more...
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdCard;