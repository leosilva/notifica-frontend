export interface Types {
  message: string;
  setMessage: (value: string) => void;
  template: string;
  setTemplate: (value: string) => void;
  uploadedImage: File | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
  title: string;
  setTitle: (value: string) => void;
  id: number | null;
  opacity: number;
  setOpacity: (value: number) => void;
  url?: string;
  setUrl: (value: string) => void;
}
declare const AdminMessageArea: import('react').MemoExoticComponent<
  (props: Types) => import('react/jsx-runtime').JSX.Element
>;
export default AdminMessageArea;
