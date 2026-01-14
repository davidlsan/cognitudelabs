interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function CTAButton({ href, children }: CTAButtonProps) {
  return (
    <a
      href={href}
      className="block w-full border border-border py-4 text-center uppercase tracking-widest text-sm text-black rounded-sm bg-white transition-colors"
    >
      {children}
    </a>
  );
}
