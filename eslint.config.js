module.exports = [
  {
    "files": ["**/*.js"],
    "languageOptions": {
      "ecmaVersion": "latest",
      "sourceType": "commonjs",
      "globals": {
        "process": "readonly",
        "require": "readonly",
        "module": "readonly",
        "__dirname": "readonly",
        "console": "readonly"
      }
    },
    "rules": {
        "no-unused-vars": "warn",
        "no-undef": "warn"
    }
  }
];