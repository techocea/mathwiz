import Image from "next/image";
import { Button } from "./ui/button";

const DashboardNavbar = () => {
    return (
        <header className="bg-white border-b py-4 px-8 flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                <Image
                    src="/mathwiz.png"
                    width={95}
                    height={95}
                    priority
                    quality={100}
                    alt="a good maths in negombo"
                />
                <h1 className="font-bold text-xl uppercase bg-gradient-to-r from-secondary to-primary text-transparent bg-clip-text">mathwiz.lk</h1>
            </div>
            <div className="flex gap-4 items-center">
                <div>
                    <p>Welcome, Student</p>
                </div>
                <div>
                    <Button variant="outline">Logout</Button>
                </div>
            </div>
        </header>
    );
};

export default DashboardNavbar;
