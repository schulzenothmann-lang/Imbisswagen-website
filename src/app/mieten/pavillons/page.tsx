import { redirect } from "next/navigation";

export default function Page() {
  redirect("/angebote?angebot=mieten&produkt=pavillon");
}
