"use client";

import dynamic from "next/dynamic";
import Loader from "../layout/Loader";

// This is safe because it's in a Client Component
const WriteTimedResource = dynamic(
    () => import("./WriteTimedResource"),
    {
        ssr: false,
        loading: () => <Loader />
    }
);

export default function WriteTimedResourceWrapper(props: any) {
    return <WriteTimedResource {...props} />;
}
