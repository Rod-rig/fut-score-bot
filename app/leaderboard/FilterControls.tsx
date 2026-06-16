"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@c/ui/button";
import { defaultFilter, filtersMap } from "./constants";

export const FilterControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeFilter = searchParams.get("filter") || defaultFilter;

  const handleFilterChange = (value: string) => () => {
    const params = new URLSearchParams(searchParams);
    if (value === defaultFilter) {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex flex-row items-center gap-4">
      <span className="text-sm font-medium text-muted-foreground">
        Filters:
      </span>
      <div className="flex flex-wrap gap-2">
        {Object.values(filtersMap).map(({ filter, label }) => (
          <Button
            className="cursor-pointer"
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={handleFilterChange(filter)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};
