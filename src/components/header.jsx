import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuContent, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuItem } from "./ui/dropdown-menu"
import { Avatar , AvatarImage, AvatarFallback} from "./ui/avatar"
import { LinkIcon, LogOut } from "lucide-react"

const Header = () => {
    const navigate = useNavigate()
    const user = false;

  return (
    <nav className="py-4 flex justify-between items-center">
        <Link to="/">
        <img src="/logo.png" className=" h-16"  alt="Url Shortner" />
        </Link>

    <div>
        {!user ? (
        <Button onClick={()=>navigate("/auth")}>Login</Button>
         ) :(
            <DropdownMenu>
  <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
  <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>SD</AvatarFallback>
</Avatar>

  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Sumeet Dubey</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
        <LinkIcon className="mr-2 h-4 w-4" />
        <span>My Links</span>
        </DropdownMenuItem>
    <DropdownMenuItem className="text-red-400">
        <LogOut className="mr-2 h-4 w-4"/>
        <span>Logout</span>
        </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        )
        }
        
    </div>
    </nav>
  )
}

export default Header