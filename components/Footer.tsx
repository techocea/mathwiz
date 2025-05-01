import Image from "next/image";
import { ChevronRight, Mail, MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="min-h-screen flex items-center w-full justify-center mx-auto bg-secondary lg:py-24 py-10 px-4 lg:px-0">
      <div className="grid lg:grid-cols-3 gap-24 text-white">
        <div className="flex flex-col justify-start text-center lg:max-w-3xs items-center gap-4">
          <div className="w-[100px] h-[100px] rounded-full bg-white flex items-center justify-center mx-auto">
            <Image
              src="/mathwiz.png"
              width={95}
              height={95}
              priority
              quality={100}
              alt="a good maths in negombo"
              className=""
            />
          </div>
          <p className="uppercase font-semibold text-sm">
            engineering tone of mathematics
          </p>
        </div>
        <div className="flex flex-col items-start w-fit">
          <h2 className="uppercase font-bold mb-10">contact us</h2>
          <ul className="flex flex-col gap-6 mt-4">
            <li className="flex items-center gap-2">
              <MapPin className="text-white" />
              <span className="text-sm">ACBS Negombo</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="text-white" />
              <span className="text-sm">chamodasj@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneCall className="text-white" />
              <span className="text-sm">+94 71 702 8634</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-start w-fit">
          <h2 className="uppercase font-bold mb-10">follow us</h2>
          <div className="flex gap-3 mt-4">
            <span>
              <Link
                href="https://www.instagram.com/chamoda_liyanage/"
                target="_blank"
              >
                <Image
                  src="/Instagram.png"
                  width={35}
                  height={35}
                  objectFit="cover"
                  priority
                  className="w-[35px] h-[35px]"
                  alt="combined maths in negombo"
                />
              </Link>
            </span>
            <span>
              <Link
                href="https://www.instagram.com/chamoda_liyanage/"
                target="_blank"
              >
                <Image
                  src="/Facebook.png"
                  width={35}
                  height={35}
                  objectFit="cover"
                  priority
                  className="w-[35px] h-[35px]"
                  alt="combined maths in negombo"
                />
              </Link>
            </span>
            <span>
              <Link
                href="https://www.instagram.com/chamoda_liyanage/"
                target="_blank"
              >
                <Image
                  src="/TikTok.png"
                  width={35}
                  height={35}
                  objectFit="cover"
                  priority
                  className="w-[35px] h-[35px]"
                  alt="combined maths in negombo"
                />
              </Link>
            </span>
            <span>
              <Link
                href="https://www.instagram.com/chamoda_liyanage/"
                target="_blank"
              >
                <Image
                  src="/YouTube.png"
                  width={35}
                  height={35}
                  objectFit="cover"
                  priority
                  className="w-[35px] h-[35px]"
                  alt="combined maths in negombo"
                />
              </Link>
            </span>
          </div>
          <ul className="flex flex-col gap-6 mt-8">
            <Link href="/" className="flex items-center gap-2">
              <ChevronRight className="text-white" />
              <span className="text-sm">Home</span>
            </Link>
            <Link href="#about" className="flex items-center gap-2">
              <ChevronRight className="text-white" />
              <span className="text-sm">About</span>
            </Link>
            <Link href="#top-rankers" className="flex items-center gap-2">
              <ChevronRight className="text-white" />
              <span className="text-sm">Top Rankers</span>
            </Link>
            <Link href="#contact" className="flex items-center gap-2">
              <ChevronRight className="text-white" />
              <span className="text-sm">Contact</span>
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
