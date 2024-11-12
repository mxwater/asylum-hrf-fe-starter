import pieChart from '../../../assets/pie-chart.png';
import lineGraph from '../../../assets/line-graph.png';
import barGraph from '../../../assets/bar-graph.png';
import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
import { useDownloadData } from '../../../hooks/useDownloadData.js';
import { decodeBase64 } from '../../../utils/decodeBase64.js';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { downloadCSV } = useDownloadData();

  const scrollToTop = () => {
    let scrollStep = -window.scrollY / 20;
    let scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 10);
  };

  const handleReadMore = () => {
    window.location.href = 'https://www.humanrightsfirst.org';
  };

  return (
    <div className="w-full bg-gray-100 p-10">
      {/* Title and Subtitle */}
      <h1 className="text-4xl font-bold text-center mt-8 text-gray-800">Asylum Office Grant Rate Tracker</h1>
      <p className="text-center text-lg mt-4 mb-12 text-gray-700">
        The Asylum Office Grant Rate Tracker provides asylum seekers, researchers, policymakers, and the public an interactive tool to explore USCIS data on Asylum Office decisions.
      </p>

      {/* Visualization Buttons */}
      <div className="flex justify-center space-x-8 mb-12">
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
          <img src={barGraph} alt="Bar Graph" className="w-24 h-24 mb-2" />
          <p className="text-gray-800">Search Grant Rates By Office</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
          <img src={pieChart} alt="Pie Chart" className="w-24 h-24 mb-2" />
          <p className="text-gray-800">Search Grant Rates By Nationality</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
          <img src={lineGraph} alt="Line Graph" className="w-24 h-24 mb-2" />
          <p className="text-gray-800">Search Grant Rates Over Time</p>
        </div>
      </div>

      {/* Data Action Buttons */}
      <div className="flex justify-center space-x-6 mb-16">
        <button className="bg-[#6A6A5F] text-white px-6 py-3 rounded-lg">View the Data</button>
        <button onClick={downloadCSV} className="bg-[#6A6A5F] text-white px-6 py-3 rounded-lg">Download the Data</button>
      </div>

      {/* Image and Description Section */}
      <div className="flex justify-center items-center mt-16 mb-20 px-4 lg:px-24">
        <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
          <img src={paperStack} alt="Stack of papers" className="w-80 h-auto rounded-lg shadow-lg" />
          <p className="text-center lg:text-left text-lg leading-relaxed max-w-lg">
            Human Rights First has created a search tool to give you a user-friendly way to explore a data set of asylum decisions between FY 2016 and May 2021 by the USCIS Asylum Office, which we received through a Freedom of Information Act request. You can search for information on asylum grant rates by year, nationality, and asylum office, visualize the data with charts and heat maps, and download the data set.
          </p>
        </div>
      </div>

      {/* Systemic Disparity Insights */}
      <div className="bg-gray-50 p-10 rounded-lg mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Systemic Disparity Insights</h2>
        <div className="flex justify-center space-x-16 text-center">
          <div>
            <div className="text-4xl font-bold mb-4 text-gray-800">36%</div>
            <p className="text-gray-700 text-base max-w-xs">By the end of the Trump administration, the average asylum office grant rate had fallen to 28% from an average of 44% in fiscal year 2016.</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-4 text-gray-800">5%</div>
            <p className="text-gray-700 text-base max-w-xs">The New York asylum office grant rate dropped to 5% in fiscal year 2020.</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-4 text-gray-800">6x Lower</div>
            <p className="text-gray-700 text-base max-w-xs">Between fiscal year 2017 and 2020, the New York asylum office’s average grant rate was 6 times lower than the San Francisco asylum office.</p>
          </div>
        </div>

        <button onClick={handleReadMore} className="bg-[#6A6A5F] text-white px-8 py-3 rounded-lg mt-10 mx-auto block">
          Read More
        </button>
      </div>

      {/* Back to Top Button */}
      <div className="text-center">
        <button onClick={scrollToTop} className="text-[#6A6A5F] underline cursor-pointer">
          Back To Top ^
        </button>
      </div>
    </div>
  );
};
