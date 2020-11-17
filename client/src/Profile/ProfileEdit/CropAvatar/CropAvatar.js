import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import Cropper from "react-easy-crop";
import { getOrientation } from "get-orientation/browser";
import getCroppedImg from "./cropImage";
import { getRotatedImage } from "./rotateImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./CropAvatar.scss";
import Avatar from "../../../common/Avatar/Avatar";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const CropAvatar = forwardRef((props, ref) => {
  const fileInputRef = useRef(null);
  const [imgConfigs, setconfig] = useState({
    imageSrc: null,
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 1 / 1,
    croppedAreaPixels: null,
    croppedImage: null,
    isCropping: false,
  });

  const onCropChange = (crop) => {
    setconfig({
      ...imgConfigs,
      crop: crop,
    });
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setconfig({
      ...imgConfigs,
      croppedAreaPixels: croppedAreaPixels,
    });
  };

  const onZoomChange = (zoom) => {
    setconfig({
      ...imgConfigs,
      zoom: zoom,
    });
  };

  const onImageDisplayerClick = () => {
    if (imgConfigs.imageSrc) {
      return;
    }
    fileInputRef.current.click();
  };

  useImperativeHandle(ref, () => ({
    showResult: async () => {
      if (imgConfigs.imageSrc === null) {
        return;
      }
      try {
        setconfig(() => ({
          ...imgConfigs,
          isCropping: true,
        }));
        const croppedImage = await getCroppedImg(
          imgConfigs.imageSrc,
          imgConfigs.croppedAreaPixels
        );
        setconfig(() => ({
          ...imgConfigs,
          croppedImage: croppedImage,
          isCropping: false,
        }));
        return croppedImage;
      } catch (e) {
        console.error(e);
        setconfig({
          ...imgConfigs,
          isCropping: false,
        });
      }
    },
  }));

  const deleteResult = () => {
    setconfig({
      ...imgConfigs,
      croppedImage: null,
      isCropping: false,
      imageSrc: null,
    });
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setconfig({
        ...imgConfigs,
        imageSrc: imageDataUrl,
        crop: { x: 0, y: 0 },
        zoom: 1,
      });
    }
  };

  return (
    <div className="CropAvatar" onClick={onImageDisplayerClick}>
      <input
        type="file"
        ref={fileInputRef}
        className="form-control d-none"
        accept="image/*"
        id="avatar"
        name="avatar"
        onChange={(e) => {
          onFileChange(e);
        }}
      />

      {imgConfigs.imageSrc ? (
        <>
          {imgConfigs.isCropping && (
            <div className="spinner-container">
              <FontAwesomeIcon
                className="faSpinner"
                icon={faSpinner}
                size="2x"
                style={{ color: "#00b7d6" }}
                spin
              />
            </div>
          )}

          <div className="crop-container">
            <Cropper
              image={imgConfigs.imageSrc}
              crop={imgConfigs.crop}
              zoom={imgConfigs.zoom}
              aspect={imgConfigs.aspect}
              cropShape="round"
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
            />
          </div>

          <div className="CropAvatar-btn-container d-flex justify-content-between p-1">
            <button
              className="btn btn-primary text-uppercase btn-block m-2"
              onClick={deleteResult}
              disabled={imgConfigs.isCropping}
            >
              {" "}
              <FontAwesomeIcon icon={faTrash} className="faTrash" />
            </button>
          </div>
        </>
      ) : (
        <div className="CropAvatar-currentAvatar">
          <Avatar size="lg" image={props.avatarImage} />
          <p className="pt-2">Change profile picture</p>
        </div>
      )}
    </div>
  );
});

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default CropAvatar;
