export interface Talk {
  title: string;
  speaker: string;
  duration: number;
}

export interface Location {
  name: string;
  address: string;
  city: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate: string;
  location: Location;
  talks: Talk[];
  tags: string[];
  meetupUrl: string;
  status: 'upcoming' | 'past';
}

export interface EventsData {
  events: Event[];
}
