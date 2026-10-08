import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Info, HeartHandshake } from "lucide-react";
import { BreedData } from "../../lib/data";
import { cn } from "../../lib/utils";
import Badge from "../ui/Badge";

interface BreedCardProps {
  breed: BreedData;
  className?: string;
}

export const BreedCard: React.FC<BreedCardProps> = ({ breed, className }) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl border border-[#E2DBD2] dark:border-[#253831] bg-white dark:bg-[#172420] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden",
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FAF8F5] dark:bg-[#141F1C]">
        <Image
          src={breed.image}
          alt={breed.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex gap-1.5">
          <Badge variant="secondary" size="sm" className="shadow-sm">
            {breed.size} Size
          </Badge>
          <Badge variant="primary" size="sm" className="shadow-sm">
            {breed.careLevel} Care
          </Badge>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div>
          <span className="text-[11px] text-[#738078] dark:text-[#7E9086] font-medium">
            Origin: {breed.origin}
          </span>
          <h3 className="text-lg font-bold text-[#1C2421] dark:text-[#F3F7F5] group-hover:text-[#1B4332] dark:group-hover:text-[#4BB787] transition-colors">
            {breed.name}
          </h3>
        </div>

        <p className="text-xs text-[#738078] dark:text-[#7E9086] line-clamp-2 leading-relaxed">
          {breed.description}
        </p>

        {/* Temperament Tags */}
        <div className="flex flex-wrap gap-1">
          {breed.temperament.map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF8F5] dark:bg-[#1C2C27] text-[#4A5550] dark:text-[#B6C4BC] border border-[#EFECE6] dark:border-[#253831]"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="pt-3 mt-auto border-t border-[#EFECE6] dark:border-[#1C2C27] flex items-center justify-between text-xs">
          <span className="text-[#738078] dark:text-[#7E9086]">
            Lifespan: <strong>{breed.lifeExpectancy}</strong>
          </span>

          <Link
            href={`/${breed.animalType}?breed=${breed.slug}`}
            className="inline-flex items-center gap-1 font-bold text-[#1B4332] dark:text-[#4BB787] group-hover:underline"
          >
            <span>View Pets ({breed.petCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BreedCard;
