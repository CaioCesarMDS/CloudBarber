import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./shadcn/ui/card";
import { Button } from "./shadcn/ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card>
      <CardContent className="px-5 py-4 flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="IF Barber logo" width={50} height={50} />
        </Link>
        <Button variant="outline" size="icon">
          <MenuIcon size={18}/>
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
