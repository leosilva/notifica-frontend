interface Types {
  message: string;
  template: string;
  selectedSector: string;
  uploadedImage: File | null;
  opacity: number;
  title: string;
  url: string;
}
declare const Preview: import('react').MemoExoticComponent<
  ({
    message,
    template,
    selectedSector,
    uploadedImage,
    title,
    opacity,
    url,
  }: Types) => import('react/jsx-runtime').JSX.Element
>;
export default Preview;
