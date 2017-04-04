'use strict';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-c.min.js';
import 'prismjs/components/prism-cpp.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-ruby.min.js';
import 'prismjs/plugins/highlight-keywords/prism-highlight-keywords.min.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.min.js';
import './code.scss';

// JavaScript extension
Prism.languages.javascript['class-name'] = [{
  pattern: /(\b(class|extends|instanceof|interface|implements|new)\s+)[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]+/,
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

// JSON extension
Prism.languages.insertBefore('json', 'property', {
  // sure its not actually JSON but I wan't them
  'comment': /\/\/.*|\/\*[\s\S]*\*\//i
});

// C++ Extension
const template = {
  'template': {
    pattern: /<.*>/,
    inside: {
      'keyword': /\b(void|int|bool|double|float)\b/,
      'punctuation': /::|,|\.\.\./,
      'class-name': {
        pattern: /(\s+([a-z0-9_]+\s*::\s*))?[a-z0-9_]+/i,
        greedy: true
      }
    }
  }
};

Prism.languages.cpp.keyword =/\b(alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|inline|int|long|mutable|namespace|new|noexcept|nullptr|override|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/
Prism.languages.cpp['class-name'] = [{
  pattern: /((class|new|struct)\s+)[a-z_][a-z0-9_]*/i,
  lookbehind: true
}, {
  pattern: /((public|private|protected)\s+(virtual\s+)?([a-z_][a-z0-9_]*\s*::\s*)*)[a-z_][a-z0-9_]*(\s*<.*>)?/i,
  inside: template,
  lookbehind: true,
  greedy: true
}, {
  pattern: /(::\s*)[a-z_][a-z0-9_]*(\s*<.*>)?/i,
  inside: template,
  lookbehind: true,
  greedy: true
}, {
  pattern: /[a-z_][a-z0-9_]*(\s*<.*>)?\{/i,
  inside: template,
  greedy: true
}];
Prism.languages.insertBefore('cpp', 'class-name', {
  'namespace': {
    pattern: /(namespace\s+)[a-z_][a-z0-9_]*/i,
    lookbehind: true
  }
});
Prism.languages.insertBefore('cpp', 'class-name', {
  'scope': {
    pattern: /[a-z_][a-z0-9_]*(?=::)/i,
    alias: 'namespace'
  }
});
Prism.languages.insertBefore('cpp', 'function', { // after keyword
  'typename': {
    pattern: /[a-z_][a-z0-9_]*(\s*\<.+>)?(\.\.\.|[\*&\s])+(?=[a-z_])/i,
    inside: template,
    alias: 'class-name'
  }
});
Prism.languages.insertBefore('cpp', 'function', {
  'template': {
    pattern: /(template)\s*<.*>/,
    lookbehind: true,
    greedy: true,
    inside: {
      'keyword': /\b(typename|class)\b/,
      'operator': /\.\.\./,
      'class-name': /[a-z_][a-z0-9_]*/i
    }
  }
});
Prism.languages.cpp.function = [{
  pattern: /[a-z_][a-z0-9_]*(\s*\<.+>\s*)?(?=\()/i,
  inside: template,
  greedy: true
}, {
  pattern: /operator.*(?=\()/,
  greedy: true,
  inside: {
    keyword: /operator/,
    operator: Prism.languages.cpp.operator,
    rest: template
  }
}];

// Ruby extension
Prism.languages.insertBefore('ruby', 'constant', {
  'class-name': /\b[A-Z][a-zA-Z_0-9]*(?:[?!]|\b)/
});
Prism.languages.ruby.constant = /\b[A-Z]+\b/;
Prism.languages.ruby.function = [
  /\b[a-zA-Z_][a-zA-Z0-9_]*[?!=]?(?=\()/,
  /(\+|-|\*\*?|\/|\||&|%|=)=?(?=\()/
]
Prism.languages.insertBefore('ruby', 'class-name', {
  // identify typescript style type annotations as class names
  'type-annotation': {
    pattern: /(:\s*)(\.\.\.\s*)?([_a-zA-Z][_a-zA-Z0-9]*(\s*[|&]\s*)?)*/,
    lookbehind: true,
    alias: 'class-name',
    inside: {
      'builtin': /\b(Array|Bignum|Binding|Boolean|Class|Continuation|Dir|Exception|FalseClass|File|Stat|File|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/
    }
  }
});
