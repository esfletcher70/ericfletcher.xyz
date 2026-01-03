import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Eric Fletcher. All rights reserved.
            </p>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <span>Built with</span>
            <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
            <span>and dedication</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
