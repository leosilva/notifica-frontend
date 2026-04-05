import { memo } from "react"
import { Button } from "../ui/button"
import { Send } from "lucide-react";


const SubmitButton = memo(() => {
    return(
                
        <div className=" items-center">
          <Button
            className="w-[25%] h-11 bg-emerald-800 text-black gap-3 p-2 hover:scale-101 duration-300 transform-all hover:bg-emerald-700" 
            size="lg"
          >
            <Send />
            Enviar Comunicado Administrativo
          </Button>
        </div>
    )
})

export default SubmitButton;