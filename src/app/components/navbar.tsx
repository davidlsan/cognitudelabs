import Image from "next/image";

interface NavbarInterface {
  navlinks: [
    {
      name: string;
    },
    {
      name: string;
    }
  ];
  cta?: React.ReactNode;
}

export default function Navbar({ navlinks, cta }: NavbarInterface) {
  return (
    <div className="w-full justify-center">
      <div className="max-w-300 bg-transparent px-6 py-4 mx-auto flex justify-between">
        <div className="h-8">
          <Image
            src="CognitudeLabs.svg"
            alt="Cognitude Labs Logo"
            width={150}
            height={150}
          />
        </div>
        <nav>
          <ul className="flex items-center justify-between gap-6">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className="flex hover:bg-white/20 h-8 items-center px-3 rounded-lg text-white/50 hover:text-white"
              >
                <a href={link.name}>{link.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
