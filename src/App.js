import React from "react";
import { setOptions, Renderer, parse } from 'marked';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; // Include the Prism CSS

setOptions({
  breaks: true,
  highlight: function(code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const renderer = new Renderer();
renderer.link = function (href, title, text){
  return `<a target="_blank" href="${href}">${text}</a>`; // Fix the interpolation of href
};

const defaultContent = `
![Sword Logo](https://images.pexels.com/photos/3227984/pexels-photo-3227984.jpeg?auto=compress&cs=tinysrgb&w=300)

# hello
## this is a
### Markdown Previewer

\`<div>Inline Code</div>\`

\`\`\`
const multipleLineCode = (param) => {
  if(param) {
    return param
  }
}
\`\`\`

**Some bold text**

[Visit my Github](https://github.com/sohumcs)

>Block Quote

1. First List Item
2. Second List Item
`;

const Editor = ({ content, handleTextareaChange }) => (
  <textarea id="editor" value={content} onChange={handleTextareaChange} />
);

const Previewer = ({ content }) => (
  <div
    id="preview"
    dangerouslySetInnerHTML={{
      __html: parse(content, { renderer: renderer }),
    }}
  />
);

const App = () => {
  const [content, setContent] = React.useState(defaultContent);
  
  const handleTextareaChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className="main">
      <Editor content={content} handleTextareaChange={handleTextareaChange} />
      <Previewer content={content} />
    </div>
  );
};

export default App;
