import Image from "next/image";
import Link from "next/link";

  import React from 'react'
  
  const Footer = () => {
    return (
     <footer className="bg-gray-100 px-8 py-16 text-black font-[var(--font-satoshi)] font-normal align-center">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-22  ">
    {/* Column 1 - Logo and Contact */}
    <div className="flex flex-col space-y-6">
      <div className="flex items-center gap-2 w-[263px] h-[54px]">
        <Image
          src="/images/Butterfly.png"
          alt="VibeStrings Logo"
          width={28}
          height={28}
        />
        <span className="text-black font-[var(--font-satoshi)] font-normal text-[30px]">
          VibeStrings
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Image 
          src="/images/sms.png" 
          alt="Email" 
          width={24} 
          height={24}
        />
        <span className="text-[#666666] text-[16px] w-[181px]">Enquiry@VibeStrings.com</span>
      </div>
      
      <div className="flex items-start gap-3">
        <Image 
          src="/images/location.png" 
          alt="Location" 
          width={24} 
          height={24}
        />
        <span className="text-[#666666] text-[16px]">San Francisco</span>
      </div>
      
      
    </div>

    {/* Column 2 - Pages */}
    <div>
      <h3 className="text-black font-[var(--font-satoshi)] font-bold font-[18px] mb-4">PAGES</h3>
      <ul className="space-y-3">
        <li><Link href="/#" className="hover:text-orange-500 text-[16px] text-[#666666] font-[var(--font-satoshi)] font-normal"> Store</Link></li>
        <li><Link href="/#" className="hover:text-orange-500 text-[16px] text-[#666666] font-[var(--font-satoshi)] font-normal">Collections</Link></li>
        <li><Link href="/#" className="hover:text-orange-500  text-[16px] text-[#666666] font-[var(--font-satoshi)] font-normal">Support</Link></li>
      </ul>
    </div>

    {/* Column 3 - Products */}
    <div>
      <h3 className="text-black font-[var(--font-satoshi)] font-bold font-[18px] mb-4">PRODUCT</h3>
      <ul className="space-y-3">
        <li><Link href="/electric" className="hover:text-orange-500 text-[16px] text-[#666666] font-[var(--font-satoshi)] font-normal">Terms</Link></li>
        <li><Link href="/acoustic" className="hover:text-orange-500 text-[16px] text-[#666666] font-[var(--font-satoshi)] font-normal">Privacy Policy</Link></li>
        <li><Link href="/accessories" className="hover:text-orange-500 text-[16px] text-[#666666] font-[var(--font-satoshi)] font-normal">Copyright</Link></li>
      </ul>
    </div>

    {/* Column 4 - Social Media */}
    <div>
      <h3 className="text-black font-[var(--font-satoshi)] font-bold text-lg mb-4">FOLLOW US</h3>
      <div className="flex gap-8 mb-6 cursor-pointer">
        <Image src="/images/Facebook.png" alt="Facebook" width={32} height={33} />
        <Image src="/images/Instagram.png" alt="Instagram" width={32} height={33} />
        <Image src="/images/Twitter.png" alt="Twitter" width={32} height={33} />
      </div>
    </div>
  </div>
   <p className="text-[16px] text-[#666666] flex justify-center mt-[80px]">© 2022 Copyright.VibeStrings</p>
</footer>
    )
  }
  
  export default Footer
  