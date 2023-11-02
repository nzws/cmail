import { redirect } from "@remix-run/cloudflare";

export function loader() {
  return redirect("/mails/inbox");
}

export default function Page() {
  return null;
}
