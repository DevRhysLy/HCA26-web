import type * as React from "react";

export type TimetableDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export const DEFAULT_DAYS: TimetableDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export interface TimetableLocation {
  id: string;
  badge: string;
  name: string;
  icon?: React.ReactNode;
}

export type TimetableCardVariant =
  | "kids"
  | "youth"
  | "adults"
  | "advanced"
  | "generic";

export interface TimetableClassCard {
  id: string;
  locationId: string;
  day: TimetableDay;
  timeSlot: string;
  tag: string;
  title: string;
  variant?: TimetableCardVariant;
  showTimeInsideCard?: boolean;
  timeLabelOverride?: string;
}

export interface TimetableProps {
  title: string;
  subtitle?: string;
  locations: TimetableLocation[];
  selectedLocationId?: string;
  defaultSelectedLocationId?: string;
  onLocationChange?: (locationId: string) => void;
  days?: TimetableDay[];
  timeSlots: string[];
  timeSlotsByLocation?: Record<string, string[]>;
  entries: TimetableClassCard[];
  containerClassName?: string;
}
