export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-5xl mx-auto px-6 text-center text-subtext">
        <p>&copy; {new Date().getFullYear()} Walter Andrade. All rights reserved.</p>
      </div>
    </footer>
  );
}
