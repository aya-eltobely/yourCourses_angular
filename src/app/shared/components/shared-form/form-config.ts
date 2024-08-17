import { ValidatorFn } from '@angular/forms';

interface FormControlConfig {
  value: any;
  Validators: ValidatorFn[];
  displayName: string;
}

export interface FormConfig {
  [key: string]: FormControlConfig;
}