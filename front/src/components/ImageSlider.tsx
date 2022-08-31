import { useState, FC, useEffect } from 'react';
import { IconButton, Paper, Skeleton } from "@mui/material";
import { ImageSliderPropsInterface } from '../types';
import { NavigateBefore, NavigateNext, NoPhotography } from '@mui/icons-material';

const ImageSlider: FC<ImageSliderPropsInterface> = ({ ad }) => {
  const [counter, setCounter] = useState(1);
  const [style, setStyle] = useState({ transform: "", transition: "" });
  const [nextButtonClicked, setNextButtonClicked] = useState(false);

  const size = 500;
  useEffect(() => {
    setStyle(prev => {
      return {
        ...prev, transform: `translateX(${-size * counter}px)`
      };
    });
  }, []);

  useEffect(() => {
    setStyle({
      transform: `translateX(${-size * counter}px)`,
      transition: counter === ad?.images.length && !nextButtonClicked || counter === 1 && nextButtonClicked ? "none" : "transform 0.4s ease-in-out"
    });
  }, [nextButtonClicked, counter]);

  return (
    ad ?
      <Paper className="image-slider">
        {ad.images.length ? (
          ad.images.length > 1 ?
            <>
              <div
                className="slides"
                style={style}
                onTransitionEnd={() => {
                  if (ad) {
                    counter === 0 && setCounter(ad.images.length);
                    counter === ad.images.length + 1 && setCounter(1);
                  }
                }}
              >
                <img src={`data:image/png;base64,${ad.images[ad.images.length - 1].data}`} />
                {ad.images.map(el => {
                  return (
                    <img src={`data:image/png;base64,${el.data}`} />
                  )
                })}
                <img src={`data:image/png;base64,${ad.images[0].data}`} />
              </div>
              <div className='buttons'>
                <IconButton onClick={() => {
                  if (ad && counter < 1) return;
                  setCounter(prev => prev - 1);
                  setNextButtonClicked(false);
                }}>
                  <NavigateBefore />
                </IconButton>
                <IconButton onClick={() => {
                  if (ad && counter > ad.images.length) return;
                  setCounter(prev => prev + 1);
                  setNextButtonClicked(true);
                }}>
                  <NavigateNext />
                </IconButton>
              </div>
            </> :
            <div className="slides">
              <img src={`data:image/png;base64,${ad.images[0].data}`} />
            </div>
        )
          :
          <NoPhotography className="no-photo" />
        }
      </Paper> :
      <Skeleton
        variant="rectangular"
        className="skeleton-images"
      />
  );
};

export default ImageSlider;