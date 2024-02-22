import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fusion',
  templateUrl: './fusion.component.html',
  styleUrl: './fusion.component.css'
})
export class FusionComponent {
  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  fileName = '';


  constructor(private http: HttpClient) {}

  onFileSelected(event:any) {

      const file:File = event.target.files[0];

      if (file) {

          this.fileName = file.name;

          const formData = new FormData();

          formData.append("thumbnail", file);

          const upload$ = this.http.post("/api/thumbnail-upload", formData);

          upload$.subscribe();
      }
  }

}
