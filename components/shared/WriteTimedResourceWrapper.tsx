"use client";

import dynamic from "next/dynamic";

// This is safe because it's in a Client Component
const WriteTimedResource = dynamic(
    () => import("./WriteTimedResource"),
    {
        ssr: false,
        loading: () => <p>Loading PDF Viewer...</p>
    }
);

export default function WriteTimedResourceWrapper(props: any) {
    return <WriteTimedResource {...props} />;
}
