import Image from "next/image";

const SOURCE_WIDTH = 1116;
const SOURCE_HEIGHT = 296;

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export default function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src="/brand/atmc-logo.webp"
      alt="ATMC"
      width={SOURCE_WIDTH}
      height={SOURCE_HEIGHT}
      priority={priority}
      quality={100}
      sizes="(max-width: 768px) 90vw, 360px"
      className={className}
      style={{ width: "100%", height: "auto", display: "block" }}
    />
  );
}
