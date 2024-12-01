export interface InventoryItem {
  _id: string;
  categoryId: number;
  supplierId: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  dateCreated: string;
  dateModified: string;
}

export type AddInventoryItemDTO = Omit<InventoryItem, '_id' | 'dateModified'>;
