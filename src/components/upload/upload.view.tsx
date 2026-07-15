import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { memo, useRef } from 'react';
import { toast } from 'sonner';

interface Types {
  // Alterado de string para File
  uploadedImage: File | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const UploadArea = memo(({ uploadedImage, setUploadedImage }: Types) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('imagem excede tamanho previsto');
        return;
      }

      // Passa o arquivo diretamente para o estado
      setUploadedImage(file);
      toast.success('imagem selecionada com sucesso');
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="">
      {!uploadedImage ? (
        <div className="">
          <Button
            className=" p-2  bg-teal-50/10 hover:bg-teal-100/20 text-black/70 dark:text-emerald-50"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            Selecionar imagem
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      ) : (
        <div className=" ">
          <Button
            variant="destructive"
            size="icon"
            className=" text-sm p-2 w-auto"
            onClick={removeImage}
          >
            Excluir a imagem
          </Button>
        </div>
      )}
    </div>
  );
});

export default UploadArea;
