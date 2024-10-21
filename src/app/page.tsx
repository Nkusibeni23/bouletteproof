import Link from "next/link";

function MyApp() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p>Here is a summary of your website statistics and CRM data.</p>
      <Link href="/landing-page">
        <span className="block text-lg hover:bg-gray-700 p-2 rounded">
          Home
        </span>
      </Link>
    </div>
  );
}

export default MyApp;
