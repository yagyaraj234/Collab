import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Handshake } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center py-3 px-4 border-b-2 border-tertiary mb-2">
      <Link
        href="/"
        className="font-medium text-textSecondary flex items-center cursor-pointer gap-2 mr-6"
      >
        <Handshake color="blue " fontWeight={24} />
        <span className="font-semibold">Collab</span>
      </Link>

      <div>
        <UserButton />
      </div>

      <div className="ml-auto flex gap-4">
        <Link href="/sign-in">
          <Button variant={"outline"}>Sign In</Button>
        </Link>
        <Link href="/sign-up">
          <Button>Get Collab for Free</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
