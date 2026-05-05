import Image from "next/image";
import logo from "../../images/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-2" aria-label="Go to homepage">
      <Image
        src={logo}
        alt="Main logo"
        className="rounded-xl overflow-hidden"
        width={40}
        height={40}
        priority
      />
      <span className="text-xl font-bold tracking-tight text-foreground">
        Fut<span className="text-primary">Score</span>
      </span>
    </div>
  );
};

export default Logo;
