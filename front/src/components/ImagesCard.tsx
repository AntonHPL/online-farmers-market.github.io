import { useState, useEffect, FC, DragEvent } from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import {
  Alert,
  Backdrop,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from "@mui/icons-material/Delete";
import { ImagesCardPropsInterface } from '../types';

const ImagesCard: FC<ImagesCardPropsInterface> = ({ adIsCreated, creationDate, setAdIsCreated, images, setImages, mainPictureId, setMainPictureId }) => {
  const [imagesToUpload, setImagesToUpload] = useState<FileList | null>(null);
  const [imagesUploaded, setImagesUploaded] = useState(0);
  const [imagesBeingUploaded, setImagesBeingUploaded] = useState(0);
  const [imageBeingRemoved, setImageBeingRemoved] = useState("");
  const [imagesError, setImagesError] = useState(false);

  const IMAGES_LIMIT = 4;

  useEffect(() => {
    if (imagesToUpload) {
      const fd = new FormData();
      fd.append("creationDate", creationDate);
      const spaceLeft = IMAGES_LIMIT - imagesUploaded;
      const condition = imagesToUpload.length + imagesUploaded <= IMAGES_LIMIT;
      if (condition) {
        for (let i = 0; i < imagesToUpload.length; i++) {
          fd.append("imagesInput", imagesToUpload[i]);
        };
        setImagesBeingUploaded(imagesToUpload.length);
      } else {
        for (let i = 0; i < spaceLeft; i++) {
          fd.append("imagesInput", imagesToUpload[i]);
        };
        setImagesBeingUploaded(spaceLeft);
        setImagesError(true);
      };
      if (adIsCreated) {
        axios
          .put("/api/images", fd)
          .then(() => {
            setImagesUploaded(prev => condition ? prev + imagesToUpload.length : prev + spaceLeft);
            getImages();
          })
          .catch(error => console.error("The error occured: ", error.message))
      } else {
        axios
          .post("/ad", fd)
          .then(() => {
            setImagesUploaded(prev => condition ? prev + imagesToUpload.length : prev + spaceLeft);
            setAdIsCreated(true);
            getImages();
          })
          .catch(error => console.error("The error occured: ", error.message));
      };
    };
  }, [imagesToUpload]);

  useEffect(() => {
    !mainPictureId && setDefaultMainPictureId();
  }, [images]);

  const Input = styled('input')({
    display: 'none',
  });

  const setDefaultMainPictureId = (): void => {
    images && setMainPictureId(images[0].id)
  };

  const getImages = (): void => {
    axios
      .get(`/api/images/${creationDate}`)
      .then(({ data }) => {
        setImages(data[0].images);
        setImagesBeingUploaded(0);
        setImageBeingRemoved("");
      })
      .catch(error => {
        console.error("The error occured: ", error.message);
        setImagesBeingUploaded(0);
        setImageBeingRemoved("");
      })
  };

  const deleteImage = (id: string): void => {
    setImageBeingRemoved(id);
    if (imagesUploaded === 1) {
      axios
        .delete(`/api/ad/${creationDate}`)
        .then(() => {
          setImagesUploaded(prev => prev - 1);
          setImages(null);
          setImageBeingRemoved("");
          setAdIsCreated(false);
          id === mainPictureId && setMainPictureId("");
          setImagesError(false);
        })
        .catch(error => console.error("The error occured: ", error.message));
    } else {
      axios
        .put(`/api/images/${id}`, { creationDate })
        .then(() => {
          setImagesUploaded(prev => prev - 1);
          getImages();
          setImagesError(false);
          id === mainPictureId && setMainPictureId("");
        })
        .catch(error => console.error("The error occured: ", error.message));
    };
  };

  const onDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setImagesToUpload(e.dataTransfer.files);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  return (
    <>
      <Typography variant="h5">
        Photos
      </Typography>
      <Card
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="images-card"
      >
        <CardActions>
          <label htmlFor="icon-button-file">
            <Input
              id="icon-button-file"
              accept="image/*"
              type="file"
              name="imagesInput"
              onChange={e => setImagesToUpload(e.target.files)}
              multiple
            />
            <Button
              disabled={imagesUploaded === 4}
              color="primary"
              aria-label="upload picture"
              component="span"
              startIcon={<PhotoCamera />}
              sx={{ textTransform: "none" }}
            >
              Click to add photos...
            </Button>
          </label>
        </CardActions>
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            ...or drop them here.
          </Typography>
        </CardContent>
        <div className="images">
          {images?.map((e, i) => {
            return (
              <Tooltip title="Click to make the picture the main one.">
                <Card
                  className={`${mainPictureId === e.id ? "main-" : ""}image-card ${imageBeingRemoved ? "no-pointer-events" : ""}`}
                  onMouseOver={() => { }}
                >
                  <IconButton
                    aria-label="delete"
                    className="delete-button"
                    onClick={() => deleteImage(e.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Backdrop
                    open={imageBeingRemoved === e.id}
                    className="backdrop"
                  >
                    <CircularProgress />
                  </Backdrop>
                  <CardActionArea onClick={() =>
                    setMainPictureId(e.id)
                  }>
                    <CardMedia
                      component="img"
                      image={`data:image/png;base64,${e.data}`}
                      id={e.id}
                      alt={String(i)}
                    />
                  </CardActionArea>
                </Card>
              </Tooltip>
            )
          })}
          {function () {
            let content = [];
            for (let i = 0; i < imagesBeingUploaded; i++) {
              content.push(
                <Card
                  key={i}
                  className={i === 0 && !imagesUploaded ? "first-loading-card" : "loading-card"}
                >
                  <CircularProgress />
                </Card>
              );
            };
            return content;
          }()}
        </div>
        {imagesError &&
          <Alert
            severity="error"
            className="alert"
          >
            You have tried to add too many (4+) pictures. That exceeds the limit.
          </Alert>
        }
      </Card>
    </>
  );
};

export default ImagesCard;