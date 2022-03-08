import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthButton from "./authButton";
import PrimaryButton from "./primaryButton";

interface NavProps {
  hideGiveSnaps?: boolean;
}

const Nav = ({ hideGiveSnaps }: NavProps) => {
  const router = useRouter();
  return (
    <nav className="mt-4 py-2.5">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="cursor-pointer">
          <Link href="/snaps">
            <Image
              src="/sunglasses_100.png"
              height={50}
              width={50}
              alt="Snaps logo"
            ></Image>
          </Link>
        </div>
        <div className="flex w-auto">
          {!hideGiveSnaps &&
            <Link href="/give">
              <PrimaryButton text="Share the ❤️" />
            </Link>}
          <AuthButton />
        </div>
      </div>
    </nav>

  )
}

export default Nav;
