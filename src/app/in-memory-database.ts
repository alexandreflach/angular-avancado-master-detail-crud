import { InMemoryDbService} from 'angular-in-memory-web-api'
import { Category } from './pages/categories/shared/category.model';

export class InMemoryDatabase implements InMemoryDbService {

  createDb() {
    const categories: Category[] = [
      {id: 1, name: "Moradia", description: "Pagamento de Contas da Casa"},
      {id: 2, name: "Saúda", description: "Plano de Saúde e Remédios"},
      {id: 3, name: "Lazer", description: "Cinema, parques, prais, etc"},
      {id: 4, name: "Salário", description: "Recebimento de Salário"},
      {id: 5, name: "Freelas", description: "Trabalhos com freelancer"}
    ]

    return { categories}
  }

}