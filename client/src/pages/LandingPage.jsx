import Navbar from "../components/Navbar";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <section className="relative max-w-7xl w-full mx-auto px-4 md:px-6 py-16 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Content */}
          <div className="md:col-span-6 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Free Online Mind Mapping Tool
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              Create, Share, Collaborate, View your mind maps!
            </p>
            <div className="space-x-4">
              <a
                href="#"
                className="bg-primary text-white py-3 px-6 rounded-full bg-black text-lg"
              >
                Explore
              </a>
              <a href="#" className="text-primary py-3 px-6 text-lg">
                Learn more
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:col-span-6 flex justify-center md:justify-end">
            <img
              src="https://www.mindmapping.com/img/theory-behind-mind-maps.jpg"
              alt="Mind Mapping Tool Image"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
