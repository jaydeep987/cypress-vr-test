export function stopGif(element) {
  const canvas = document.createElement('canvas');
  const isCanvas = !!(canvas.getContext && canvas.getContext('2d'));
  const styles = getComputedStyle(element);
  const positionInfo = element.getBoundingClientRect();
  let imgSrc;
  let img;

  if (!isCanvas) {
    return;
  }

  canvas.width = positionInfo.width;
  canvas.height = positionInfo.height;

  // If it's an image, we can directly use it to drawImage in canvas
  if (element.nodeName.toLowerCase() === 'img') {
    canvas.getContext('2d').drawImage(element as CanvasImageSource, 0, 0, canvas.width, canvas.height);
    (element as HTMLImageElement).src = canvas.toDataURL();

    return;
  }

  // Get gif url from css
  imgSrc = styles.backgroundImage || styles.background;
  imgSrc = /(?:\(['"]?)(.*?)(?:['"]?\))/g.exec(imgSrc)[1];
  // We need image element to draw in canvas
  img = new Image();
  img.onload = () => {
    canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
    element.style.backgroundImage = `url(${canvas.toDataURL()})`;
  };
  img.src = imgSrc;
}
