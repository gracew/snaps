import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthButton from "./authButton";
import PrimaryButton from "./primaryButton";

const Nav = () => {
  const router = useRouter();
  return (
    <nav className="bg-white mt-4 py-2.5 dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/snaps">
          <Image
            src="/snaps_100.png"
            height={50}
            width={50}
            alt="Snaps logo"
          ></Image>
        </Link>
        <div className="flex w-auto">
          <PrimaryButton
            text="Give Snaps"
            onClick={() => router.push("/give")}
          />
          <AuthButton />
        </div>
      </div>
    </nav>

  )
}

export default Nav;
