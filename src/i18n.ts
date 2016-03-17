interface II18n {
  add(lang: string, translations: Object): void;
}

interface ITranslate {
  (key: string, args?: any): string;
}

// mf
class I18n implements II18n {
  languages = {};
  currentLanguage = "en";

  add(language: string, strings: Object) {
    if (!this.languages[language]) {
      this.languages[language] = {};
    }
    for (let s in strings) {
      this.languages[language][s] = strings[s];
    }
  }

  initTranslator(prefix: string) {
    return (key: string) => {
      return this.translate(prefix + "." + key);
    };
  }

  translate = (key: string, args?: any) => {
    let tr = this.languages[this.currentLanguage][key];
    if (!tr) {
      if (key.indexOf(".") > -1) {
        let parts = key.split(".");
        tr = this.languages[this.currentLanguage];

        for (let i = 0; i < parts.length; i++) {
          if (!tr[parts[i]]) {
            tr = null;
            break;
          }
          tr = tr[parts[i]];
        }
      }
    }
    if (!tr) {
      tr = "<" + key + ">";
    } else if (args) {
      for (let i in args) {
        tr = tr.replace("{" + i + "}", args[i]);
      }
    }
    return tr;
  };
}

export let i18n = new I18n();
