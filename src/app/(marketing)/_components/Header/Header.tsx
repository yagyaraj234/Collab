import Link from "next/link";

import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="flex items-center py-3 px-4 border-b-2 border-tertiary mb-2">
      <nav className="hidden items-center gap-4 text-lg font-semibold lg:flex">
        <Link href="/">Home</Link>
        <Link href="#">Features</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="#">Contact</Link>
      </nav>
      
      <div className="ml-auto flex gap-4">
      <Link href="/sign-in">
          <Button variant={'outline'}>Sign In</Button>
          
        </Link>
        <Link href="/sign-up">
          <Button>Get Collab for Free</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
