'use client';

import { useQuery } from "@apollo/client";
import { GET_MODEL_DETAILS, GET_BRANDS } from "@/graphql/queries";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";

interface Specs {
  bodyWood: string;
  neckWood: string;
  fingerboardWood: string;
  pickups: string;
  tuners: string;
  scaleLength: string;
  bridge: string;
}

interface Musician {
  name: string;
  musicianImage: string;
  bands: string[];
}

interface ModelDetails {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  price: number;
  specs: Specs;
  musicians: Musician[];
}

export default function ModelDetailsPage() {
  const { id, modelId } = useParams<{ id: string; modelId: string }>();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'specs' | 'musicians'>('specs');
  const [musiciansPage, setMusiciansPage] = useState(1);
  const musiciansPerPage = 2;

  // Fetch model details
  const { loading, error, data } = useQuery(GET_MODEL_DETAILS, {
    variables: { brandId: id, modelId },
    fetchPolicy: "network-only",
  });

  // Fetch brand logo
  const { data: brandData } = useQuery(GET_BRANDS, { fetchPolicy: "cache-first" });
  const selectedBrand = brandData?.findAllBrands.find((b: any) => b.id === id);
  const model: ModelDetails = data?.findUniqueModel;

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
      <p className="text-gray-600">Loading guitar details...</p>
    </div>
  );

  if (error) {
    console.error("GraphQL Error:", error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-500 px-4">
        <h1 className="text-xl font-bold mb-4">GraphQL Error</h1>
        <pre className="text-sm bg-gray-100 p-4 rounded max-w-full overflow-x-auto">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  // Calculate paginated musicians
  const currentMusicians = model?.musicians?.slice(
    (musiciansPage - 1) * musiciansPerPage,
    musiciansPage * musiciansPerPage
  ) || [];
  const totalMusiciansPages = Math.ceil((model?.musicians?.length || 0) / musiciansPerPage);

  return (
    <main className="min-h-screen bg-white text-black font-[var(--font-satoshi)] relative overflow-hidden">
      {/* Orange Ball */}
      <div className="absolute top-0 right-0 w-[672px] h-[459px]">
        <Image
          src="/images/orange-ball.png"
          alt="Decorative orange ball"
          width={672}
          height={459}
          className="object-cover"
          priority
        />
        {model?.image && (
          <Image
            src={model.image}
            alt={model.name}
            width={451}
            height={280}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 pl-30 pb-20"
            priority
          />
        )}
        <div className="absolute left-1/2 -translate-x-1/2 ml-[80px] -bottom-10 w-[80px] h-[80px]">
          <Image 
            src="/images/Ellipse5.png" 
            alt="Ellipse" 
            width={80} 
            height={80} 
            className="absolute top-0 left-0"
            priority
          />
          <Image
            src="/images/Butterfly.png"
            alt="Butterfly"
            width={28}
            height={28}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <section>
          <div className="mx-auto flex justify-between items-center ml-[31px]">
            <button
              onClick={() => router.back()}
              className="flex items-center hover:opacity-80 transition-opacity cursor-pointer gap-6 mt-[33px]"
            >
              <Image 
                src="/images/left.png" 
                alt="Back" 
                width={14} 
                height={14} 
                className="filter invert"
                priority
              />
              <span className="font-normal text-[#3D3D46] text-[16px] font-[var(--font-circular)]">
                Back to List
              </span>
            </button>
          </div>

          <div className="flex items-center w-[160px] h-[32px] gap-2 ml-[120px] height-[32px]">
            <Image 
              src="/images/Butterfly.png" 
              alt="Butterfly" 
              width={28} 
              height={28} 
              priority
            />
            <span className="text-black font-[var(--font-satoshi)] text-[24px] leading-[100%]">VibeStrings</span>
          </div>

          {/* Title */}
          <div className=" w-[536px] mt-[185px] ml-[120px] h-[100px]">
            <h1 className="text-[56px] pl-[50px] md:text-5xl font-bold text-black">
              {model?.name || "Guitar Model"}
            </h1>
          </div>
        </section>

        {/* Model Details Section */}
        <section className="w-full mx-auto mr-5 py-70 relative">
          {/* Tabs */}
           <div className="w-full border-b border-gray-200 mb-8 ">
            <div className="flex">
            {/* Specifications Tab - Takes half width */}
            <div className={`w-1/2 flex justify-center ${activeTab === 'specs' ? 'border-b-2 border-orange-500' : ''}`}>
                <button
                className={`py-4 px-6 cursor-pointer font-medium text-lg w-full text-center ${activeTab === 'specs' ? 'text-orange-500' : 'text-[#666666] hover:text-orange-400'}`}
                onClick={() => setActiveTab('specs')}
                >
                Specifications
                </button>
            </div>
            
            {/* Who Plays It Tab - Takes half width */}
            <div className={`w-1/2 flex  justify-center ${activeTab === 'musicians' ? 'border-b-2 border-orange-500' : ''}`}>
                <button
                className={`py-4 px-6 cursor-pointer font-medium text-lg w-full text-center ${activeTab === 'musicians' ? 'text-orange-500' : 'text-[#666666] hover:text-orange-400'}`}
                onClick={() => setActiveTab('musicians')}
                >
                Who Plays It
                </button>
            </div>
            </div>
        </div>

          {/* Tab Content */}
          <div className="min-h-[400px] max-w-full ml-30 mr-30">
          {activeTab === 'specs' && (
            <div className="space-y-8">
                {/* Full width description */}
                <div className="w-full">
                <p className="text-black w-[1237px] text-[24px] font-light">{model?.description || "No description available"}</p>
                </div>

                {/* Specifications in bullet points */}
                <div>
                <ul className="space-y-3 list-disc pl-5  font-light text-[24px] leading-[100%]">
                    {model?.specs &&
                    Object.entries(model.specs)
                        .filter(([key]) => key !== "__typename") // Remove __typename
                        .map(([key, value]) => (
                        <li key={key} className="text-black font-light">
                            <span className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}:{' '}
                            </span>
                            “{value || '-'}”
                        </li>
                        ))}
                </ul>
                </div>

            </div>
            )}

            {activeTab === 'musicians' && (
                <div className="flex flex-col items-center">
                    {/* Musicians Grid */}
                    {currentMusicians.length > 0 ? (
                    <div className="flex justify-center gap-6">
                        {currentMusicians.map((musician, index) => (
                        <div 
                            key={index} 
                            className="w-[492px] h-[549px] bg-[#FFEFE8] flex flex-col items-center p-6"
                        >
                            {musician.musicianImage && (
                            <div className="w-[444px] h-[444px] relative mb-4">
                                <Image
                                src={musician.musicianImage}
                                alt={musician.name}
                                fill
                                className="object-cover"
                                />
                            </div>
                            )}
                            <h4 className="text-[#666666] text-center text-[24px] font-medium">
                            {musician.name}
                            </h4>
                           
                        </div>
                        ))}
                    </div>
                    ) : (
                    <p className="text-[#666666]">No musician information available</p>
                    )}

                    {/* Pagination Dots */}
                   {totalMusiciansPages > 1 && (
                    <div className="flex justify-center mt-8 gap-3 items-center">
                        {Array.from({ length: totalMusiciansPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setMusiciansPage(i + 1)}
                            className={`rounded-full bg-[#D9D9D9] transition-all duration-200 ${
                            musiciansPage === i + 1 ? 'w-4 h-4' : 'w-3 h-3 opacity-50'
                            }`}
                            aria-label={`Go to page ${i + 1}`}
                        />
                        ))}
                    </div>
                    )}
                </div>
                )}
          </div>
        </section>
      </div>

      <Footer/>
    </main>
  );
}