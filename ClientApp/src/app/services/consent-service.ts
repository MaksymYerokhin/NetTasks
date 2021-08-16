import { Injectable } from '@angular/core';
import { Consent } from '../models/consent';
import { ConsentStats } from '../models/consent-stats';
import { ApiService } from './api-service';

@Injectable({
  providedIn: 'root'
})
export class ConsentService { 

  private _apiRoute = 'api/consent';

  constructor(private _apiService: ApiService) {
  }

  async create(consent): Promise<Consent> {
    consent.date = new Date();
    const createdConsent = await this._apiService.POST<Consent>(this._apiRoute, consent);
    return createdConsent;
  }

  async update(consent): Promise<Consent> {
    const updatedConsent = await this._apiService.PUT<Consent>(this._apiRoute, consent);
    return updatedConsent;
  }

  async get(): Promise<Consent[]> {
    const consents = await this._apiService.GET<Consent[]>(this._apiRoute);
    return consents;
  }

  async getStats(): Promise<ConsentStats[]> {
    const consentStats = await this._apiService.GET<ConsentStats[]>(`${this._apiRoute}/stats`);
    return consentStats;
  }

  async delete(id: string): Promise<void> {
    await this._apiService.DELETE<Consent>(`${this._apiRoute}/${id}`);
  }
}
