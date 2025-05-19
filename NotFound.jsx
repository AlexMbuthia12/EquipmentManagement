export default function NotfoundPage() {
  return (
    <main className="relative grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 overflow-hidden">
      {/* Background circle */}
      <div className="animate-pulse absolute w-[400px] h-[400px] bg-[#006b3c]/10 rounded-full z-0"></div>

      <div className="text-center relative z-10">
        <p className="text-base font-semibold text-[#006b3c]">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
           Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-gray-600 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-[#006b3c] px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#006b3c]/80 transition"
          >
            Go back home
          </a>
          <a
            href="#"
            className="text-sm font-semibold text-[#006b3c] group hover:underline transition"
          >
            Contact support{" "}
            <span
              aria-hidden="true"
              className="inline-block transform transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}

