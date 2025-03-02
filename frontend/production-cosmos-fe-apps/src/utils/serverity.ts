 // Status options 
 export enum status {
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    CANCELLED = 'CANCELLED',
    DELIVERED = 'DELIVERED',
 }
 export const statusOptions = [
    { 
      label: 'Pending', 
      value: 'PENDING',
      severity: 'warning'
    },
    { 
      label: 'Shipped', 
      value: 'SHIPPED',
      severity: 'info'
    },
    { 
      label: 'Delivered', 
      value: 'DELIVERED',
      severity: 'success'
    },
    { 
      label: 'Cancelled', 
      value: 'CANCELLED',
      severity: 'danger'
    }
  ];