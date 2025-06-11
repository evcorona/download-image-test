export interface Passenger {
  id?: string;
  name: string;
  last_name: string;
  lastName?: string;
  client_id: string;
  id_company: string;
  is_active: boolean;
  batch?: string;
  phone?: string;
  email?: string;
  encryptedData?: string;
  customFields: Record<string, string | number | boolean | null>;
}
