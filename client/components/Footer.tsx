import Link from "next/link";

const Footer = () => {
    return (
        <footer className="fixed bottom-0 right-0 mb-4 mr-4">
            <div className="text-right">
                <ul className="space-x-4">
                    <li className="inline">
                        <Link href="/about" className="text-blue-600 hover:underline">Über</Link>
                    </li>
                    <li className="inline">
                        <Link href="/privacy" className="text-blue-600 hover:underline">Impressum</Link>
                    </li>
                    <li className="inline">
                        © Tobias Sassin 2024
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;