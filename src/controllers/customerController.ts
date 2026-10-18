import { Request, Response } from 'express';
import { CustomerService } from '../services/customerService';
import { CreateCustomerDto, UpdateCustomerDto } from '../models/customer';

export class CustomerController {
  public static getAll(req: Request, res: Response): void {
    try {
      const search = req.query.search as string | undefined;
      const status = req.query.status as string | undefined;
      const customers = CustomerService.getAll(search, status);
      res.json({
        success: true,
        count: customers.length,
        data: customers,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public static getById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const customer = CustomerService.getById(id);
      if (!customer) {
        res.status(404).json({ success: false, message: `Customer with ID ${id} not found` });
        return;
      }
      res.json({ success: true, data: customer });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public static create(req: Request, res: Response): void {
    try {
      const { name, email, phone, company, status, notes } = req.body;
      if (!name || !email || !phone) {
        res.status(400).json({
          success: false,
          message: 'Fields name, email, and phone are required',
        });
        return;
      }
      const dto: CreateCustomerDto = { name, email, phone, company: company || '', status, notes };
      const customer = CustomerService.create(dto);
      res.status(201).json({
        success: true,
        message: 'Customer created successfully',
        data: customer,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public static update(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const dto: UpdateCustomerDto = req.body;
      const updated = CustomerService.update(id, dto);
      if (!updated) {
        res.status(404).json({ success: false, message: `Customer with ID ${id} not found` });
        return;
      }
      res.json({
        success: true,
        message: 'Customer updated successfully',
        data: updated,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  public static delete(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const deleted = CustomerService.delete(id);
      if (!deleted) {
        res.status(404).json({ success: false, message: `Customer with ID ${id} not found` });
        return;
      }
      res.json({
        success: true,
        message: `Customer ${id} deleted successfully`,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
