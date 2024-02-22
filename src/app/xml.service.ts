import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class XmlService {
  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:5069/api/Screens/upload', formData, { responseType: 'text' }).pipe(
      map(response => {
        return { fileName: file.name, content: response };
      })
    );
  }
  


}
