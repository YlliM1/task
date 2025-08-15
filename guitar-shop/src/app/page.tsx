'use client'

import Image from "next/image";
import {  GET_BRANDS } from '../graphql/queries';
import { useQuery } from "@apollo/client";
import Link from "next/link";
import Footer from "./components/Footer";

console.log("GET_BRANDS:", GET_BRANDS);
console.log('ENV:', process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT);


export default function HomePage() {
   const { loading, error, data } = useQuery(GET_BRANDS, {
    fetchPolicy: 'network-only',
    errorPolicy: 'all'
  })

   console.log('Query state:', { loading, error, data: data?.findAllBrands })


    if (loading) return (
  <div className="min-h-screen bg-white flex flex-col items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
    <p className="text-gray-600">Loading guitars...</p>
  </div>
);

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        Error: {error.message}
      </p>
    );
  }


  return (
    <main className="font-satoshi">
      {/* Hero */}
    <section className="flex flex-col md:flex-row justify-between bg-white pb-[100px]">
  {/* Left side: Logo + Text */}
  <div className="flex-1 flex flex-col">
    <div className="flex flex-col items-start mt-[62px] ml-[120px]">
      {/* Logo */}
      <div className="flex items-center w-[160px] h-[32px] gap-2">
        <Image
          src="/images/Butterfly.png"
          alt="Butterfly"
          width={28}
          height={28}
        />
        <span className="text-black font-normal text-[24px] leading-[100%]">
          VibeStrings
        </span>
      </div>
      {/* Text */}
      <div className="mt-[173px]">
        <h1 className="text-[56px] font-[var(--font-satoshi)] font-bold leading-tight text-black w-[508px] h-[152px]">
          Browse top quality <span className="text-orange-500">Guitars</span> online
        </h1>
        <p className="text-[#666666] w-[398px] text-[16px] leading-[100%] font-[var(--font-satoshi)] font-[500]">
          Explore 50k+ latest collections of branded guitars online with VibeStrings.
        </p>
      </div>
    </div>
  </div>

  {/* Right side: Hero image only */}
  <div className="flex-1 flex justify-end">
    <div className="relative">
      <Image
        src="/images/hero-guitar.png"
        alt="Guitar"
        width={672}
        height={586}
        className="max-w-none" // Prevent image from being constrained
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
     {/* Brand Logos */}
<section className="bg-white px-8 py-12 text-center text-black pb-[240px]">
  <h2 className="text-xl text-[44px] text-black font-[var(--font-satoshi)] ">
    Featuring the <span className="text-orange-500">Best Brands</span>
  </h2>
  <p className="text-[#666666] mt-2">
    Select your preferred brand and explore our exquisite collection.
  </p>

  {/* Grid of logos */}
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-[60px]">
    {data.findAllBrands.map((brand: any) => (
      <Link
        key={brand.id}
        href={`/brand/${brand.id}`}
        className="mx-auto my-auto"
      >
        <Image
          src={brand.image}
          alt={brand.name}
          width={120}
          height={60}
          className="mx-auto my-auto"
        />
      </Link>
    ))}
  </div>
</section>


      {/* Why Choose Us */}
<section className="flex flex-col bg-black text-white py-32 text-center">
  <h2 className="text-[44px] font-[var(--font-satoshi)] font-normal mb-16 mx-auto mt-[93px]">
    Why try <span className="text-orange-500">VibeStrings?</span>
  </h2>
  <div className="flex flex-col md:flex-row justify-center gap-x-56 max-w-6xl mx-auto px-4">
    {[
      { 
        rectangle: "/images/Rectangle135.png",
        icon: "/images/category-2.png",
        title: "SMOOTH BROWSING",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      { 
        rectangle: "/images/Rectangle135.png",
        icon: "/images/group.png",
        title: "EASY DELIVERY", 
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      { 
        rectangle: "/images/Rectangle135.png",
        icon: "/images/empty-wallet-tick.png",
        title: "SWIFT PAYMENTS",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
    ].map((item) => (
      <div key={item.title} className="flex flex-col items-center w-[240px]">
        {/* Rectangle with centered icon */}
        <div className="relative w-[72px] h-[72px] mb-6">
          <Image
            src={item.rectangle}
            alt=""
            width={72}
            height={72}
            className="absolute"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={item.icon}
              alt=""
              width={32}
              height={32}
            />
          </div>
        </div>
        
        {/* Title with exact specifications */}
        <h3 className="text-[18px] font-[var(--font-satoshi)] font-bold uppercase 
                       tracking-[0.08em] leading-[100%] mb-4">
          {item.title}
        </h3>
        
        {/* Description text */}
        <p className="text-[#666666] text-[14px] font-[var(--font-satoshi)] font-normal">
          {item.description}
        </p>
      </div>
    ))}
  </div>
</section>


    {/* App Promo */}
<section className="bg-white px-8 py-16 flex flex-col pt-[268px] pl-[134px] py-42 md:flex-row items-center gap-8 relative">
  <div className="md:w-1/2 space-y-4 z-10">
    <h2 className="text-[48px] w-[484px] text-black font-[var(--font-satoshi)] font-normal">
      Browse and buy your <span className="text-orange-500">favorite guitars</span> with VibeStrings.
    </h2>
    <div className="flex gap-4 cursor-pointer pt-6">
      <Image src="/images/app-screen1.png" alt="App Store" width={192.38} height={57}/>
      <Image src="/images/app-screen2.png" alt="Google Play" width={192.38} height={57} />
    </div>
  </div>
  
  {/* Ellipse and phone screens container */}
  <div className="relative md:w-1/3"> {/* Height matches phone screens */}
    {/* Phone screens container */}
    <div className="relative z-10 flex gap-4 h-full">
      {/* Screen 1 */}
      <div className="relative">
        <Image 
          src="/images/screen1.png" 
          className="rounded-[25px] shadow-lg" 
          alt="App Screen"  
          width={213} 
          height={461}
        />
      </div>
      
      {/* Screen 2 */}
      <div className="relative mt-16"> {/* Adjust this value to stagger screens */}
        <Image 
          src="/images/screen2.png" 
          className="rounded-[25px] shadow-lg" 
          alt="App Screen" 
          width={213} 
          height={461} 
        />
      </div>
    </div>
    
    {/* Ellipse background - perfectly centered between screens */}
    <div className="absolute top-1/2 w-[568px] h-[354px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
      <Image 
        src="/images/Ellipse6.png" 
        alt="Ellipse background" 
        width={568} 
        height={354}
        className="object-contain"
      />
    </div>
  </div>
</section>

    <Footer/>

    </main>
  );
}
