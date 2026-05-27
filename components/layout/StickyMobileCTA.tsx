import Link from "next/link";

export default function StickyMobileCTA() {
  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-black/10
        bg-white/95
        backdrop-blur
        p-4
        shadow-[0_-10px_30px_rgba(0,0,0,0.08)]
        lg:hidden
      "
    >
      <div className="flex gap-3">
        <Link
          href="/contact"
          className="
            flex-1
            inline-flex
            items-center
            justify-center
            rounded-2xl
            bg-[#003478]
            px-5
            py-4
            text-sm
            font-semibold
            text-white
            shadow-lg
            shadow-[#003478]/20
            transition-all
            duration-200
            hover:bg-[#002B63]
          "
        >
          Book Free Trial
        </Link>

        <Link
          href="/locations"
          className="
            inline-flex
            items-center
            justify-center
            rounded-2xl
            border
            border-black/10
            bg-white
            px-5
            py-4
            text-sm
            font-semibold
            text-[#111111]
            transition-all
            duration-200
            hover:border-[#003478]/20
            hover:text-[#003478]
          "
        >
          Locations
        </Link>
      </div>
    </div>
  );
}