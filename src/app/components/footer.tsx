export default function Footer() {
  return (
    <footer className="flex justify-between items-center py-8 w-full">
      <p className="text-sm text-black">
        © 2026, All rights reserved
      </p>
      <nav className="flex gap-8 text-sm text-black [&>a:hover]:text-black/50 [&>a:hover]:bg-black/10">
        <a
          href="https://twitter.com/cognitudelabs"
          className="hover:text-black transition-colors rounded-sm px-2 h-8 flex items-center"
        >
          X/Twitter
        </a>
        <a
          href="https://linkedin.com/company/cognitudelabs"
          className="hover:text-black transition-colors rounded-sm px-2 h-8 flex items-center"
        >
          LinkedIn
        </a>
        <a
          href="mailto:contact@cognitudelabs.com"
          className="hover:text-black transition-colors rounded-sm px-2 h-8 flex items-center"
        >
          Contact
        </a>
      </nav>
    </footer>
  );
}
