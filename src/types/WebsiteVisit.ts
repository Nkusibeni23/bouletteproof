export interface VisitData {
  visit_id: number;
  unique_visitors: number;
  user_id: number;
  Date: string;
  page_visited: string;
  avg_session_duration: number;
  referrer: string;
  device_type: string;
  bounce_rate: number;
  browser: string;
  location: string;
  conversion: boolean;
}
