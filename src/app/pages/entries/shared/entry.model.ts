import { Category } from "../../categories/shared/category.model";

export class Entry {
  constructor(
    public id?: number,
    public name?: string,
    public descriptions?: string,
    public type?: string,
    public amount?: string,
    public date?: boolean,
    public paid?: boolean,
    public categoryId?: number,
    public category?: Category,
  ){  }

  static types = {
    expense: 'Despesa',
    renevue: 'Receita'
  }

  get paidText(): string {
    return this.paid ? 'Pago' : 'Pendente'
  }
}
