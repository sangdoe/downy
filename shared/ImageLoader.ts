const ImageLoader = ({ src, width, quality }: { src: string, width: number, quality?: number }) => {
  return `https://ik.imagekit.io/aug9rawt76d/tr:w-${width}${src}?w=${width}&q=${quality || 75}`
}
export default ImageLoader