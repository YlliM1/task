import Image from "next/image";


export default function HomePage() {
  return (
    <main className="font-sans">
      {/* Hero */}
    <section className="flex flex-col md:flex-row justify-between bg-white pb-[100px] ">
  {/* Left side: Logo + Text */}
  <div className=" flex">
    <div className="md:w-1/2 flex flex-col items-start mt-[62px] ml-[120px] ">
      {/* Logo */}
      <div className="flex items-center w-[160px] h-[32px] gap-2">
        <Image
          src="/images/Butterfly.png"
          alt="Butterfly"
          width={28}
          height={28}
        />
     <span
    className="
      text-black
      font-[var(--font-satoshi)]
      font-normal
      text-[24px]
      leading-[100%]
      text-center
    "
    >
    VibeStrings
    </span>
      </div>
      {/* Text */}
      <div className="mt-[173px]">
        <h1 className="text-[56px] font-[var(--font-satoshi)] font-bold  leading-tight text-black w-[508px] h-[152px]">
          Browse top quality <span className="text-orange-500">Guitars</span> online
        </h1>
        <p className="text-[#666666] w-[398px] text-[16px] leading-[100%] font-[var(--font-satoshi)] font-[500] text-center">
          Explore 50k+ latest collections of branded guitars online with VibeStrings.
        </p>
      </div>
    </div>
    {/* Right side: Hero image */}
    <div className="md:w-1/2 flex justify-end mt-8 md:mt-0 relative">
    {/* Hero image */}
    <Image
      src="/images/hero-guitar.png"
      alt="Guitar"
      width={672}
      height={586}
    />
    {/* Ellipse with Butterfly inside */}
    <div className="absolute left-1/2 -translate-x-1/2 ml-[80px] -bottom-10 w-[80px] h-[80px]">
      <Image
        src="/images/Ellipse5.png"
        alt="Ellipse"
        width={80}
        height={80}
        className="absolute top-0 left-0"
      />
      <Image
        src="/images/Butterfly.png"
        alt="Butterfly"
        width={28}
        height={28}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
    </div>
  </div>
</section>

      {/* Brand Logos */}
      <section className="bg-white px-8 py-12 text-center text-black pb-[240px]">
  <h2 className="text-xl text-[44px] text-black font-[var(--font-satoshi)] font-bold">
    Featuring the <span className="text-orange-500">Best Brands</span>
  </h2>
  <p className="text-[#666666] mt-2">
    Select your preferred brand and explore our exquisite collection.
  </p>

  {/* Grid of logos */}
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-[60px]">
    {[
      "ibanez.png",
      "martin.png",
      "fender.png",
      "gibson.png",
      "taylor.png",
      "freitsch.png",
      "cakamine.png",
      "seagull.png",
    ].map((logo) => (
      <Image
        key={logo}
        src={`/brands/${logo}`}
        alt={logo}
        width={120}
        height={60}
        className="mx-auto my-auto"
      />
    ))}
  </div>
</section>

      {/* Why Choose Us */}
          <section className="flex flex-col bg-black text-white py-16 text-center">
        <h2 className="text-[44px] font-[var(--font-satoshi)] font-normal mb-8 mx-auto mt-[93px]">
          Why try <span className="text-orange-500">VibeStrings?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: "🎵", title: "Smooth Browsing" },
            { icon: "🚚", title: "Easy Delivery" },
            { icon: "⚡", title: "Swift Payments" },
          ].map((item) => (
            <div key={item.title} className="space-y-2">
              <div className="text-4xl">{item.icon}</div>
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </section>


      {/* App Promo */}
      <section className="px-8 py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 space-y-4">
          <h2 className="text-2xl font-bold">
            Browse and buy your favorite guitars with VibeStrings.
          </h2>
          <div className="flex gap-4">
            <Image src="/appstore.png" alt="App Store" width={120} height={40} />
            <Image src="/googleplay.png" alt="Google Play" width={120} height={40} />
          </div>
        </div>
        <div className="md:w-1/2 flex gap-4">
          <Image src="/app-screen1.png" alt="App Screen" width={180} height={360} />
          <Image src="/app-screen2.png" alt="App Screen" width={180} height={360} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 px-8 py-6 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2025 VibeStrings</p>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Product</a>
            <a href="#">Follow us</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
