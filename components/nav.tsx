import Image from "next/image";
import AuthButton from "./authButton";
import PrimaryButton from "./primaryButton";

const Nav = () => {
  return (
    <nav className="bg-white py-2.5 dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" className="flex">
          <Image
            src="/snaps_100.png"
            height={50}
            width={50}
            alt="Snaps logo"
          ></Image>
          <span className="sm:hidden self-center text-lg font-semibold whitespace-nowrap dark:text-white">Snaps</span>
        </a>
        <div className="flex w-auto">
          <PrimaryButton
            text="Give Snaps"
            onClick={() => { }}
          />
          <AuthButton />
        </div>
      </div>
    </nav>

  )
}

export default Nav;
