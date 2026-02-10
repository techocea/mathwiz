import Image from "next/image";
import { FOOTER_LINKS } from "@/lib/constants";

const Footer = () => {
  return (
    <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
      <div className="lg:max-w-6xl w-full mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="w-[100px] h-[100px]">
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
            <p className="text-slate-500 max-w-sm leading-relaxed text-sm">
              Empowering Sri Lankan students with superior logic and mathematical clarity for the G.C.E Advanced Level examinations.
            </p>
          </div>

          {FOOTER_LINKS.map((section) => (
            <div key={section.title}>
              <h4 className="text-slate-900 font-bold mb-8 uppercase tracking-widest text-sm">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a
                        href={link.href}
                        className={`${link.href
                          ? "text-amber-600 font-bold hover:underline"
                          : "text-slate-500 hover:text-amber-600 font-medium transition-colors"
                          } text-sm`}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span className="text-slate-500 font-medium text-sm">
                        {link.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="text-slate-500text-sm font-medium">
            © {new Date().getFullYear()} MathWiz. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
