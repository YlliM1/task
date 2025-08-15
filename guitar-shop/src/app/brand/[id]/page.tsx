'use client';

import { useQuery } from "@apollo/client";
import { GET_BRAND_MODELS, GET_BRANDS, SEARCH_MODELS } from "@/graphql/queries";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import Image from "next/image";

type ModelSortField = "name" | "price";
type SortOrder = "ASC" | "DESC";

interface SortBy {
  field: ModelSortField;
  order: SortOrder;
}

interface Model {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
}

export default function BrandModelsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState<SortBy>({ field: "name", order: "ASC" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedType, debouncedSearchTerm, sortBy]);

  const brandIdString = id ? String(id) : "";

  // Fetch brand models
  const { loading: brandLoading, error: brandError, data: brandData } = useQuery(GET_BRAND_MODELS, {
    variables: { id: brandIdString, sortBy },
    skip: !brandIdString || debouncedSearchTerm.length > 0,
    fetchPolicy: "network-only",
  });

  // Fetch brand logo
  const { data: allBrandsData } = useQuery(GET_BRANDS, { fetchPolicy: "cache-first" });
  const selectedBrand = allBrandsData?.findAllBrands.find((b: any) => b.id === id);

  // Search models
  const { loading: searchLoading, error: searchError, data: searchData } = useQuery(SEARCH_MODELS, {
    variables: { brandId: brandIdString, name: debouncedSearchTerm },
    skip: !brandIdString || debouncedSearchTerm.length === 0,
    fetchPolicy: "network-only",
  });

  const loading = brandLoading || searchLoading;
  const error = brandError || searchError;

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

  const models: Model[] = debouncedSearchTerm
    ? searchData?.searchModels || []
    : brandData?.findBrandModels || [];

  const filteredModels =
    selectedType === "all"
      ? models
      : models.filter((model: Model) => model.type?.toLowerCase() === selectedType.toLowerCase());

  // Client-side sorting
  const sortedModels = [...filteredModels].sort((a, b) => {
    if (sortBy.field === "name") {
      return sortBy.order === "ASC"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortBy.field === "price") {
      return sortBy.order === "ASC" ? a.price - b.price : b.price - a.price;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedModels.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentModels = sortedModels.slice(indexOfFirst, indexOfLast);

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
        {selectedBrand?.image && (
          <Image
            src={selectedBrand.image}
            alt={selectedBrand.name}
            width={451}
            height={280}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 pl-30 pb-20"
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
                Back to Home
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

          {/* Title and Paragraph */}
          <div className="ml-[120px] mt-8 w-[536px] h-[239px]">
            <h1 className="text-[56px] font-[var(--font-satoshi)] md:text-5xl font-bold text-black">
              Play like a <span className="text-orange-500">Rock star</span>
            </h1>
            <p className="mt-4 text-[#666666] w-[475px] font-[var(--font-satoshi)] text-[16px] text-center">
              With a legacy dating back to the 1950s, {selectedBrand?.name || "brand"} blends expert craftsmanship
              with cutting-edge innovation to deliver guitars that inspire creativity and elevate your performance.
              Trusted by top artists worldwide, {selectedBrand?.name || "brand"} guitars are built to play fast, sound
              bold, and stand out on any stage.
            </p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="max-w-7xl mx-auto px-8 py-70 relative">
          <div className="flex justify-center pb-[151px]">
            <h1 className="text-[44px] font-bold">
              Check out the <span className="text-orange-500">Selection</span>
            </h1>
          </div>

          {/* Search & Filter Inputs */}
          <div className="flex flex-col md:flex-row justify-center gap-7 mb-8">
            <div className="flex gap-4">
              {/* Filter */}
              <div className="relative w-[225px]">
                <Image 
                  src="/images/filter.png" 
                  width={20} 
                  height={20} 
                  alt="Filter" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  priority
                />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-3 pl-20 pr-8 border border-gray-300 text-[#B8B8C0] focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none"
                >
                  <option value="all" className="text-[#B8B8C0]">
                    Filter by type
                  </option>
                  <option value="electric">Electric</option>
                  <option value="acoustic">Acoustic</option>
                  <option value="bass">Bass</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="#B8B8C0" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              {/* Search Input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search models..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-[485px] p-3 pl-40 border border-gray-300 text-[#B8B8C0] focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Image 
                  src="/images/search.png" 
                  alt="Search" 
                  width={20} 
                  height={20} 
                  className="absolute left-3 top-3.5"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentModels.map((model: Model) => (
              <Link
                key={model.id}
                href={`/brand/${id}/model/${model.id}`}
                className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4">
                  <div className="aspect-square relative rounded-lg mb-4">
                    {model.image && (
                      <Image 
                        src={model.image} 
                        alt={model.name} 
                        fill 
                        className="object-contain p-4" 
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    )}
                  </div>
                  <h3 className="font-bold text-lg line-clamp-2 text-[16px]">{model.name}</h3>
                  <p className="text-[#666666] text-[14px] mt-2 text-base">${model.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Pagination and Results Count */}
<div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-4">
  {/* Results count - left aligned */}
  <div className="text-[#666666] text-sm md:text-base text-bold">
    Showing <span className="text-black text-bold">{currentModels.length}</span> results from <span className="text-black text-bold">{sortedModels.length}</span>
  </div>
  
  {/* Pagination - centered on mobile, right on desktop */}
  {totalPages > 1 && (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded disabled:opacity-50 text-[#666666] hover:text-orange-500 transition-colors"
      >
        <Image src="/images/left.png" alt="Left Arrow" height={20} width={20} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-4 py-2 border rounded text-[#666666] ${currentPage === page ? "text-orange-500" : "hover:text-orange-500"} transition-colors`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded disabled:opacity-50 text-[#666666] hover:text-orange-500 transition-colors"
      >
        <Image src="/images/left.png" alt="Left Arrow" height={20} width={20} className="-scale-x-100" />
      </button>
    </div>
  )}
</div>

          {/* Empty State */}
          {sortedModels.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No models found matching your criteria</p>
            </div>
          )}

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
              <p className="text-gray-600">Loading brands...</p>
            </div>
          )}
        </section>
      </div>
        <Footer/>
    </main>
  );
}