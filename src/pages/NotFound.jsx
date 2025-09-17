import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import Button from "../components/ui/Button";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="flex items-center">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link to="/search">
            <Button variant="outline" className="flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Browse Movies
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
