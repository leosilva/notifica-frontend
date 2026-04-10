import { Button } from "../ui/button"
import {SendHorizonal} from "lucide-react"

export default function PageButton() {
    return(
                
        <Button className="flex items-center justify-between w-fit bg-emerald-600 font-bold text-sm p-6 gap 3 ">
          <SendHorizonal className=""/>Ver Seus Comunicados Salvos
        </Button>
    )
}
