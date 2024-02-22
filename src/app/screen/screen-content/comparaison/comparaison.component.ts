import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { XmlComparisonService } from './xml-comparison.service';


@Component({
  selector: 'app-screen-content',
  templateUrl: './comparaison.component.html',
  styleUrls: ['./comparaison.component.css'],
})
export class ScreenContentComponent {

  sourceFiles: File[] = [];
  targetFiles: File[] = [];
  sourceFileName: string = '';
  targetFileName: string = '';
  sourceFileContent: string = '';
  targetFileContent: string = '';
  comparisonResult: string | null = null;
  


  constructor(private http: HttpClient, private xmlComparisonService: XmlComparisonService) { }

  onFileSelected(event: any, type: string) {
    const files: FileList | null = event.target.files;
    if (!files || files.length === 0) {
      console.error('Veuillez sélectionner des fichiers.');
      return;
    }

    const validExtensions = ['xml', 'json'];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.split('.').pop()?.toLowerCase();
      if (validExtensions.includes(extension || '')) {
        if (type === 'source') {
          this.sourceFiles.push(file);
        } else {
          this.targetFiles.push(file);
        }
      }
    }
  }

  
  comparerFichiers(file: File, type: string) {
    if (this.sourceFiles.length === 0 || this.targetFiles.length === 0) {
      console.error('Veuillez sélectionner un fichier source et un fichier cible.');
      return;
    }
  let sourceFileIndex = type === 'source'? this.sourceFiles.indexOf(file): this.targetFiles.indexOf(file) ;
    const sourceFile = type === 'source' ? file : this.sourceFiles[sourceFileIndex];
    const targetFile = type === 'target' ? file : this.targetFiles[sourceFileIndex];
  
    const fileReaderSource = new FileReader();
    fileReaderSource.onload = () => {
      const sourceXml = fileReaderSource.result as string;
  
      const fileReaderTarget = new FileReader();
      fileReaderTarget.onload = () => {
        const targetXml = fileReaderTarget.result as string;
  
        this.xmlComparisonService.compareXmlFiles(sourceXml, targetXml)
          .subscribe(result => {
            console.log('Résultat de la comparaison:', result);
            this.comparisonResult = result;
          });
  
      };
      fileReaderTarget.readAsText(targetFile);
    };
    fileReaderSource.readAsText(sourceFile);
  }
  


  

  readFileContent(file: File, type: string) {
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      if (type === 'source') {
        this.sourceFileName = file.name;
        this.sourceFileContent = content;
      } else {
        this.targetFileName = file.name;
        this.targetFileContent = content;
      }
    };
    reader.readAsText(file);
  }

  selectFile(file: File, type: string) {
    this.readFileContent(file, type);
  }

  selectTargetFile(sourceFileName: string) {
    const targetFile = this.targetFiles.find(file => file.name === sourceFileName);
    if (targetFile) {
      this.readFileContent(targetFile, 'target');
    } else {
      this.targetFileName = '';
      this.targetFileContent = 'Ce fichier est ajouté';
    }
  }

  selectSourceFile(targetFileName: string) {
    const sourceFile = this.sourceFiles.find(file => file.name === targetFileName);
    if (sourceFile) {
      this.readFileContent(sourceFile, 'source');
    } else {
      this.sourceFileName = '';
      this.sourceFileContent = 'Ce fichier est supprimé';
    }
  }

  onFileNameClick(file: File, type: string) {
    if (type === 'source') {
      this.comparerFichiers(file, 'source');
      this.selectTargetFile(file.name);
    }
    if (type === 'target') {
      this.comparerFichiers(file, 'target');
      this.selectSourceFile(file.name);
    }
  }

  isFileInTarget(fileName: string): boolean {
    return this.targetFiles.some(file => file.name === fileName);
  }

  compareFileNames(sourceFileName: string, targetFiles: File[]): File[] {
    return targetFiles.filter(file => file.name === sourceFileName);
  }

  isFileInSource(fileName: string): boolean {
    return this.sourceFiles.some(file => file.name === fileName);
  }

  filterTargetFiles() {
    return this.targetFiles.filter(
      targetFile => !this.sourceFiles.some(sourceFile => sourceFile.name === targetFile.name)
    );
  }
}
