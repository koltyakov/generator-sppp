module.exports = {
    "extends": "eslint:recommended",
    "rules": {
        "semi": ["error", "always"],
        "curly": "error",
        "eqeqeq": [2, "allow-null"],
        "no-console": "off",
        "indent": ["error", 4],
        "no-cond-assign": ["error", "always"],
        "no-trailing-spaces": "warn",
        "keyword-spacing": ["error", {
            "before": true,
            "after": true
        }],
        "space-before-blocks": [ "error", { "functions": "always" }]
    }
};