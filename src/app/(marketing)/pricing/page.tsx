import Link from "next/link";

const PricingPage = () => {
  return (
    <section className="grid items-center gap-6 text-center sm:gap-8 lg:grid-cols-3 xl:gap-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Choose a Plan
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Select the perfect plan for your team's needs.
        </p>
      </div>
      <div className="space-y-2">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold">Starter</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ideal for small teams just getting started.
          </p>
          <p className="text-2xl font-bold">
            $9
            <span className="text-base font-normal">/month</span>
          </p>
          <Link className="btn mt-4" href="#">
            Choose Plan
          </Link>
        </div>
      </div>
      <div className="space-y-2">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold">Pro</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Perfect for growing teams with advanced needs.
          </p>
          <p className="text-2xl font-bold">
            $19
            <span className="text-base font-normal">/month</span>
          </p>
          <Link className="btn mt-4" href="#">
            Choose Plan
          </Link>
        </div>
      </div>
      <div className="space-y-2">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold">Enterprise</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tailored solutions for large organizations.
          </p>
          <p className="text-2xl font-bold">
            $49
            <span className="text-base font-normal">/month</span>
          </p>
          <Link className="btn mt-4" href="#">
            Choose Plan
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingPage;
