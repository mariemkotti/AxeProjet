// import { Component, OnInit } from '@angular/core';
// import { XmlService } from '../../../xml.service';

// @Component({
//   selector: 'app-xml',
//   template: `
//     <div *ngIf="xmlContent">
//       <pre>{{ xmlContent }}</pre>
//     </div>
//   `
// })
// export class XmlComponent implements OnInit {
//   xmlContent?: string;

//   constructor(private xmlService: XmlService) { }

//   ngOnInit(): void {
//     this.xmlService.getDataXml().subscribe(
//       (data) => {
//         this.xmlContent = data;
//       },
//       (error) => {
//         console.error('Error loading XML data:', error);
//       }
//     );
//   }
// }
