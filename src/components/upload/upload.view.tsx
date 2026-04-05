import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import { memo, useRef, useState } from "react"
import { toast } from "sonner";

interface Types {
  uploadedImage: string | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const UploadArea = memo(({uploadedImage, setUploadedImage}: Types) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { 
        toast.error("imagem excede tamanho previsto")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        toast.success('imagem selecionada com sucesso')
      }
      reader.readAsDataURL(file)
    }
  }
    const removeImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

    return (
            <Card className="lg:w-[40%] bg-teal-50 dark:bg-emerald-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Cartaz (Opcional)
              </CardTitle>
              <CardDescription>Adicione o seu Cartaz pronto ao comunicado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!uploadedImage ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <Button variant="outline" onClick={() => fileInputRef.current?.click() }>
                      Selecionar Imagem
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">PNG, JPG até 5MB</p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Imagem do comunicado"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={removeImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
    )
})

export default UploadArea;