import Image from "next/image";

type LogoProps = {
  width?: number;
  className?: string;
  priority?: boolean;
};

export default function Logo({
  width = 160,
  className,
  priority = false,
}: LogoProps) {
  return (
    <Image
      src="/brand/atmc-logo.webp"
      alt="ATMC"
      width={width}
      height={Math.round(width * 0.35)}
      priority={priority}
      className={className}
    />
  );
}
