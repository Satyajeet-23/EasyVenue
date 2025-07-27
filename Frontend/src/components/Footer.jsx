import { Code, Copyright, Linkedin, Github, Globe } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-100 border-t border-gray-300 py-6 mt-16">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center space-y-4 text-sm text-gray-600 text-center">

                {/* Top: Copyright */}
                <div className="flex items-center space-x-1">
                    <Copyright className="w-4 h-4" />
                    <span>2025 | Himanshu Maurya | All rights reserved.</span>
                </div>

                {/* Bottom: Designed by + Social Links */}
                <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-2">
                        <Code className="w-4 h-4" />
                        <span>
                            Designed & Built by{' '}
                            <strong className="text-blue-600">Himanshu Maurya</strong>
                        </span>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center space-x-4">
                        <a
                            href="https://himanshumaurya-0007.web.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-600 transition"
                            aria-label="Personal Website"
                        >
                            <Globe className="w-5 h-5" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/himanshumaurya0007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-700 transition"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                            href="https://github.com/himanshumaurya0007"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-800 transition"
                            aria-label="GitHub"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
