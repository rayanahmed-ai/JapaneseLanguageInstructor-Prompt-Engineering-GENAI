import * as React from 'react';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Master Japanese Typing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
            Learn to type Japanese with interactive lessons, real-time feedback, and personalized progress tracking.
          </p>
          
          {/* Animated Japanese Characters */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-6xl animate-float">あ</div>
            <div className="text-6xl animate-float" style={{animationDelay: '0.5s'}}>い</div>
            <div className="text-6xl animate-float" style={{animationDelay: '1s'}}>う</div>
            <div className="text-6xl animate-float" style={{animationDelay: '1.5s'}}>え</div>
            <div className="text-6xl animate-float" style={{animationDelay: '2s'}}>お</div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register" 
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started Free
            </Link>
            <Link 
              href="/login" 
              className="btn-secondary text-lg px-8 py-4"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Japanese Typing Tutor?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Goal-Oriented Learning
              </h3>
              <p className="text-gray-600">
                Structured lessons designed to take you from beginner to advanced, with clear progress milestones.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-Time Feedback
              </h3>
              <p className="text-gray-600">
                Get instant WPM, accuracy, and error correction as you type to improve your skills.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Progress Analytics
              </h3>
              <p className="text-gray-600">
                Track your improvement over time with detailed statistics and achievement badges.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Gamified Experience
              </h3>
              <p className="text-gray-600">
                Learn through engaging activities and challenges that make practice fun and addictive.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Responsive Design
              </h3>
              <p className="text-gray-600">
                Practice on any device with our mobile-optimized interface that works everywhere.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Certificate of Completion
              </h3>
              <p className="text-gray-600">
                Earn certificates as you master different levels and share your achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Typing Demo Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Try It Now
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience our interactive typing interface with this quick demo
          </p>
          
          {/* Simple Typing Demo */}
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="text-4xl font-bold text-center text-blue-900 mb-4">
              こんにちは
            </div>
            <div className="text-2xl text-center text-gray-500 mb-6">
              konnichiwa
            </div>
            <input
              type="text"
              placeholder="Start typing here..."
              className="typing-input mb-4"
              disabled
            />
            <div className="text-center text-gray-500 text-sm">
              This is a demo. Sign up to start practicing!
            </div>
          </div>
          
          <Link 
            href="/register" 
            className="btn-primary text-lg px-8 py-4 mt-8"
          >
            Start Learning Journey
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-blue-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            Join Thousands of Learners
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-xl">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-xl">Lessons Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-xl">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Master Japanese Typing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join today and start your journey to Japanese typing fluency
          </p>
          <Link 
            href="/register" 
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Get Started Now - It's Free!
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
