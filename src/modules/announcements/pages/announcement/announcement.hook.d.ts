export declare function useAnnouncement(): {
  message: string;
  setMessage: import('react').Dispatch<import('react').SetStateAction<string>>;
  template: string;
  setTemplate: import('react').Dispatch<import('react').SetStateAction<string>>;
  selectedSector: string;
  setSelectedSector: import('react').Dispatch<
    import('react').SetStateAction<string>
  >;
  uploadedImage: File;
  setUploadedImage: import('react').Dispatch<
    import('react').SetStateAction<File>
  >;
  title: string;
  setTitle: import('react').Dispatch<import('react').SetStateAction<string>>;
  id: number;
  opacity: number;
  setOpacity: import('react').Dispatch<import('react').SetStateAction<number>>;
  deferredMessage: string;
  handleAnnouncement: () => Promise<void>;
  identify: string;
  url: string;
  setUrl: import('react').Dispatch<import('react').SetStateAction<string>>;
};
