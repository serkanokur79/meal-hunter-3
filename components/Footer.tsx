import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-4 py-4 border-t mx-auto">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground flex flex-col md:flex-row gap-2">
      <span className="mt-2 flex items-center justify-center flex-row gap-1">
         <span> © {new Date().getFullYear()} Meal Hunter by</span>
          <a
            href="https://www.serkanokur.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary"
          >
            Serkan Okur
          </a>.
        </span>
        <span className="mt-2 flex items-center justify-center">
          Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> using{' '}
          <a
            href="https://www.themealdb.com/api.php"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 underline hover:text-primary"
          >
            TheMealDB API
          </a>
        </span>
      </div>
    </footer>
  );
}