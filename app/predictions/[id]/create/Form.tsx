"use client";

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form as UIForm,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Flag from "@/components/custom/Flag";
import { createPrediction } from "./actions";

export default function Form({
  events,
  userId,
}: {
  events: any[];
  userId: string;
}) {
  const FormSchema = z.strictObject(
    events.reduce(
      (acc, item) => ({ ...acc, [item.id]: z.optional(z.string()) }),
      {},
    ),
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await createPrediction(data, userId);
  };
  return (
    <UIForm {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          {events.map((event) => (
            <div className="flex items-center mb-2" key={event.id.toString()}>
              <div>
                <Button asChild variant="link">
                  <Link href={`/events/${event.id}`}>{event.id}</Link>
                </Button>
              </div>
              <div>{event.tournament}</div>
              <div className="flex items-center">
                <div className="px-2">
                  <Flag name={event.flagHome} />
                </div>
                <div>{event.home}</div>
                <div className="px-2">
                  <FormField
                    control={form.control}
                    name={event.id.toString()}
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Select prediction" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {event.odd?.zeroZero && (
                              <SelectItem value="0:0">
                                0:0 = {event.odd.zeroZero}pts
                              </SelectItem>
                            )}
                            {event.odd?.oneOne && (
                              <SelectItem value="1:1">
                                1:1 = {event.odd.oneOne}pts
                              </SelectItem>
                            )}
                            {event.odd?.twoTwo && (
                              <SelectItem value="2:2">
                                2:2 = {event.odd.twoTwo}pts
                              </SelectItem>
                            )}
                            {event.odd?.oneZero && (
                              <SelectItem value="1:0">
                                1:0 = {event.odd.oneZero}pts
                              </SelectItem>
                            )}
                            {event.odd?.twoZero && (
                              <SelectItem value="2:0">
                                2:0 = {event.odd.twoZero}pts
                              </SelectItem>
                            )}
                            {event.odd?.threeZero && (
                              <SelectItem value="3:0">
                                3:0 = {event.odd.threeZero}pts
                              </SelectItem>
                            )}
                            {event.odd?.twoOne && (
                              <SelectItem value="2:1">
                                2:1 = {event.odd.twoOne}pts
                              </SelectItem>
                            )}
                            {event.odd?.threeOne && (
                              <SelectItem value="3:1">
                                3:1 = {event.odd.threeOne}pts
                              </SelectItem>
                            )}
                            {event.odd?.threeTwo && (
                              <SelectItem value="3:2">
                                3:2 = {event.odd.threeTwo}pts
                              </SelectItem>
                            )}
                            {event.odd?.zeroOne && (
                              <SelectItem value="0:1">
                                0:1 = {event.odd.zeroOne}pts
                              </SelectItem>
                            )}
                            {event.odd?.zeroTwo && (
                              <SelectItem value="0:2">
                                0:2 = {event.odd.zeroTwo}pts
                              </SelectItem>
                            )}
                            {event.odd?.zeroThree && (
                              <SelectItem value="0:3">
                                0:3 = {event.odd.zeroThree}pts
                              </SelectItem>
                            )}
                            {event.odd?.oneTwo && (
                              <SelectItem value="1:2">
                                1:2 = {event.odd.oneTwo}pts
                              </SelectItem>
                            )}
                            {event.odd?.oneThree && (
                              <SelectItem value="1:3">
                                1:3 = {event.odd.oneThree}pts
                              </SelectItem>
                            )}
                            {event.odd?.twoThree && (
                              <SelectItem value="2:3">
                                2:3 = {event.odd.twoThree}pts
                              </SelectItem>
                            )}
                            {event.odd?.anyOther && (
                              <SelectItem value="Any Other">
                                Any Other = {event.odd.anyOther}pts
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>{event.away}</div>
                <div className="px-2">
                  <Flag name={event.flagAway} />
                </div>
              </div>
            </div>
          ))}
          <div className="mx-4">
            <Button type="submit" className="cursor-pointer">
              Send Prediction
            </Button>
          </div>
        </div>
      </form>
    </UIForm>
  );
}
