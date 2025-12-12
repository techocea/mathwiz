import { Loader2 } from "lucide-react";

const Loader = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex items-center gap-2">
                Loading <Loader2 className="animate-spin transition-all" />
            </div>
        </div>
    );
};

export default Loader;
