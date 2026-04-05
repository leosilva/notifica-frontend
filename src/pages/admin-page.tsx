import { useDeferredValue, useState } from 'react';
import { Header, AdminMessageArea, AdminPreview, Upload,SubmitButton } from '../components';

export function AdminPage() {
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState(
    'linear-gradient(135deg, rgb(0, 180, 166), rgb(0, 139, 122))',
  );
  const [selectedSector, setSelectedSector] = useState('');
  const deferredMessage = useDeferredValue(message);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-emerald-50/30 to-teal-50/20 dark:from-green-600/20 dark:via-emerald-600/10 dark:to-teal-600/5 relative overflow-hidden ">
      <Header frase="Painel Administrativo" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8">

          <div className='flex flex-col lg:flex-row w-full justify-between gap-3'><AdminMessageArea
            message={message}
            setMessage={setMessage}
            template={template}
            setTemplate={setTemplate}
            selectedSector={selectedSector}
            setSelectedSector={setSelectedSector}
          />
          <Upload  uploadedImage={uploadedImage} setUploadedImage={setUploadedImage}/></div>
          <SubmitButton />
          <AdminPreview
            message={deferredMessage}
            template={template}
            selectedSector={selectedSector}
            uploadedImage={uploadedImage}
          />
        </div>
      </div>
    </div>
  );
}
