"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@c/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@c/ui/select";
import {
  defaultFilter,
  filtersMap,
  numberOfPredictionsOptions,
} from "./constants";
import {
  normalizeNumberOfPredictions,
  isValidNumberOfPredictions,
} from "./utils";

export const FilterControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get("filter") || defaultFilter;
  const numberOfPredictions = normalizeNumberOfPredictions(
    searchParams.get("numberOfPredictions"),
  );

  useEffect(() => {
    const rawValue = searchParams.get("numberOfPredictions");

    if (
      searchParams.has("numberOfPredictions") &&
      !isValidNumberOfPredictions(rawValue)
    ) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("numberOfPredictions");
      router.replace(params.toString() ? `?${params.toString()}` : "?");
    }
  }, [router, searchParams]);

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === defaultFilter || value === "0") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.push(query ? `?${query}` : "?");
  };

  const handleFilterChange = (value: string) => {
    updateQueryParam("filter", value);
  };

  const handleNumberOfPredictionsChange = (value: string) => {
    updateQueryParam("numberOfPredictions", normalizeNumberOfPredictions(value));
  };

  return (
    <div className="mb-6 md:flex md:flex-row items-center gap-4">
      <span className="text-sm font-medium text-muted-foreground">
        Filters:
      </span>
      <div className="flex flex-wrap gap-2">
        {Object.values(filtersMap).map(({ filter, label }) => (
          <Button
            className="cursor-pointer"
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={() => handleFilterChange(filter)}
          >
            {label}
          </Button>
        ))}
        <Select
          value={numberOfPredictions}
          onValueChange={handleNumberOfPredictionsChange}
        >
          <SelectTrigger aria-label="Number of Predictions">
            <SelectValue placeholder="Number of Predictions" />
          </SelectTrigger>
          <SelectContent>
            {numberOfPredictionsOptions.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
