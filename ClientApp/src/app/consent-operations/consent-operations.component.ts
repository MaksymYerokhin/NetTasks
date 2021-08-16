import { Component, OnInit } from '@angular/core';
import { ConsentService } from '../services/consent-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Consent } from '../models/consent';

@Component({
  selector: 'app-consent-operations',
  templateUrl: './consent-operations.component.html'
})
export class ConsentOperationsComponent implements OnInit {
  public consents: Consent[];

  public consentForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    userName: new FormControl('', Validators.required),
    responsesBitmask: new FormControl('', Validators.required),
    date: new FormControl(''),
    webSite: new FormControl('', [
      Validators.required,
      Validators.maxLength(32)
    ])
  });

  constructor(private _consentService: ConsentService) {
  }

  async ngOnInit() {
    this.consents = await this._consentService.get();
  }

  async submit(consent: Consent) {
    if (this.consentForm.invalid) {
      this.consentForm.markAllAsTouched();
      return;
    }

    let dbConsent: Consent;
    if (consent.id) {
      dbConsent = await this._consentService.update(consent);
      const index = this.consents.findIndex(con => con.id === dbConsent.id);
      if (index > -1) {
        this.consents[index] = dbConsent;
      }
    }
    else {
      dbConsent = await this._consentService.create(consent);
      this.consents.push(dbConsent);
    }

    this.consentForm.reset();
  }

  edit(consent: Consent) {
    this.consentForm.setValue(consent);
  }

  async delete(id: string) {
    await this._consentService.delete(id);
    this.consents.splice(this.consents.findIndex(consent => consent.id === id), 1);
  }
}
