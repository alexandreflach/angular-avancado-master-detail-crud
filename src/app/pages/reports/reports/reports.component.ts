import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../../categories/shared/category.service';
import currencyFormatter from 'currency-formatter'
import { Category } from '../../categories/shared/category.model';
import { EntryService } from '../../entries/shared/entry.service';
import { Entry } from '../../entries/shared/entry.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0
  revenueTotal: any = 0
  balanceTotal: any = 0

  expenseChartData: any;
  revenueChartData: any;

  chartOptions = {
    scales: {
      yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  categories: Category[] = []
  entries: Entry[] = []

  @ViewChild('month') month: ElementRef = null
  @ViewChild('year') year: ElementRef = null

  constructor(private categoryService: CategoryService,
    private entryService: EntryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    )
  }

  generateReports() {
    const month = this.month.nativeElement.value
    const year = this.year.nativeElement.value
    if(!month || !year)
      alert('Você precisa selecionar o Mês e o Ano para gerar os relatórios')
    else
      this.entryService.getByMonthAndYear(month, year)
        .subscribe(this.setValues.bind(this))
  }

  private setValues(entries: Entry[]){
    this.entries = entries;
    this.calculateBalance()
    this.setChartData()
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if(entry.type == 'revenue')
        revenueTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL'})
      else
        expenseTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL'})
    })

    this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL'})
    this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL'})
    this.balanceTotal = currencyFormatter.format(revenueTotal - expenseTotal, { code: 'BRL'})
  }

  private setChartData(){
    this.revenueChartData = this.getChartData('revenue', 'Receitas', '#9CCC65')
    this.expenseChartData = this.getChartData('expense', 'Despesas', '#e03131')
  }

  private getChartData(entryType: string, title: string, backgroundColor: string): any{
    let charData= []
    this.categories.forEach(category => {
      let filteredEntries = this.entries.filter(entry =>
        entry.categoryId == category.id && (entry.type == entryType)
      )

      if(filteredEntries.length > 0){
        const totalAmount = filteredEntries.reduce(
          (total, entry) => total + currencyFormatter.unformat(entry.amount, { code: 'BRL'}), 0
        )
        charData.push({
          categoryName: category.name,
          totalAmount: totalAmount
        })
      }
    })

    return {
      labels: charData.map(item => item.categoryName),
      datasets: [{
        label: title,
        backgroundColor: backgroundColor,
        data: charData.map(item => item.totalAmount)
      }]
    }
  }
}
