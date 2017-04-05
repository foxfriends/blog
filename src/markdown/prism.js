'use strict';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-jsx.min.js';
import 'prismjs/components/prism-scss.min.js';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords.min.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.min.js';
import './code.scss';

// JavaScript extension
Prism.languages.javascript['class-name'] = [{
  pattern: /(\b(class|extends|instanceof|interface|implements|new)\s+)[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]+(\.[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]+)*/,
  lookbehind: true
}, {
  pattern: /\bObject|Array|String|Boolean|Number|Function|Symbol\b/
}];
Prism.languages.insertBefore('javascript', 'function', {
  // identify decorators
  'decorator': /@[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]+/
});
Prism.languages.insertBefore('javascript', 'operator', {
  // identify typescript style type annotations as class names
  'type-annotation': {
    pattern: /(:\s*)(\.\.\.\s*)?([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(\s*[|&]\s*)?)*/,
    lookbehind: true,
    alias: 'class-name',
    inside: {
      'builtin': /bool|number|string|object|function|undefined|null|symbol|class/
    }
  }
});
Prism.languages.insertBefore('javascript', 'string', {
  // identify module imports/exports. NOTE: requires the semicolon or all will break
  'module': {
    pattern: /(import|export)[^;]*(?=;)/,
    inside: {
      'keyword': /import|export|as|from|default|\*/,
      'punctuation': /[\{\},]/,
      'string': Prism.languages.javascript.string,
    }
  }
});
