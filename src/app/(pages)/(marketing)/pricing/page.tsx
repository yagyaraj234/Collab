import { Button } from "@/components/ui/button";
import Link from "next/link";

const PricingPage = () => {
  return (
    <section className="flex flex-col gap-6 justify-center px-4">
      <div className="space-y-2  flex flex-col items-center justify-center">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Choose a Plan
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Select the perfect plan for your team&apos;s needs.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="space-y-2">
          <div className="bg-gray-100 p-4 rounded-lg flex items-center  gap-4 flex-col md:min-h-[50vh] justify-between">
            <h3 className="text-xl font-bold">Starter</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ideal for small teams just getting started.
            </p>
            <p className="text-2xl font-bold">
              $9
              <span className="text-base font-normal">/month</span>
            </p>
            <Link className="btn mt-4" href="#">
              <Button>Choose Plan</Button>
            </Link>
          </div>
        </div>
        <div className="space-y-2 ">
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between gap-4 flex-col md:min-h-[50vh]">
            <h3 className="text-xl font-bold">Pro</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Perfect for growing teams with advanced needs.
            </p>
            <p className="text-2xl font-bold">
              $19
              <span className="text-base font-normal">/month</span>
            </p>
            <Link className="btn mt-4" href="#">
              <Button>Choose Plan</Button>
            </Link>
          </div>
        </div>
        <div className="space-y-2  ">
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between gap-4 flex-col md:min-h-[50vh]">
            <h3 className="text-xl font-bold">Enterprise</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tailored solutions for large organizations.
            </p>
            <p className="text-2xl font-bold">
              $49
              <span className="text-base font-normal">/month</span>
            </p>
            <Link className="btn mt-4" href="#">
              <Button>Choose Plan</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
