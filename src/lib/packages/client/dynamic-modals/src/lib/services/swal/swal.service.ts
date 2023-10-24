import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

  fireSuccess(options: SweetAlertOptions) {
    Swal.fire({
      title: options.title,
      text: options.text,
      icon: 'success',
    });
  }

  fireValidation() {
    return Swal.fire({
      title: 'Möchtest du deine Änderungen speichern?',
      icon: 'question',
      showDenyButton: true,
      showCancelButton: true,
      cancelButtonText: 'Abbrechen',
      confirmButtonText: 'Speichern',
      denyButtonText: `Nicht speichern`,
    });
  }
}
