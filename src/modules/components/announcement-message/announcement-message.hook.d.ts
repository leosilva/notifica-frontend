export interface TypesHook {
  setMessage: (value: string) => void;
  setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
  setTitle: (value: string) => void;
  id: number;
  uploadedImage: File | null;
}
export declare function useAnnouncementMessage({
  setMessage,
  setTitle,
  setUploadedImage,
  uploadedImage,
  id,
}: TypesHook): {
  removeImage: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
