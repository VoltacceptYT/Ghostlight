import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-12 sm:py-20 flex flex-col items-center justify-center text-center space-y-4 px-2 sm:px-0">
      <Image src="confused_ghost.webp" alt="Confused Ghost" width={128} height={128} aria-hidden className="max-w-[96px] sm:max-w-[128px] max-h-[96px] sm:max-h-[128px]" />
      <div>
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold">Guardian?</p>
        <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Whoops, the page couldn't be found</p>
      </div>
      <Link href="/" className="inline-block mt-4 px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium shadow hover:bg-primary/90 transition-colors">Return Home</Link>
    </div>
  );
}
