module.exports = {
    "env": {
       "browser": true,
       "es2021": true,
       "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
       "ecmaVersion": 12,
       "sourceType": "module"
    },
    "rules": {
        "linebreak-style": 0,
       "indent": ["error", 2],
       "quotes": ["error", "double"],
       "semi": ["error", "always"]
    }
}