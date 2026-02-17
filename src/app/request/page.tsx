import { Suspense } from "react";
import RequestForm from "@/components/RequestForm";
import Link from "next/link";

export default function RequestPage() {
  return (
    <div className="py-6 sm:py-12 px-4">
      <div className="max-w-xl mx-auto">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
          &larr; Back to courts
        </Link>

        <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold text-gray-900">Request a Basketball Court</h1>
        <p className="mt-1 sm:mt-2 text-sm text-gray-500">
          Tell us what you&apos;re looking for and we&apos;ll connect you with the right basketball courts in San Francisco.
        </p>

        <div className="mt-5 sm:mt-8">
          <Suspense fallback={<div className="text-center py-8 text-gray-400">Loading form...</div>}>
            <RequestForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
