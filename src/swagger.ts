export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Azure CRM Customer Management API',
    version: '1.0.0',
    description: 'REST API quản lý khách hàng (CRM) triển khai trên Azure App Service với Application Insights và GitHub Actions CI/CD.',
  },
  servers: [
    {
      url: '/',
      description: 'Current Environment (Local or Azure App Service)',
    },
  ],
  tags: [
    {
      name: 'Customers',
      description: 'Thao tác CRUD khách hàng trong hệ thống CRM',
    },
    {
      name: 'System',
      description: 'Kiểm tra trạng thái hệ thống',
    },
  ],
  paths: {
    '/api/health': {
      get: {
        tags: ['System'],
        summary: 'Kiểm tra trạng thái sức khỏe hệ thống (Health Check)',
        responses: {
          200: {
            description: 'Hệ thống hoạt động bình thường',
          },
        },
      },
    },
    '/api/customers': {
      get: {
        tags: ['Customers'],
        summary: 'Lấy danh sách tất cả khách hàng (Hỗ trợ lọc & tìm kiếm)',
        parameters: [
          {
            name: 'search',
            in: 'query',
            description: 'Từ khóa tìm kiếm theo tên, email, công ty, sđt',
            schema: { type: 'string' },
          },
          {
            name: 'status',
            in: 'query',
            description: 'Lọc theo trạng thái (Lead, Contacted, Customer, Inactive)',
            schema: { type: 'string', enum: ['Lead', 'Contacted', 'Customer', 'Inactive'] },
          },
        ],
        responses: {
          200: {
            description: 'Danh sách khách hàng',
          },
        },
      },
      post: {
        tags: ['Customers'],
        summary: 'Thêm khách hàng mới',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'phone'],
                properties: {
                  name: { type: 'string', example: 'Đặng Minh Khang' },
                  email: { type: 'string', example: 'khang.dang@gmail.com' },
                  phone: { type: 'string', example: '0933456789' },
                  company: { type: 'string', example: 'Khang Tech JSC' },
                  status: { type: 'string', enum: ['Lead', 'Contacted', 'Customer', 'Inactive'], example: 'Lead' },
                  notes: { type: 'string', example: 'Khách hàng quan tâm gói CRM Basic' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Khách hàng tạo thành công',
          },
          400: {
            description: 'Thiếu thông tin bắt buộc',
          },
        },
      },
    },
    '/api/customers/{id}': {
      get: {
        tags: ['Customers'],
        summary: 'Xem chi tiết khách hàng theo ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID khách hàng (VD: CUST-001)',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Thông tin chi tiết' },
          404: { description: 'Không tìm thấy khách hàng' },
        },
      },
      put: {
        tags: ['Customers'],
        summary: 'Cập nhật thông tin khách hàng',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID khách hàng',
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Nguyễn Văn An (Updated)' },
                  email: { type: 'string', example: 'an.nguyen.vip@example.com' },
                  phone: { type: 'string', example: '0909999999' },
                  company: { type: 'string', example: 'VinTech Corp' },
                  status: { type: 'string', enum: ['Lead', 'Contacted', 'Customer', 'Inactive'], example: 'Customer' },
                  notes: { type: 'string', example: 'Nâng cấp lên gói VIP Premium' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Cập nhật thành công' },
          404: { description: 'Không tìm thấy khách hàng' },
        },
      },
      delete: {
        tags: ['Customers'],
        summary: 'Xóa khách hàng',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'ID khách hàng',
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'Xóa thành công' },
          404: { description: 'Không tìm thấy khách hàng' },
        },
      },
    },
  },
};
