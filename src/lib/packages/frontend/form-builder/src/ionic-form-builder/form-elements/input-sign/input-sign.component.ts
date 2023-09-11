import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseInputTextComponent } from '@nxtlvls/form-builder';
import { TranslateService } from '@ngx-translate/core';
import SignaturePad from 'signature_pad';
import { UntypedFormGroup } from '@angular/forms';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'nxt-input-sign',
  templateUrl: './input-sign.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSignComponent
  extends BaseInputTextComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('canvas', { static: true }) signaturePadElement;
  signaturePad: any;
  canvasWidth: number;
  canvasHeight: number;
  constructor(
    public override cdRef: ChangeDetectorRef,
    public override translateService: TranslateService,
    private elementRef: ElementRef,
    @Inject('baseUrl') public baseUrl: string,
    public platform: Platform,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private http: HttpClient
  ) {
    super(cdRef, translateService);
  }

  init() {
    this.formController.registerBeforeSaveFunction(this.beforeSave.bind(this));
  }

  public ngAfterViewInit(): void {
    let canvas = document.getElementById('canvas');

    window.onresize = this.resizeCanvas.bind(
      this.signaturePadElement.nativeElement
    );

    this.resizeCanvas(canvas);
    this.signaturePad = new SignaturePad(
      this.signaturePadElement.nativeElement
    );
    this.signaturePad.clear();
    this.signaturePad.penColor = 'rgb(255,255,255)';

    this.cdRef.detectChanges();
  }

  public beforeSave(form: UntypedFormGroup): Promise<UntypedFormGroup> {
    return firstValueFrom(
      this.http.post(this.baseUrl + '/files/upload/public/base64', {
        base64: this.signaturePad
          .toDataURL()
          .replace('data:image/png;base64,', ''),
      })
    ).then(
      (file: any) => {
        form.patchValue({ [this.formField.name]: file.id });

        this.cdRef.detectChanges();
        return form;
      },
      (err) => {
        throw err; // This error will be caught by your `async`/`await` code in `create()`.
      }
    );
  }

  resizeCanvas(canvas) {
    // When zoomed out to less than 100%, for some very strange reason,
    // some browsers report devicePixelRatio as less than 1
    // and only part of the canvas is cleared then.

    if (!canvas) {
      return;
    }
    let ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d').scale(ratio, ratio);
  }

  public saveSignature() {
    return this.signaturePad.toDataURL();
  }

  save(): void {
    const img = this.signaturePad.toDataURL();
  }

  isCanvasBlank(): boolean {
    if (this.signaturePad) {
      return this.signaturePad.isEmpty() ? true : false;
    }
  }

  clear() {
    this.signaturePad.clear();
  }

  undo() {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop(); // remove the last dot or line
      this.signaturePad.fromData(data);
    }
  }
}
