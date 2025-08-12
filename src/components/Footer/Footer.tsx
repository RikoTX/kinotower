export default function Footer() {
    return (
        <footer className="bg-gray-950 text-white py-6">
        <div className="container mx-auto text-center">
            <p className="text-sm">
            © {new Date().getFullYear()} Kinotower. All rights reserved.
            </p>
        </div>
        </footer>
    );
}