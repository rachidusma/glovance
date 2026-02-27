import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <main className="w-full min-h-screen flex flex-col lg:flex-row relative">
      <div className="w-full lg:w-5/12 xl:w-1/2 relative min-h-[50vh] lg:min-h-screen bg-secondary overflow-hidden group">
        <img
          alt="Cargo ship at night loaded with containers at a port"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBa1hnLOegnVESftYEVxlVadhL1wieFwVcK1vxlW8GvVrJ7YitTVAHT-I7osO9Ey4khiPjH4Bbp7wt0qUZrhL0XkaUDRs1E5d88hf5glA3NsAcFe66owbjZZ-Nc3tZhBm3EWPHB2xpJa0ZuLmBqtPiSnTNu_P_8RLbO-ncqlNXyoLb70VX8w99rmD4YFpwGJ8RKdA0gEAyDvE3ZttBEr12jVZWWDiDpt4L4xubDTEhUo8D46NRAsu0cmW7CIyHN9u0kGVe3kjyTb69L"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-transparent to-secondary opacity-90"></div>
        <div className="absolute inset-0 bg-secondary/40 mix-blend-multiply"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-tr from-primary/80 to-transparent transform -skew-y-12 translate-y-20 origin-bottom-left mix-blend-overlay hidden lg:block"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-16 z-10">
          <div className="mb-8">
            <h2 className="text-primary font-display font-bold text-5xl lg:text-7xl leading-tight mb-2">
              GLOBAL<br />REACH
            </h2>
            <p className="text-gray-300 font-light text-lg lg:text-xl max-w-md border-l-4 border-primary pl-4">
              Connecting markets through reliable logistics and premium sourcing.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-7/12 xl:w-1/2 bg-background-light dark:bg-background-dark text-text-dark dark:text-text-light p-8 pt-24 lg:p-20 flex flex-col justify-center overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-12">
            <h3 className="text-primary font-display font-bold text-2xl uppercase tracking-widest mb-2">
              About
            </h3>
            <h1 className="text-secondary dark:text-white font-display font-extrabold text-4xl lg:text-5xl uppercase tracking-wide leading-tight mb-6">
              Glovance Trading
            </h1>
            <div className="w-24 h-1.5 bg-secondary dark:bg-white mb-8"></div>
            <h4 className="font-display font-bold text-lg lg:text-xl text-secondary dark:text-gray-300 mb-4">
              GLOVANCE TRADING<br />
              <span className="font-medium text-gray-500 dark:text-gray-400">
                Import - Export - Distribution
              </span>
            </h4>
            <p className="text-gray-600 dark:text-gray-400 font-body leading-relaxed mb-6 text-justify">
              Connecting Qatar To The World. Glovance Trading Is An International
              Company Based In Qatar, Specializing In The Import And Export Of A
              Wide Range Of Products: Household Appliances, Pottery, Fruits, Dates,
              Everyday Consumer Goods, And Various Merchandise.
            </p>
          </div>
          <div className="mb-10">
            <h3 className="text-secondary dark:text-white font-display font-bold text-xl uppercase mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-body leading-relaxed">
              To Build Strong Bridges Between Global Markets And Provide Reliable,
              Carefully Selected Products, While Ensuring Smooth Logistics And
              High-quality Service.
            </p>
          </div>
          <div className="mb-12">
            <h3 className="text-secondary dark:text-white font-display font-bold text-xl uppercase mb-3">
              Our Values
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-body leading-relaxed">
              Quality • Reliability • Performance • Commitment • Innovation
            </p>
          </div>
          <div className="grid gap-8 py-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-6 group">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center bg-white dark:bg-secondary-light shadow-sm group-hover:border-primary transition-colors">
                <span className="material-icons text-primary text-3xl">
                  verified_user
                </span>
              </div>
              <div>
                <h4 className="text-secondary dark:text-white font-display font-bold text-2xl group-hover:text-primary transition-colors">
                  Quality
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Uncompromising standards in every product.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6 group">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center bg-white dark:bg-secondary-light shadow-sm group-hover:border-primary transition-colors">
                <span className="material-icons text-primary text-3xl">
                  handshake
                </span>
              </div>
              <div>
                <h4 className="text-secondary dark:text-white font-display font-bold text-2xl group-hover:text-primary transition-colors">
                  Reliability
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Trust built through consistent delivery.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6 group">
              <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-primary/30 flex items-center justify-center bg-white dark:bg-secondary-light shadow-sm group-hover:border-primary transition-colors">
                <span className="material-icons text-primary text-3xl">
                  public
                </span>
              </div>
              <div>
                <h4 className="text-secondary dark:text-white font-display font-bold text-2xl group-hover:text-primary transition-colors">
                  Network
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Extensive global connections.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <Link
              className="inline-flex items-center space-x-2 text-primary font-bold hover:text-green-400 transition-colors uppercase tracking-wider text-sm"
              href="#"
            >
              <span>Download 2026 Catalogue</span>
              <span className="material-icons text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
