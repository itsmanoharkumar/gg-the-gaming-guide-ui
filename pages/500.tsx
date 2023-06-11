import error500 from "@/images/error500.jpg";
import Image from "next/image";
import Link from "next/link";

const Custom500 = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10 md:flex md:items-center md:justify-center w-full">
      <div className="flex items-start flex-col md:items-center">
        <Image
          src={error500}
          alt="500 Internal Server Error"
          className={"mb-2 md:w-1/2 lg:w-1/3 w-full"}
        />
        <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-2">
          500 - Internal Server Error
        </h1>
        <p className="text-md md:text-2xl text-gray-900 mb-4">
          Oops! Something went wrong on our server. We are working to fix the
          issue.
        </p>
        <Link
          href="/"
          className="text-lg md:text-2xl text-gray-900 underline hover:text-gray-600"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default Custom500;
