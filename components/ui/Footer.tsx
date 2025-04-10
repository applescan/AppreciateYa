import Image from "next/image";

const Footer: React.FC = () => {
  interface NavigationItem {
    href: string;
    name: string;
    id: number;
  }
  const footerNavs: NavigationItem[] = [
    {
      href: "https://felicia-portfolio.netlify.app/",
      name: "Portfolio",
      id: 1,
    },
    {
      href: "https://nz-locum-network.netlify.app/",
      name: "NZ Veterinary Locum Network",
      id: 2,
    },
    {
      href: "https://mixtape-me.herokuapp.com/",
      name: "Spotify app integration",
      id: 3,
    },
    {
      href: "https://what-to-eat-2.vercel.app/",
      name: "What to eat?",
      id: 4,
    },
  ];

  return (
    <footer className="pt-10 bg-purple-50">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="space-y-6 w-full sm:text-center">
          <Image
            src="/logo.png"
            width={160}
            height={100}
            alt="Appreciate ya logo"
            className="w-32 sm:mx-auto"
          />
          <p className="text-sm w-full">
            Boost Morale with a Click: Send a Token of Appreciation to a
            Coworker Today!
          </p>
        </div>
        <div className="mt-10 pb-10 pt-5 border-t items-center justify-between sm:flex">
          <p className="flex flex-wrap items-center gap-4 mt-6 text-sm sm:mt-0 font-semibold">
            © 2024 Felicia Fel. All rights reserved. 😶‍🌫️🥚
          </p>
          <ul className="flex flex-wrap items-center gap-4 mt-6 text-xs sm:mt-0">
            {footerNavs.map((item) => (
              <li
                key={item.id}
                className="text-gray-800 hover:text-purple-500 duration-150"
              >
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
