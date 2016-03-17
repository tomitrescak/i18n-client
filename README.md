# Introduction

The reason is that this package exists is that existing i18n packages in NPM focus on server side rendering, or are bloated with a lot of functionality that is difficult to configure and use. With this package we can roll out only the functions we need. Yet, currently the package is quite dumb:

### Configuring your translation strings:

```javascript
import { i18n } from "i18n-client";
  Meteor.startup(() => { // this line can be omitted if you are not a Meteor user
    i18n.add("en", {
       key: "me",
       deep: {
          in: "tran"
       }
    });
  });
```

### Setting the language

```javascript
import { i18n } from "i18n-client";
i18n.language = "en"
```

See below how this can be achieved reactively in Meteor.

### Using translations string

```javascript
import { __ } from "i18n-client";
let t = __("deep.in");

// or

import { i18n } from "i18n-client";
let t = i18n.translate("deep.in");
```

### Reactively setting the language in Meteor.js

In you want setup translations as reactive you need to setup your computation. Therefore, you can use following code:

```javascript
import { i18n } from "i18n-client";
import { Tracker } from "meteor/tracker";

class ReactiveI18n {
  constructor() {
    this.dep = new Tracker.Dependencyl
  }

  get __() {
    dep.depend();
    return i18n.translate;
  }

  set language(lang) {
    i18n.language = lang;
    dep.changed();
  }
}
```

When you setup your context, use this new reactive class:

```javascript
export default context = {
  i18n: new ReactiveI18n();
}
```

And in your composer pass the i18n function from context (you can setup your own composer that will do this automatically):

```javascript
compose({i18n}...) {
  onData(null, {
    __: i18n.__
  })
}
```


### Typescript defintion of the package

This is the type definition of the package:

```javascript
declare module "i18n-client" {
  export interface I18n {
    add(lang: string, translations: Object): void;
    translate(key: string, args?: any): string;
    initTranslator(prefix: string): (key: string) => string;
  }
  export let i18n: I18n;
  export function __(key: string, args?: any): string;
}
```
