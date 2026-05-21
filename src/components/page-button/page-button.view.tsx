import { Button } from '../ui/button';
import { Link } from 'react-router';

export default function PageButton({ frase, icon, to }) {
  return (
    <Link to={to}>
      <Button className="flex items-center justify-between w-fit bg-emerald-600 font-bold text-sm p-4 gap 3 ">
        {icon}
        {frase}
      </Button>
    </Link>
  );
}
