import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { Link } from "react-router";
import { resumes } from "../../constants";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResuMind - AI-Powered Resume Feedback" },
    { name: "description", content: "Get smart feedback on your resume for your dream job with AI-powered analysis!" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      {/* Hero Section */}
      <section className="main-section">
        <div className="page-heading py-20 animate-in fade-in duration-1000">
          <h1 className="mb-6">Get AI-Powered Feedback<br />on Your Resume</h1>
          <h2 className="mb-12 max-w-3xl">
            Improve your chances of landing your dream job with detailed resume analysis, 
            ATS optimization, and personalized feedback powered by artificial intelligence.
          </h2>
          <div className="flex flex-row gap-6 max-md:flex-col max-md:w-full">
            <Link 
              to="/dashboard" 
              className="primary-button w-fit text-xl font-semibold px-8 py-4 hover:scale-105 transition-transform duration-200"
            >
              View Dashboard
            </Link>
            <Link 
              to="/upload" 
              className="secondary-button w-fit text-xl font-semibold px-8 py-4 hover:scale-105 transition-transform duration-200"
            >
              Upload Resume
            </Link>
          </div>
        </div>
      </section>

      {/* Example Resumes Section */}
      <section className="main-section pb-16">
        <div className="page-heading pb-12">
          <h2 className="text-4xl font-bold text-center mb-4 animate-in fade-in duration-1000 delay-200">
            See Example Analysis
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl text-center animate-in fade-in duration-1000 delay-300">
            Explore how our AI analyzes different types of resumes and provides actionable feedback
          </p>
        </div>
        
        <div className="resumes-section animate-in fade-in duration-1000 delay-400">
          {resumes.slice(0, 3).map((resume: Resume, index: number) => (
            <div 
              key={resume.id} 
              className="animate-in fade-in duration-1000"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <ResumeCard resume={resume} />
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/80 backdrop-blur-sm py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in duration-1000 delay-600">
            <h2 className="text-4xl font-bold mb-4">Why Choose ResuMind?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with cutting-edge technology to give you the best resume analysis experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-in fade-in duration-1000 delay-700">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <img src="/icons/ats-good.svg" alt="ATS" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">ATS Optimization</h3>
              <p className="text-gray-600">
                Ensure your resume passes Applicant Tracking Systems with our specialized analysis
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-in fade-in duration-1000 delay-800">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                <img src="/icons/check.svg" alt="Feedback" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Detailed Feedback</h3>
              <p className="text-gray-600">
                Get comprehensive analysis on content, structure, tone, and skills presentation
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-in fade-in duration-1000 delay-900">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <img src="/icons/info.svg" alt="Puter" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Powered by Puter</h3>
              <p className="text-gray-600">
                Built on Puter.js - you only pay for the resources you use for your analysis
              </p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-in fade-in duration-1000 delay-1000">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <img src="/icons/pin.svg" alt="Tracking" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Application Tracking</h3>
              <p className="text-gray-600">
                Keep track of all your resume submissions and their performance scores
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-in fade-in duration-1000 delay-300">
            <h2 className="text-4xl font-bold mb-4">Transform Your Resume Today</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of job seekers who have improved their resumes with our AI-powered analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Benefit 1 */}
            <div className="text-center animate-in fade-in duration-1000 delay-400">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Upload Your Resume</h3>
              <p className="text-gray-600">
                Simply upload your resume in PDF format and let our AI do the analysis
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="text-center animate-in fade-in duration-1000 delay-500">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get AI Analysis</h3>
              <p className="text-gray-600">
                Receive detailed feedback on ATS compatibility, content quality, and structure
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="text-center animate-in fade-in duration-1000 delay-600">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Improve & Apply</h3>
              <p className="text-gray-600">
                Apply the suggested improvements and increase your chances of getting hired
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center animate-in fade-in duration-1000 delay-700">
          <h2 className="text-4xl font-bold mb-6">Ready to Boost Your Resume?</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Start your journey to landing your dream job with AI-powered resume analysis
          </p>
          <div className="flex flex-row gap-6 justify-center max-md:flex-col max-md:items-center">
            <Link 
              to="/upload" 
              className="primary-button w-fit text-xl font-semibold px-10 py-4 hover:scale-105 transition-transform duration-200"
            >
              Upload Your Resume
            </Link>
            <Link 
              to="/dashboard" 
              className="secondary-button w-fit text-xl font-semibold px-10 py-4 hover:scale-105 transition-transform duration-200"
            >
              View Examples
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}