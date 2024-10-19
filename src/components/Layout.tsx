import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold mt-4">Dashboard</div>
        <nav className="flex-1 p-4 space-y-4 mt-20">
          <Link href="/landing-page">
            <span className="block text-lg hover:font-bold hover:bg-gray-700 p-3 rounded-md duration-300 transition-all ease-in">
              Home
            </span>
          </Link>
          <Link href="/detail-visit-analysis">
            <span className="block text-lg hover:font-bold hover:bg-gray-700 p-3 rounded-md duration-300 transition-all ease-in">
              Detail Visit Analysis
            </span>
          </Link>
        </nav>
        <div className="p-4">
          <Link href="/">
            <span className="block text-lg hover:bg-gray-700 p-2 rounded">
              Logout
            </span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col top-0">
        <header className="bg-gray-200 p-4 flex justify-between items-center">
          <div className="text-xl font-semibold">MX</div>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded-lg w-72 px-4"
          />
          <div className="bg-gray-300 rounded-full w-10 h-10"></div>
        </header>
        <main className="p-6 bg-gray-50 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
