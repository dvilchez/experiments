(()=>{"use strict";class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot.innerHTML='\n    <style>\n      :host {\n          margin: 0;\n          padding: 0;\n          font-family: Arial, sans-serif;\n      }\n\n      .container {\n          width: 100%;\n          height: 100vh;\n      }\n\n      .search-area {\n          text-align: center;\n          padding: 20px;\n          background-color: #f8f8f8;\n          border-bottom: 1px solid #ddd;\n      }\n\n      #searchInput {\n          width: 50%;\n          padding: 10px 20px;\n          margin: 0 10px;\n          font-size: 16px;\n          border: 1px solid #ddd;\n          border-radius: 20px;\n          box-shadow: none;\n          outline: none;\n      }\n\n      #searchInput:focus {\n          border-color: #bbb;\n          box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);\n      }\n\n      #searchButton {\n          padding: 10px 20px;\n          font-size: 16px;\n          background-color: #f8f8f8;\n          border: 1px solid #dcdcdc;\n          border-radius: 4px;\n          cursor: pointer;\n          outline: none;\n      }\n\n      #searchButton:hover {\n          border-color: #c6c6c6;\n          background-color: #f0f0f0;\n      }\n\n      .content-area {\n          display: flex;\n          height: calc(100% - 60px);\n      }\n\n      .doc-list {\n          background-color: #fff;\n          overflow-y: auto;\n          height: 100%;\n          flex: 2;\n      }\n\n      .drop-area {\n          background-color: #eee;\n          text-align: center;\n          padding: 20px;\n          border: 2px dashed #ccc;\n          flex: 1;\n      }\n    </style>\n    <div class="container">\n        \x3c!-- Search Component --\x3e\n        <div class="search-area">\n            <input type="text" id="searchInput" placeholder="Search...">\n            <button id="searchButton">Search</button>\n        </div>\n\n        \x3c!-- Document Lists and Drop Area --\x3e\n        <div class="content-area">\n                <div class="doc-list">\n                  Doc list\n                </div>\n\n                <file-drop class="drop-area">\n                    Drag and drop files/folders here\n                </file-drop>\n        </div>\n    </div>',setTimeout((()=>{this.shadowRoot.querySelector("file-drop").onFilesDropped=n=>{console.log("Files dropped:",n)}}),0)}}class e extends HTMLElement{_onFilesDropped;constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){this.shadowRoot.innerHTML='\n            <style>\n                .drop-area {\n                    border: 2px dashed #ccc;\n                    padding: 20px;\n                    text-align: center;\n                    background-color: #eee;\n                }\n            </style>\n            <div class="drop-area">\n                Drag and drop files/folders here\n            </div>\n        ',this.initializeDropArea()}initializeDropArea(){const n=this.shadowRoot.querySelector(".drop-area");n.addEventListener("dragover",(n=>{n.stopPropagation(),n.preventDefault()})),n.addEventListener("drop",(n=>{n.stopPropagation(),n.preventDefault();const e=n.dataTransfer.files;this.handleFiles(e)}))}set onFilesDropped(n){this._onFilesDropped=n}handleFiles(n){this._onFilesDropped?this._onFilesDropped(n):console.log(n)}}window.customElements.define("file-drop",e),window.customElements.define("semantic-search",n);const o=document.createElement("semantic-search"),r=document.getElementById("projects-container");r?.appendChild(o)})();