import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ConsentServiceMock } from '../models/consent-service.mock';
import { ConsentService } from '../services/consent-service';
import { ConsentOperationsComponent } from './consent-operations.component';

describe('ConsentOperationsComponent', () => {
  let component: ConsentOperationsComponent;
  let fixture: ComponentFixture<ConsentOperationsComponent>;
  let consentServiceMock;


  beforeEach(() => {
    consentServiceMock = new ConsentServiceMock();

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,],
      declarations: [ConsentOperationsComponent],
      providers: [
        { provide: ConsentService, useValue: consentServiceMock }
      ]
    });

    fixture = TestBed.createComponent(ConsentOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain loaded consent', () => {
    expect(component.consents.length).toEqual(2);
  });

  it('should remove consent after related delete button is clicked', () => {
    const consentId = component.consents[0].id;

    fixture.detectChanges();
    
    let deleteButton = fixture.debugElement.query(By.css(`#delete_${consentId}`));
    deleteButton.nativeNode.click();

    fixture.detectChanges();

    deleteButton = fixture.debugElement.query(By.css(`#delete_${consentId}`));

    expect(component.consents.length).toEqual(1);
    expect(deleteButton).toBeFalsy();
  });

  it('should fill in the form after related edit button is clicked', () => {
    const consentId = component.consents[0].id;
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css(`#edit_${consentId}`));
    editButton.nativeNode.click();

    fixture.detectChanges();

    const formIdInput = fixture.debugElement.query(By.css('#formId'));
    
    expect(formIdInput.nativeElement.value).toEqual(consentId);
    expect(component.consentForm.value.userName).toEqual(component.consents[0].userName);
    expect(component.consentForm.value.responsesBitmask).toEqual(component.consents[0].responsesBitmask);
  });

  it('should create the consent after related submit button is clicked', () => {
    fixture.detectChanges();

    const initialLength = component.consents.length;

    component.consentForm.setValue({
      id: '',
      userName: 'Andy',
      webSite: 'facebook.com',
      responsesBitmask: 7,
      date: new Date()
    });

    const submitButton = fixture.debugElement.query(By.css(`#formSubmit`));
    submitButton.nativeNode.click();

    fixture.detectChanges();
    
    expect(component.consents.length).toEqual(initialLength + 1);
  });

  it('should update the consent with non-empty id after related submit button is clicked', () => {
    fixture.detectChanges();

    const updateName = 'UpdatedMax';
    component.edit({ ...component.consents[0], userName: updateName });

    const submitButton = fixture.debugElement.query(By.css(`#formSubmit`));
    submitButton.nativeNode.click();

    fixture.detectChanges();
    
    expect(component.consents[0].userName).toEqual(updateName);
  });
});
