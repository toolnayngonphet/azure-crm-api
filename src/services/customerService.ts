import { Customer, CreateCustomerDto, UpdateCustomerDto } from '../models/customer';

// Initial sample CRM customer data
let customers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Nguyễn Văn An',
    email: 'an.nguyen@example.com',
    phone: '0901234567',
    company: 'VinTech Solutions',
    status: 'Customer',
    notes: 'Khách hàng VIP, mua gói Enterprise',
    createdAt: new Date('2024-01-15T08:30:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T08:30:00Z').toISOString(),
  },
  {
    id: 'CUST-002',
    name: 'Trần Thị Bích',
    email: 'bich.tran@example.com',
    phone: '0912345678',
    company: 'FPT Telecom',
    status: 'Lead',
    notes: 'Đang tư vấn giải pháp Cloud',
    createdAt: new Date('2024-02-10T10:15:00Z').toISOString(),
    updatedAt: new Date('2024-02-10T10:15:00Z').toISOString(),
  },
  {
    id: 'CUST-003',
    name: 'Lê Hoàng Cường',
    email: 'cuong.le@example.com',
    phone: '0987654321',
    company: 'Viettel Software',
    status: 'Contacted',
    notes: 'Đã gửi báo giá Azure App Service',
    createdAt: new Date('2024-03-01T14:00:00Z').toISOString(),
    updatedAt: new Date('2024-03-01T14:00:00Z').toISOString(),
  }
];

export class CustomerService {
  public static getAll(search?: string, status?: string): Customer[] {
    let result = [...customers];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        c => c.name.toLowerCase().includes(q) ||
             c.email.toLowerCase().includes(q) ||
             c.company.toLowerCase().includes(q) ||
             c.phone.includes(q)
      );
    }
    if (status) {
      result = result.filter(c => c.status.toLowerCase() === status.toLowerCase());
    }
    return result;
  }

  public static getById(id: string): Customer | undefined {
    return customers.find(c => c.id === id);
  }

  public static create(dto: CreateCustomerDto): Customer {
    const id = `CUST-${String(customers.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();
    const newCustomer: Customer = {
      id,
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      company: dto.company,
      status: dto.status || 'Lead',
      notes: dto.notes || '',
      createdAt: now,
      updatedAt: now,
    };
    customers.push(newCustomer);
    return newCustomer;
  }

  public static update(id: string, dto: UpdateCustomerDto): Customer | null {
    const index = customers.findIndex(c => c.id === id);
    if (index === -1) return null;

    const existing = customers[index];
    const updated: Customer = {
      ...existing,
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    customers[index] = updated;
    return updated;
  }

  public static delete(id: string): boolean {
    const initialLen = customers.length;
    customers = customers.filter(c => c.id !== id);
    return customers.length < initialLen;
  }
}
