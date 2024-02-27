import { HttpClient } from '@angular/common/http';
import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  OnInit
 } from '@angular/core';
import { XmlComparisonService } from './xml-comparison.service';
import { DiffEditorModel } from 'ngx-monaco-editor-v2';


@Component({
  selector: 'app-screen-content',
  templateUrl: './comparaison.component.html',
  styleUrls: ['./comparaison.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ScreenContentComponent implements OnInit {

  sourceFiles: File[] = [];
  targetFiles: File[] = [];
  sourceFileName: string = '';
  targetFileName: string = '';
  sourceFileContent: string = '';
  targetFileContent: string = '';
  comparisonResult: string | null = null;
  text1 = '';
  text2 = '';
  isCompared = false;
  @Output()
  selectedLang = 'plaintext';
  @Output()
  selectedTheme = 'vs';

  @Input()
  languages = [
    'bat',
    'c',
    'coffeescript',
    'cpp',
    'csharp',
    'csp',
    'css',
    'dockerfile',
    'fsharp',
    'go',
    'handlebars',
    'html',
    'ini',
    'java',
    'javascript',
    'json',
    'less',
    'lua',
    'markdown',
    'msdax',
    'mysql',
    'objective-c',
    'pgsql',
    'php',
    'plaintext',
    'postiats',
    'powershell',
    'pug',
    'python',
    'r',
    'razor',
    'redis',
    'redshift',
    'ruby',
    'rust',
    'sb',
    'scss',
    'sol',
    'sql',
    'st',
    'swift',
    'typescript',
    'vb',
    'xml',
    'yaml'
  ];

  @Input()
  themes = [
    {
      value: 'vs',
      name: 'Visual Studio'
    },
    {
      value: 'vs-dark',
      name: 'Visual Studio Dark'
    },
    {
      value: 'hc-black',
      name: 'High Contrast Dark'
    }
  ];

  // input
  inputOptions = {
    theme: 'vs',
    language: 'plaintext',
    minimap: {
      enabled: false
    },
    scrollbar: {
      // Subtle shadows to the left & top. Defaults to true.
      useShadows: false,
      // Render vertical arrows. Defaults to false.
      verticalHasArrows: false,
      // Render horizontal arrows. Defaults to false.
      horizontalHasArrows: false,
      // Render vertical scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      vertical: 'hidden',
      // Render horizontal scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      horizontal: 'hidden'
    }
  };
  // compare, output
  diffOptions = {
    theme: 'vs',
    language: 'plaintext',
    readOnly: true,
    renderSideBySide: true
  };
  originalModel: DiffEditorModel = {
    code: '',
    language: 'plaintext'
  };

  modifiedModel: DiffEditorModel = {
    code: '',
    language: 'plaintext'
  };

  public ngOnInit() {}

  onChangeLanguage(language: any) {
    this.inputOptions = Object.assign({}, this.inputOptions, {
      language: language
    });
    this.originalModel = Object.assign({}, this.originalModel, {
      language: language
    });
    this.modifiedModel = Object.assign({}, this.modifiedModel, {
      language: language
    });
  }
  onChangeTheme(theme: any) {
    this.inputOptions = Object.assign({}, this.inputOptions, { theme: theme });
    this.diffOptions = Object.assign({}, this.diffOptions, { theme: theme });
  }

  onChangeInline(checked:any) {
    this.diffOptions = Object.assign({}, this.diffOptions, {
      renderSideBySide: !checked
    });
  }

  onCompare(file: File, type: string) {
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
            this.originalModel = { code: sourceXml, language: 'xml' };
            this.modifiedModel = { code: targetXml, language: 'xml' };
            this.isCompared = true;
            window.scrollTo(0, 0); // scroll the window to top
          });
  
      };
      fileReaderTarget.readAsText(targetFile);
    };
    fileReaderSource.readAsText(sourceFile);
  }

  
  onClear() {
    this.text1 = '';
    this.text2 = '';
    this.isCompared = false;
    window.scrollTo(0, 0); // scroll the window to top
  }



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

  
  // comparerFichiers(file: File, type: string) {
  //   if (this.sourceFiles.length === 0 || this.targetFiles.length === 0) {
  //     console.error('Veuillez sélectionner un fichier source et un fichier cible.');
  //     return;
  //   }
  // let sourceFileIndex = type === 'source'? this.sourceFiles.indexOf(file): this.targetFiles.indexOf(file) ;
  //   const sourceFile = type === 'source' ? file : this.sourceFiles[sourceFileIndex];
  //   const targetFile = type === 'target' ? file : this.targetFiles[sourceFileIndex];
  
  //   const fileReaderSource = new FileReader();
  //   fileReaderSource.onload = () => {
  //     const sourceXml = fileReaderSource.result as string;
  
  //     const fileReaderTarget = new FileReader();
  //     fileReaderTarget.onload = () => {
  //       const targetXml = fileReaderTarget.result as string;
  
  //       this.xmlComparisonService.compareXmlFiles(sourceXml, targetXml)
  //         .subscribe(result => {
  //           console.log('Résultat de la comparaison:', result);
  //           this.comparisonResult = result;
  //         });
  
  //     };
  //     fileReaderTarget.readAsText(targetFile);
  //   };
  //   fileReaderSource.readAsText(sourceFile);
  // }
  


  

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
      this.onCompare(file, 'source');
      this.selectTargetFile(file.name);
    }
    if (type === 'target') {
      this.onCompare(file, 'target');
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


  selectedLineChange(event: any) {
    // Logique à exécuter lorsque la ligne sélectionnée change
    console.log('Ligne sélectionnée changée:', event);
  }
  

  filterTargetFiles() {
    return this.targetFiles.filter(
      targetFile => !this.sourceFiles.some(sourceFile => sourceFile.name === targetFile.name)
    );
  }
}
