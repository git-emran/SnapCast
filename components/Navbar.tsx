import Image from "next/image";
import Link from "next/link";

const user ={}

const Navbar = () => {
  return (
    <header className="navbar" >
      <nav>
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            height={32}
            width={32}
          />
          <h1>SnapCast</h1>
        </Link>
        {user && (
          <figure>
            <button>
              <Image src="/assets/images/dummy.jpg" alt="user" width={36} height={36} />
            </button>
          </figure>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
