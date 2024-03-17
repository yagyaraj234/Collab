import Link from "next/link";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const ComponentPage = () => {
  return (
    <div className="grid grid-rows-[auto auto 1fr auto] gap-6 min-h-screen px-4 sm:px-6 lg:px-8">
      <main className="grid gap-6">
        <section className="grid items-center gap-6 text-center sm:gap-8 lg:grid-cols-2 xl:gap-12">
          <div className="">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Bring your team together with Collab
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              The all-in-one platform for project management, task tracking, and
              collaboration.
            </p>
            <Button asChild className={`text-xl py-4`} >
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
          <Image
            alt="workplace"
            height={400}
            width={600}
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFRlYW0lMjBXb3JrfGVufDB8fDB8fHww"
          />
        </section>
        <section className="grid items-center gap-6 text-center sm:gap-8 lg:grid-cols-3 xl:gap-12">
          <div className="space-y-2">
            <ProjectorIcon className="w-12 h-12 mx-auto rounded-lg bg-gray-100 p-3 text-gray-500" />
            <h3 className="text-xl font-bold">Project Management</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Easily plan, track, and manage your projects.
            </p>
          </div>
          <div className="space-y-2">
            <ActivityIcon className="w-12 h-12 mx-auto rounded-lg bg-gray-100 p-3 text-gray-500" />
            <h3 className="text-xl font-bold">Task Tracking</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Keep your team organized with seamless task tracking.
            </p>
          </div>
          <div className="space-y-2">
            <MergeIcon className="w-12 h-12 mx-auto rounded-lg bg-gray-100 p-3 text-gray-500" />
            <h3 className="text-xl font-bold">Collaboration</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Foster collaboration with built-in communication tools.
            </p>
          </div>
          <div className="space-y-2">
            <ViewIcon className="w-12 h-12 mx-auto rounded-lg bg-gray-100 p-3 text-gray-500" />
            <h3 className="text-xl font-bold">Reporting</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Gain insights with powerful reporting and analytics.
            </p>
          </div>
        </section>
        <section className="grid items-center gap-6 text-center sm:gap-8 lg:grid-cols-2 xl:gap-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Trusted by teams of all sizes
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Join thousands of teams who use Acme to manage their work more
              effectively.
            </p>
          </div>
          <div className="grid items-center gap-6">
            <div className="grid items-center gap-2">
              <Image
                alt="User"
                className="rounded-full"
                height="64"
                src="https://images.unsplash.com/photo-1484515991647-c5760fcecfc7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHBlb3BsZSUyMHBvdHJhaXR8ZW58MHx8MHx8fDA%3D"
                style={{
                  aspectRatio: "64/64",
                  objectFit: "cover",
                }}
                width="64"
              />
              <blockquote className="text-gray-500 italic not- dark:text-gray-400">
                Acme has transformed the way our team works. We are more
                organized, efficient, and productive than ever before.
              </blockquote>
              <cite className="font-semibold">- Alice Johnson, Team Lead</cite>
            </div>
          </div>
        </section>
        <section className="grid items-center gap-6 text-center sm:gap-8 lg:grid-cols-2 xl:gap-12">
          <div className="grid items-center gap-6">
            <div className="grid items-center gap-2">
              <Image
                src={`https://images.unsplash.com/photo-1632765854612-9b02b6ec2b15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fHBlb3BsZSUyMHBvdHJhaXR8ZW58MHx8MHx8fDA%3D`}
                alt="User"
                className="rounded-full"
                height="64"
                width="64"
                style={{
                  aspectRatio: "64/64",
                  objectFit: "cover",
                }}
              />
              <blockquote className="text-gray-500 italic not-italc dark:text-gray-400">
                Acme has transformed the way our team works. We are more
                organized, efficient, and productive than ever before.
              </blockquote>
              <cite className="font-semibold">- Alice Johnson, Team Lead</cite>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">
              Trusted by teams of all sizes
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Join thousands of teams who use Acme to manage their work more
              effectively.
            </p>
          </div>
        </section>
      </main>
      <footer className="grid items-center gap-6 py-12 border-t sm:grid-cols-2 sm:gap-8">
        <div className="flex items-center gap-4 text-sm lg:justify-start">
          <Link className="font-bold" href="#">
            Home
          </Link>
          <Link className="font-bold" href="#">
            Features
          </Link>
          <Link className="font-bold" href="/pricing">
            Pricing
          </Link>
          <Link className="font-bold" href="#">
            Contact
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm justify-end">
          <Link className="font-bold" href="#">
            Privacy Policy
          </Link>
          <Link className="font-bold" href="#">
            Terms of Service
          </Link>
          <Link className="font-bold" href="#">
            Contact Us
          </Link>
        </div>
        <div className="grid items-center grid-cols-3">
          <Link
            className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center"
            href="#"
          >
            <span className="sr-only">Twitter</span>
            <TwitterIcon className="w-4 h-4 text-gray-100" />
          </Link>
          <Link
            className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center"
            href="#"
          >
            <span className="sr-only">Facebook</span>
            <FacebookIcon className="w-4 h-4 text-gray-100" />
          </Link>
          <Link
            className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center"
            href="#"
          >
            <span className="sr-only">LinkedIn</span>
            <LinkedinIcon className="w-4 h-4 text-gray-100" />
          </Link>
        </div>
        <div className="text-sm text-center sm:col-start-2">
          <p className="text-gray-500">
            Copyright © 2023 Acme Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function FacebookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MergeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 6 4-4 4 4" />
      <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
      <path d="m20 22-5-5" />
    </svg>
  );
}

function ProjectorIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 7 3 5" />
      <path d="M9 6V3" />
      <path d="m13 7 2-2" />
      <circle cx="9" cy="13" r="3" />
      <path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" />
      <path d="M16 16h2" />
    </svg>
  );
}

function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function ViewIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z" />
      <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
      <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2" />
    </svg>
  );
}
export default ComponentPage;
