import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-8 py-4 border-t">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Recipe Search App. This is a portfolio project.</p>
        <p className="mt-2 flex items-center justify-center">
          Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> using{' '}
          <a
            href="https://www.themealdb.com/api.php"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline hover:text-primary"
          >
            TheMealDB API
          </a>
        </p>
      </div>
    </footer>
  );
}