"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const description = "An interactive area chart for user growth";

const chartConfig = {
  count: {
    label: "New Users",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

interface User {
  created_at?: string;
  [key: string]: any;
}

interface ChartAreaInteractiveProps {
  users?: User[];
}

export function ChartAreaInteractive({
  users = [],
}: ChartAreaInteractiveProps) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const processedData = React.useMemo(() => {
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date();
    startDate.setDate(now.getDate() - daysToSubtract);
    startDate.setHours(0, 0, 0, 0);

    // Initialize map for all dates in range
    const dataMap: Record<string, number> = {};
    for (let i = 0; i <= daysToSubtract; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dateKey = d.toISOString().split("T")[0];
      dataMap[dateKey] = 0;
    }

    // Populate with actual user data
    users.forEach((user) => {
      if (user.created_at) {
        const userDate = new Date(user.created_at);
        if (userDate >= startDate) {
          const dateKey = userDate.toISOString().split("T")[0];
          if (dataMap[dateKey] !== undefined) {
            dataMap[dateKey]++;
          }
        }
      }
    });

    // Convert to array format for recharts
    return Object.entries(dataMap)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [users, timeRange]);

  return (
    <Card className="@container/card bg-transparent border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <div className="space-y-1">
          <CardTitle className="text-xl font-black italic uppercase tracking-tighter">
            Node Synthesis Velocity
          </CardTitle>
          <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-60">
            {timeRange === "90d"
              ? "Quarterly throughput"
              : timeRange === "30d"
                ? "Monthly throughput"
                : "Weekly throughput"}
          </CardDescription>
        </div>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(val) => val && setTimeRange(val)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex border-primary/10 bg-primary/5 rounded-2xl"
          >
            <ToggleGroupItem
              value="90d"
              className="rounded-xl data-[state=on]:bg-primary data-[state=on]:text-white text-[9px] font-black uppercase tracking-widest"
            >
              90D
            </ToggleGroupItem>
            <ToggleGroupItem
              value="30d"
              className="rounded-xl data-[state=on]:bg-primary data-[state=on]:text-white text-[9px] font-black uppercase tracking-widest"
            >
              30D
            </ToggleGroupItem>
            <ToggleGroupItem
              value="7d"
              className="rounded-xl data-[state=on]:bg-primary data-[state=on]:text-white text-[9px] font-black uppercase tracking-widest"
            >
              7D
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-32 rounded-xl border-primary/10 bg-primary/5 @[767px]/card:hidden h-9 text-[10px] font-black uppercase tracking-widest"
              size="sm"
            >
              <SelectValue placeholder="Range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-primary/10">
              <SelectItem
                value="90d"
                className="rounded-lg text-[10px] font-black"
              >
                90 DAYS
              </SelectItem>
              <SelectItem
                value="30d"
                className="rounded-lg text-[10px] font-black"
              >
                30 DAYS
              </SelectItem>
              <SelectItem
                value="7d"
                className="rounded-lg text-[10px] font-black"
              >
                7 DAYS
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-0 pt-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <AreaChart data={processedData}>
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-count)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.1}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              className="text-[10px] font-black uppercase italic tracking-tighter opacity-40"
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="count"
              type="monotone"
              fill="url(#fillCount)"
              stroke="var(--color-count)"
              strokeWidth={3}
              animationDuration={1500}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
