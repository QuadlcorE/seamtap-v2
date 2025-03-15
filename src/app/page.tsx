import { stackServerApp } from "@/stack";
import { redirect } from 'next/navigation';

export default async function Home() {
  await stackServerApp.getUser({or: 'redirect'});

  redirect('/dashboard');
}
