import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { diffLines } from 'diff';

@Injectable({
  providedIn: 'root'
})
export class XmlComparisonService {

  constructor() { }

  compareXmlFiles(sourceXml: string, targetXml: string): Observable<string> {
    const result = this.compareXmlLocally(sourceXml, targetXml);
    return of(result);
  }

  private compareXmlLocally(sourceXml: string, targetXml: string): string {
    const changes = diffLines(sourceXml, targetXml); // Utilisation correcte de diffLines

    let diffResult = '';
    changes.forEach(change => {
      if (change.added) {
        diffResult += `+ ${change.value}\n`;
      } else if (change.removed) {
        diffResult += `- ${change.value}\n`;
      }
    });

    return diffResult.trim();
  }
}
