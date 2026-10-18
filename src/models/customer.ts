export type CustomerStatus = 'Lead' | 'Contacted' | 'Customer' | 'Inactive';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: CustomerStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomerDto {
  name: string;
  email: string;
  phone: string;
  company: string;
  status?: CustomerStatus;
  notes?: string;
}

export interface UpdateCustomerDto {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  status?: CustomerStatus;
  notes?: string;
}
