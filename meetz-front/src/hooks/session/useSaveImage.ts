import html2canvas from "html2canvas";
import sendImageToServer from "../../apis/session/sendImagesToServer";

const useSaveImage = () => {
  const addImageToLocalStorage = (imageBase64: string) => {
    const images = JSON.parse(localStorage.getItem("images") || "[]");
    images.push(imageBase64);
    localStorage.setItem("images", JSON.stringify(images));
  };
  const saveImageToLocalStorage = (key: string, imageBase64: string) => {
    localStorage.setItem(key, imageBase64);
  };
  const base64ToBlob = (
    base64: string,
    contentType: string = "",
    sliceSize: number = 512
  ): Blob => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const addImagesToFormData = (): FormData => {
    const images = JSON.parse(localStorage.getItem("images") || "[]");
    const formData = new FormData();

    images.forEach((imageBase64: string, index: number) => {
      const blob = base64ToBlob(imageBase64, "image/jpeg");
      const file = new File([blob], `image${index}.jpg`, {
        type: "image/jpeg",
      });
      formData.append("image", file);
    });

    return formData;
  };

  const compositionImage = async (
    element1: HTMLElement | null,
    element2: HTMLElement | null
  ): Promise<string> => {
    if (element1 && element2) {
      const canvas1 = await html2canvas(element1);
      const blob1 = await new Promise<Blob | null>((resolve) =>
        canvas1.toBlob(resolve, "image/jpeg")
      );

      const canvas2 = await html2canvas(element2);
      const blob2 = await new Promise<Blob | null>((resolve) =>
        canvas2.toBlob(resolve, "image/jpeg")
      );

      if (blob1 && blob2) {
        const img1 = new Image();
        img1.src = URL.createObjectURL(blob1);

        const img2 = new Image();
        img2.src = URL.createObjectURL(blob2);

        return new Promise<string>((resolve) => {
          img1.onload = () => {
            img2.onload = () => {
              const mirroredCanvas1 = document.createElement("canvas");
              const mirroredCanvas2 = document.createElement("canvas");

              mirroredCanvas1.width = img1.width;
              mirroredCanvas1.height = img1.height;
              mirroredCanvas2.width = img2.width;
              mirroredCanvas2.height = img2.height;

              const ctx1 = mirroredCanvas1.getContext("2d");
              const ctx2 = mirroredCanvas2.getContext("2d");

              if (ctx1) {
                ctx1.translate(mirroredCanvas1.width, 0);
                ctx1.scale(-1, 1);
                ctx1.drawImage(img1, 0, 0);
              }

              if (ctx2) {
                ctx2.translate(mirroredCanvas2.width, 0);
                ctx2.scale(-1, 1);
                ctx2.drawImage(img2, 0, 0);
              }

              const finalCanvas = document.createElement("canvas");
              finalCanvas.width = mirroredCanvas1.width + mirroredCanvas2.width;
              finalCanvas.height = Math.max(
                mirroredCanvas1.height,
                mirroredCanvas2.height
              );

              const finalCtx = finalCanvas.getContext("2d");
              if (finalCtx) {
                finalCtx.drawImage(mirroredCanvas1, 0, 0);
                finalCtx.drawImage(mirroredCanvas2, mirroredCanvas1.width, 0);

                const finalBase64 = finalCanvas.toDataURL("image/jpeg");
                resolve(finalBase64);
              } else {
                resolve("");
              }
            };
          };
        });
      }
    }
    return "";
  };
  const sendImage = async (selectedFrame:number) => {
    if (
      !localStorage.getItem("images") ||
      localStorage.getItem("images") === "[]"
    ) {
      return;
    }
    const formData: FormData = addImagesToFormData();
    await sendImageToServer(formData,selectedFrame);
  };
  return {
    addImageToLocalStorage,
    saveImageToLocalStorage,
    compositionImage,
    sendImage,
  };
};
export default useSaveImage;
