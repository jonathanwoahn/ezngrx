import { Injectable, Injector, Inject } from '@angular/core';
import { IDynamicDataService, DefaultDataService } from './default-data.service';
import { DYNAMIC_DATA_PROVIDER } from '../ezngrx.service';

@Injectable({
  providedIn: 'root',
})
export class DynamicDataFactoryService {
  constructor(
    private defaultDataService: DefaultDataService<any>,
    @Inject(DYNAMIC_DATA_PROVIDER) private dataServices: IDynamicDataService<any>[],
  ) { }

  getDataService(entity: string): IDynamicDataService<any> {
    const service: IDynamicDataService<any> = this.dataServices.find(dataService => dataService.entity === entity);
    if (!service) {
      return this.defaultDataService;
    }
    return service;
  }
}