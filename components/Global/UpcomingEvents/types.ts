export type Event = {
  title: string;
  scheduled_at: string;
  time_zone: string;
  virtual_event: number | boolean;
  venue: string;
  host: string;
  host_initials: string;
  cover_image: string;
  event_source: string;
  duration: string;
  category: string | string[];
  total_spots: string;
  filled_spots: string;
  timezone: string;
}

export type EventCategory = {
  area: string;
  handle: string;
}
