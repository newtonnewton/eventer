import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function PhotoWidgetCropper({setImage, imagePreview}) {
    const cropper = useRef(null);
    function cropImage() {
        console.log(cropper);
        if (typeof cropper.current.getCroppedCanvas() === 'undefined') {
            return;
        }
        cropper.current.getCroppedCanvas().toBlob(blob => {
            setImage(blob);
        }, 'image/jpeg');
    }

    // const cropImage = () => {
    //     const imageElement = cropper?.current;
    //     const cropper: any = imageElement?.cropper;
    //     console.log(cropper.getCroppedCanvas().toDataURL());
    //   };

  return (
    <Cropper
      ref={cropper}
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      // Cropper.js options
      initialAspectRatio={1}
      preview='.img-preview'
      guides={false}
      viewMode = {1}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
    />
  );
};