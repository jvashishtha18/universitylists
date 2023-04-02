import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown/multiselect.model';
import { SubscriberService } from 'src/app/services/subscriber.service';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
// required variables
  university_response: any;
  page = 1;
  pageSize: any = 8;
  totlaPages = 0
  query = '';
  country: any;
  university_data: any;
  showNoMatch = false;
  searched: any;
  dropdownSettings: IDropdownSettings = {};
  countryData: any

  constructor(
    //injecting apiservice ,subscriber service
    private apiService: ApiService,
    private subscriber: SubscriberService
  ) { }

  ngOnInit(): void {
    this.getUniversities();

    //setting dropdown properties
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'country',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  // function to get the university data from api
  getUniversities() {
    this.subscriber.set_loader(true);
    this.apiService.getUniversities().subscribe(
      (res: any) => {
        this.subscriber.set_loader(false);
        this.subscriber.set_toaster('success', 'Data loaded successfully')
        this.university_response = res;
        this.university_data = res;
        this.countryData = []
        this.university_data?.filter((item: any, i: any) => {
          this.countryData.push({
            id: i,
            country: `${item.country}`
          });
        })
        this.countryData = this.removeDuplicate(this.countryData);
        this.totlaPages = this.university_response.length / this.pageSize + (this.university_response.length % this.pageSize > 0 ? 1 : 0)
      }),
      (err: any) => {
        this.subscriber.set_loader(false);
        this.subscriber.set_toaster('error', 'Failed to load the data,please try the support Team')
      }
  }

  // functions for pagination
  goToPrev() {
    if (this.page > 1) {
      this.page--;
    }
  }
  goToNext() {
    if (this.page < this.totlaPages) {
      this.page++;
    }
  }

  //refresh the university datatable based on page and pagesize property
  refreshUniversity() {
    this.totlaPages = this.university_response.length / this.pageSize + (this.university_response.length % this.pageSize > 0 ? 1 : 0)
  }

  //filtering the data based on charcter entered in search box
  handleSearchInput(event: string): void {
    this.showNoMatch = true;
    event = event.toLowerCase();
    const results = this.university_data.filter((item: any) => {
      return (
        (item?.country && item?.country?.toLowerCase().startsWith(event)) ||
        (item?.name && item?.name?.toLowerCase().startsWith(event))
        || (item?.alpha_two_code && item?.alpha_two_code?.toLowerCase().startsWith(event))
      );
    });

    if (results) {
      this.university_response = results;
      this.refreshUniversity()
    }
  }

  // clearing the search input data
  clearSearchBar(): void {
    this.query = '';
  }

  onItemDeSelect(event: any): void {
  }

  //filtering the tables based on selected country from the dropdown
  selectCountry(event: any): void {
    this.university_response = this.university_data.filter((item: any) => {
      return item.country == event.country
    })
    this.refreshUniversity()
  }

  //remove duplicate from the country array for dropdown
  removeDuplicate(arr: any): any {
    let _thing: any;
    return arr.filter((thing: any, index: number) => {
      if (thing.country) {
        _thing = JSON.stringify(thing.country);
      }
      return (
        index ===
        arr.findIndex((obj: any) => {
          return JSON.stringify(obj.country) === _thing;
        })
      );
    });
  }

}
