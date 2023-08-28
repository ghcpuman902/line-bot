import { Suspense } from "react";
import Loading from "./loading";
import Page from "./page";
export default function Layout() {
  return (
    <main>
        <Suspense fallback={<Loading />}><Page /></Suspense>
    </main>
  );
}