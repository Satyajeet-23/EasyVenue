import { Code, Copyright, Linkedin, Github, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-300 py-6 mt-8 shadow-inner">
      <div className="mx-auto px-4 flex flex-col items-center space-y-2 text-gray-600">
        {/* Bottom: Designed by + Social Links */}
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2 hover:text-gray-800 transition-colors duration-300 font-medium">
            <Code className="w-5 h-5 text-blue-600" />
            <span className="text-md">
              Designed & Built by
              <strong className="text-blue-600 hover:text-blue-700 transition-colors duration-300 ml-1 font-mono px-1">
                Satyajeet Jena
              </strong>
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-6">
            <a
              href="https://www.linkedin.com/in/satyajeetjena23"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:text-blue-700 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/Satyajeet-23"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:text-gray-900 transition-all duration-00"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
          {/* Top: Copyright */}
          <div className="flex items-center space-x-2 text-sm hover:text-gray-800 transition-colors duration-300">
            <Copyright className="w-4 h-4" />
            <span className="font-medium">
              2025 | Satyajeet Jena | All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
