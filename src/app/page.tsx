import { redirect } from "next/navigation";

// Redirect root to marketing route to avoid duplication
export default function RootPage() {
    redirect("/marketing");
}
