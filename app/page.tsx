import { redirect, RedirectType } from "next/navigation";

export default function Page() {
  return redirect("/mails/inbox", RedirectType.replace);
}
