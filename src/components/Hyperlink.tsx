import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
  children: React.ReactNode;
};

const Hyperlink = ({ href = "#", className, children, ...others }: Props) => (
  <Link
    color="foreground"
    href={href}
    className={`text-blue-700 hover:text-blue-500 underline hover:no-underline ${className}`}
    {...others}
  >
    {children}
  </Link>
);

export default Hyperlink;
