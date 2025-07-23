import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
    <img
      src="https://media.giphy.com/media/A9EcBzd6t8DZe/giphy.gif"
      alt="404 Error"
      className="max-w-md mb-8"
    />
    <h1 className="md:text-4xl text-2xl font-extrabold text-gray-800 mb-4">404 - Page Not Found!!!</h1>
    <p className="md:text-lg text-red-600 font-bold mb-8 text-center">
      Oops! The page you are looking for does not exist.
    </p>
    <Link
      to="/"
      className="px-5 py-4 bg-blue-600 hover:bg-gray-300 text-white font-bold hover:text-blue-700"
    >
      Back to Home
    </Link>
  </div>
  )
}

export default ErrorPage
