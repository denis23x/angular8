import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api.service';
import { UserInner } from '@models/user';
import { AuthService } from '@services/auth.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NotificationService } from '@services/notification.service';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  private userDetail: UserInner;
  private modalConfig = {
    title: 'Modal title',
    content: null,
    isActive: false
  };

  private croppedUrl: string;
  private croppedFile: File = null;
  private croppedAvatar: string;

  private croppingForm: FormGroup = this.formBuilder.group({
    url: [ '' ],
    file: [ null ],
  });

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    if (this.isProfileView) {
      this.authService.currentUser.subscribe(({ user }) => {
        this.userDetail = new UserInner(user);
      });
    } else {
      this.apiService.getUserById(this.route.snapshot.params.id).subscribe(user => {
        this.userDetail = new UserInner(user);
      });
    }
  }

  onChangeAvatar(): void {
    this.modalConfig.title = 'Select image';
    this.modalConfig.content = 'cropper';
    this.modalConfig.isActive = true;
  }

  onCloseModal(): void {
    switch (this.modalConfig.content) {
      case 'cropper':
        this.onCropperReset();
        break;
      default:
        break;
    }

    this.modalConfig.title = 'Modal title';
    this.modalConfig.content = null;
    this.modalConfig.isActive = false;
  }

  onCropperSetUrl(e: Event): void {
    const el = e.currentTarget as HTMLInputElement;
    this.croppedUrl = `https://cors-anywhere.herokuapp.com/${el.value}`;
  }

  onCropperSetFile(files: FileList): void {
    this.croppedFile = files.item(0);
  }

  onCropperReset(): void {
    this.croppedUrl = '';
    this.croppedFile = null;
    this.croppedAvatar = '';

    this.cropperUrlControl.setValue('');
    this.cropperFileControl.setValue(null);
    this.cropperUrlControl.enable();
    this.cropperFileControl.enable();
  }

  onCropperResolved(e: ImageCroppedEvent): void {
    this.croppedAvatar = e.base64;
    this.croppedUrl ? this.cropperUrlControl.disable() : this.cropperFileControl.disable();
  }

  onCropperRejected(): void {
    this.notificationService.addNotify({
      className: 'is-danger',
      message: 'Load image failed',
      delay: 5000
    });

    this.onCropperReset();
  }

  onCropperSubmit(): void {
    this.apiService.putUserById(this.userDetail.id, {
      avatar: this.croppedAvatar
    }).subscribe(user => {
      this.authService.updateUserInner(user);

      this.notificationService.addNotify({
        className: 'is-success',
        message: 'Success',
        delay: 5000
      });
    });
  }

  get cropperUrlControl(): AbstractControl { return this.croppingForm.get('url'); }
  get cropperFileControl(): AbstractControl { return this.croppingForm.get('file'); }

  get isProfileView(): boolean {
    return this.route.snapshot.routeConfig.path === 'profile';
  }
}
