module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "globals": {
        "io": true,
        "config": true,
        "libs": true,
        "logSuccess":true,
        "logError":true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 0
    }
};