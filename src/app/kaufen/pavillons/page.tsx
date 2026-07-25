import { redirect } from "next/navigation";

export default function Page() {
  redirect("/angebote?angebot=kaufen&produkt=pavillon");
}
